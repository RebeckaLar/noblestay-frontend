import { Link, NavLink } from 'react-router'
import logo_navbar from '../assets/logo_navbar.svg'
import logo_door from '../assets/logo_door.svg'

const Navbar = () => {
  return (
        <div className="shadow-sm">
            <nav className='container mx-auto px-4 flex flex-row justify-between items-end h-16'>
                <div className='h-full flex items-center'>
                    <Link to="/" className='logo-small'>
                        <img src={logo_door} className="" alt="The brown door part of Noble Stay logo" />
                    </Link>
                    <Link to="/" className='logo-large'>
                        <img src={logo_navbar} className="" alt="Noble Stay logo" />
                    </Link>
                </div>
                
                {/* Snappy Sliding Hamburger Menu from https://alvarotrigo.com/blog/hamburger-menu-css/ */}
                <div className="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                    </label>
                    <ul className='menu__box nav-links container mx-auto px-4 flex flex-col gap-(--spacing-md)'>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/">Home</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/stays">All castles</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/bookings">My bookings</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/register">Login / Sign Up</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/create">Create</NavLink></li>
                    </ul>
                </div>

                {/* LAPTOP NAV-LINKS */}
                <div className='nav-links laptop-nav pb-6'>
                    <ul className='flex'>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/">Home</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/stays">All castles</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/bookings">My bookings</NavLink></li>
                        <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/register">Login / Sign Up</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
  )
}
export default Navbar