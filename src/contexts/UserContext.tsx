import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import axios from "@/api/axios"

type UserState = {
    user: {_id: string} | null,
    currentUser: User | null,
    authReady: Boolean,
    actions: {
        createUser: (userInfo: RegisterCredentials) => void
        loginUser: (userInfo: LoginCredentials) => void
        logout: () => void
    }
}

type RegisterCredentials = {
  phone: User['phone'],
  email: User['email'],
  password: User['password']
}

type LoginCredentials = {
  email: User['email'],
  password: User['password']
}

const defaultState: UserState = {
    user: null,
    currentUser: null,
    authReady: false,
    actions: {
        createUser: () => {},
        loginUser: () => {},
        logout: () => {},
    }
}

const UserContext = createContext<UserState>(defaultState)

function UserProvider ({ children }: PropsWithChildren) {
    const [user, setUser] = useState<{_id: string} | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(defaultState.currentUser)
    const [token, setToken] = useState<string | null>(null) //save to sessions storage, not local, to keep user logged in
    const [authReady, setAuthReady] = useState(false) //42:00 MERN #11

    useEffect(() => {

    const checkToken = async () => {
        try {
            const token = sessionStorage.getItem('jwt')
            if(!token) {
                setAuthReady(true)
                return
            }

            const res = await axios.get('api/auth/check', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            //If token is valid:
            if(res.status === 200) {
                setToken(token)
                setUser(res.data)
            } else {
                //Non-200 response: clear everything
                sessionStorage.removeItem('jwt')
                setToken(null)
                setUser(null)
                setCurrentUser(null)
            }

        } catch (error) {
            //Token invalid or network error: clear everything
            console.log('Token check failed:', error instanceof Error ? error.message : 'Unknown error')
            sessionStorage.removeItem('jwt')
            setToken(null)
            setUser(null)
            setCurrentUser(null)
        } finally {
            setAuthReady(true)
        }
    }
    checkToken()
    }, [])

    const createUser: typeof defaultState.actions.createUser = async (userInfo: RegisterCredentials) => {
        const res = await axios.post('api/auth/register', userInfo, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
            }
        })

        setToken(res.data.token)
        setUser({
                _id: res.data._id,
        })

        setCurrentUser(res.data._id)
        sessionStorage.setItem('jwt', res.data.token)
    }

    const loginUser: typeof defaultState.actions.loginUser = async (userInfo: LoginCredentials) => {
        const res = await axios.post('api/auth/login', userInfo)
        setToken(res.data.token)
        setUser({_id: res.data._id,})
        setCurrentUser(res.data._id)
        sessionStorage.setItem('jwt', res.data.token)
    }

    const logout = () => {
        console.log('Logout called- clearing token from sessionStorage')
        sessionStorage.removeItem('jwt')
        console.log('Token after removal:', sessionStorage.getItem('jwt')) // should be null
        setToken(null)
        setUser(null)
        setCurrentUser(null)
    }

    const actions = {
        createUser,
        loginUser,
        logout
    }

    return (
        <UserContext.Provider value={{
            user,
            currentUser,
            authReady,
            actions
        }}>
            { children }
        </UserContext.Provider>
    )

}

function useUser() {
    const context = useContext(UserContext)
    if(context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export { UserProvider, useUser }