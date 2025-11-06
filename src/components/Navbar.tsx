import { Link, NavLink } from 'react-router'
import logo_navbar from '../assets/logo_navbar.svg'
import logo_door from '../assets/logo_door.svg'

const Navbar = () => {
  return (
        <div className="wrapper flex shadow-sm h-64">
            {/* <div className='wrapper flex'> */}
                <Link to="/">
                    <img src={logo_door} className="" alt="Noble Stay logo" />
                </Link>
                <ul>
                    <li><NavLink className="[&.active]:text-(--primary-purple)" to="/">Home</NavLink></li>
                    <li><NavLink className="[&.active]:text-(--primary-purple)" to="/stays">All castles</NavLink></li>
                    <li><NavLink className="[&.active]:text-(--primary-purple)" to="/bookings">My bookings</NavLink></li>
                    <li><NavLink className="[&.active]:text-(--primary-purple)" to="/register">Login / Sign Up</NavLink></li>
                </ul>
            {/* </div> */}
        </div>
  )
}
export default Navbar