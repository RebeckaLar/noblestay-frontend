import { useUser } from "../contexts/UserContext"
import { IoLogOutOutline } from "react-icons/io5"
import { useNavigate } from "react-router"

function LogOutBtn() {

    const { currentUser, actions } = useUser()
    const navigate = useNavigate()

    const handleLogOut = () => {
        if (currentUser) {
            actions.logout()
            navigate('/')
        }
        return
    }

    return (
        <>
            {currentUser !== null &&
                <button className="flex items-center gap-2" onClick={handleLogOut}>
                    Log out <IoLogOutOutline />
                </button>
            }
        </>
    )
}
export default LogOutBtn