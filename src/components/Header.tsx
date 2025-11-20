import { Link, NavLink } from 'react-router'
import logo_navbar from '../assets/logo_navbar.svg'
import logo_door from '../assets/logo_door.svg'
import Modal from 'react-modal';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useUser } from '../contexts/UserContext';
import { CgProfile } from 'react-icons/cg';
import LogOutBtn from './LogOutBtn';

function Header() {
    const { currentUser } = useUser()
    const [showLogin, setshowLogin] = useState<boolean>(false)
    const [showRegister, setshowRegister] = useState<boolean>(false)

    const NavItems = () => (
        <>
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
                    <li className="flex flex-col gap-2 bg-(--primary-purple) text-secondary py-12 px-6" onClick={() => { if (!currentUser) setshowLogin(true) }}>
                        <div className="rounded-full w-15 h-15 bg-gray-300">
                            <CgProfile className="h-full w-full" />
                        </div>
                        <p>{currentUser == null 
                        ? 'Log in / Sign up'
                        // : currentUser.userName}</p>
                        : <NavLink to="/profile">{"Welcome back, " + (currentUser.userName || "Guest")}</NavLink>}</p>
                    </li>
                    <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/">Home</NavLink></li>
                    <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/stays">All castles</NavLink></li>
                    { currentUser && <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/bookings">My bookings</NavLink></li> }
                    { currentUser && <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/hostings">My hostings</NavLink></li> }
                    <hr className="solid text-(--grey)"></hr>
                    <li className='menu__item [&.active]:text-(--primary-purple) flex'>
                    <LogOutBtn />
                    </li>


                </ul>
            </div>

            {/* LAPTOP NAV-LINKS */}
            <div className='nav-links laptop-nav pb-6 w-full justify-end'>
                <ul className='flex items-end'>
                    <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/">Home</NavLink></li>
                    <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/stays">All castles</NavLink></li>
                    { currentUser && <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/bookings">My bookings</NavLink></li> }
                    { currentUser && <li><NavLink className="menu__item [&.active]:text-(--primary-purple)" to="/hostings">My hostings</NavLink></li> }
                    <li className="flex flex-col items-center cursor-pointer gap-1 primary-btn" onClick={() => { if (!currentUser) setshowLogin(true) }}>
                        <CgProfile className="text-xl" />
                        <p>{
                        currentUser == null 
                        ? 'Log in / Sign up' 
                        // : currentUser.userName}</p>
                        : <NavLink to="/profile">{currentUser.userName || "Guest"}</NavLink>
                        }</p>
                    </li>
                </ul>
            </div>
        </>
    )


  return (
    <header>
        <div className="shadow-sm">
            <nav className='container mx-auto px-4 flex flex-row justify-between items-end h-16'>
            <NavItems />
            </nav>
        </div>

        <Modal isOpen={showLogin}
          onRequestClose={() => setshowLogin(false)}
          className='bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20 realtive'
          overlayClassName='fixed inset-0 bg-black/20 flex justify-center items-start z-50'>
          <button className="absolute top-2 right-2 text-gray-600">X</button>
          <LoginForm onSuccess={() => setshowLogin(false)} />
          <p className="text-sm my-4">Don't have an account? {''}
            <button className="text-(--action) underline text-sm" onClick={() => { setshowLogin(false); setshowRegister(true) }}>SIGN UP</button>
          </p>
        </Modal>

        <Modal isOpen={showRegister}
          onRequestClose={() => setshowRegister(false)}
          className='bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20 realtive'
          overlayClassName='fixed inset-0 bg-black/20 flex justify-center items-start z-50'>
          <button className="absolute top-2 right-2 text-gray-600">X</button>
          <RegisterForm onSuccess={() => setshowRegister(false)} />
          <p className="text-sm my-4">Already have an account? {''}
            <button className="text-(--action) underline text-sm" onClick={() => { setshowLogin(true); setshowRegister(false) }}>LOG IN</button>
          </p>

        </Modal>
        </header>
        
  )
}
export default Header