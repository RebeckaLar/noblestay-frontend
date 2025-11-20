import { useUser } from "@/contexts/UserContext"
import { IoLogOutOutline } from "react-icons/io5"

function LogOutBtn() {

    const { currentUser, actions } = useUser()

    const handleLogOut: React.MouseEventHandler<HTMLButtonElement> = () => {
        actions.setUser(null)
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