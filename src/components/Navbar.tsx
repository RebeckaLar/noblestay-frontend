import { Link, NavLink } from 'react-router'
import logo_navbar from '../assets/logo_navbar.svg'
import logo_door from '../assets/logo_door.svg'
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  return (
        <div className="shadow-sm ">
            <nav className='container mx-auto px-4 flex flex-row justify-between items-center h-(--spacing-3xl)'>
                <div>
                    <Link to="/" className='logo-small'>
                        <img src={logo_door} className="" alt="The brown door part of Noble Stay logo" />
                    </Link>
                    <Link to="/" className='logo-large'>
                        <img src={logo_navbar} className="" alt="Noble Stay logo" />
                    </Link>
                </div>
                <div className='flex justify-between'>
                    <div className='hamburger'>
                        <IoMenu />
                    </div>
                    <ul className='hidden nav-links container mx-auto px-4 flex-col gap-(--spacing-md)'>
                        <li><NavLink className="[&.active]:text-(--primary-purple)" to="/">Home</NavLink></li>
                        <li><NavLink className="[&.active]:text-(--primary-purple)" to="/stays">All castles</NavLink></li>
                        <li><NavLink className="[&.active]:text-(--primary-purple)" to="/bookings">My bookings</NavLink></li>
                        <li><NavLink className="[&.active]:text-(--primary-purple)" to="/register">Login / Sign Up</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
  )
}
export default Navbar