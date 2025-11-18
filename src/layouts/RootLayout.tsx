import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "@/components/Footer"
import Header from "../components/Header"



const RootLayout = () => {
  return (
    <div className="min-h-svh text-(--very-dark-brown)">
        {/* <Navbar /> */}
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}
export default RootLayout