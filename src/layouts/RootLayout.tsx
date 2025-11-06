import { Outlet } from "react-router"
import logo_footer from '../assets/logo_footer.svg'
import Navbar from "../components/Navbar"

const RootLayout = () => {
  return (
    <div className="min-h-svh text-(--very-dark-brown) grid grid-rows-[auto_1fr_auto]">
        <Navbar />
        <main>
          <Outlet />
        </main>

        {/* Footer */}
        <div className="border-(--very-dark-brown) border-t h-30 flex">
          <div className="wrapper">
            <a href="/">
              <img src={logo_footer} className="logo" alt="Noble Stay logo" />
            </a>
          </div>
          <div>
            <p>&copy; NobleStayInc {new Date().getFullYear()} </p>
          </div>
          <div className="wrapper">
            <h6 className="">Contact us</h6>
          </div>
        </div>
    </div>
  )
}
export default RootLayout