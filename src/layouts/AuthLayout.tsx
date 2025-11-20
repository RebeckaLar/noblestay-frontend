import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="min-h-svh text-(--very-dark-brown)">
            <Outlet />
        </div>
    )
}

export default AuthLayout