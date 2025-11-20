import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import LocalStorageService from "../utils/LocalStorageService"
import axios from "@/api/axios"

type UserState = {
    user: {_id: string} | null,
    currentUser: User | null,
    authReady: Boolean,
    actions: {
        createUser: (userInfo: RegisterCredentials) => void
        //login
    }
}

type RegisterCredentials = {
  userName: User['userName'],
  email: User['email'],
  password: User['password']
}

const defaultState: UserState = {
    user: null,
    currentUser: null,
    authReady: false,
    actions: {
        createUser: () => {},
        // register: () => {},
    }
}

const UserContext = createContext<UserState>(defaultState)

function UserProvider ({ children }: PropsWithChildren) {
    // const [users, setUsers] = useState<RegisterCredentials[]>([])
    const [user, setUser] = useState<{_id: string} | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(defaultState.currentUser)
    const [token, setToken] = useState<string | null>(null) //save to sessions storage, not local, to keep user logged in
    const [authReady, setAuthReady] = useState(false) //42:00 MERN #11

    useEffect(() => {
    //   _getUsers()
    //   _getUser()
      //FIX HÄMTA TOKEN FRÅN SESSION STORAGE
    //   axios post reg user, sen hämta user token från res och sätter den i session storage

    //   kolla finns MdToken, ananrs return

    //   set token set use
    //   funktionen kollar o mvlaid token

    const checkToken = async () => {
        try {
            const token = sessionStorage.getItem('jwt')
            if(!token) return

            const res = await axios.get('auth/check', {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
                }
            })

            //If token is valid:
            if(res.status === 200) {
                setToken(sessionStorage.getItem('jwt'))
                setUser(res.data)
            }

        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
                sessionStorage.removeItem('jwt') 
            } else {
                console.log('Unknown error occurred')
            }
        } finally {
            setAuthReady(true)
        }
    }
    checkToken()
    }, [])

    //     const register = async () => {
    //     const res = await axios.post('auth/register')
    //     if(res.status === 201) {
    //         setToken(res.data.token)
    //         setUser({
    //             _id: res.data._id,
    //             // userName: res.data.userName,
    //             // email: res.data.email,
    //         })
    //     }
    // }

    const createUser: typeof defaultState.actions.createUser = async (userInfo: RegisterCredentials) => {
        const res = await axios.post('api/auth/register', userInfo, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
            }
        })

        setToken(res.data.token)
        setUser({
                _id: res.data._id,
                // userName: res.data.userName,
                // email: res.data.email,
        })
        
        // console.log("User: ", user.userName)
        //FIX AXIOS POST TOILL API USRES REGISTER, USER INFORMATION (REGISTERINUT)
        // if res 201,från res hämta info tex i, då gör man dt från settoken resizeBy.data.usertoken,
        // set currentusdser.
        // sessionstorage.setitem(iwt, resizeBy.data.usertoken)

        // const updatedUsers = [...users, user]
        // _setUsers(updatedUsers)

        sessionStorage.setItem('jwt', res.data.usertoken)
    }
    
    // const _getUsers = () => {
    //     const _users: User[] = LocalStorageService.getItem('@stays/users', [])
    //     setUsers(_users)
    // }

    // const _setUsers = (_users: User[]) => {
    //     LocalStorageService.setItem('@stays/users', _users)
    //     setUsers(_users)
    // }

    // const _getUser = () => {
    //     const _user: User | null = LocalStorageService.getItem('@stays/currentUser', defaultState.currentUser)
    //     setUser(_user)
    // }

    // const createUser: typeof defaultState.actions.createUser = (user) => {
    //     console.log("User: ", user.userName)
    //     //FIX AXIOS POST TOILL API USRES REGISTER, USER INFORMATION (REGISTERINUT)
    //     // if res 201,från res hämta info tex i, då gör man dt från settoken resizeBy.data.usertoken,
    //     // set currentusdser.
    //     // sessionstorage.setitem(iwt, resizeBy.data.usertoken)

    //     const updatedUsers = [...users, user]
    //     _setUsers(updatedUsers)
    // }

    // const setUser = (user: User | null) => {
    //     LocalStorageService.setItem('@stays/currentUser', user)
    //     setCurrentUser(user)
    // }

    //logout user FIX

    const actions = {
        createUser,
        // setUser
        // register,
    }

    return (
        <UserContext.Provider value={{
            // users,
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