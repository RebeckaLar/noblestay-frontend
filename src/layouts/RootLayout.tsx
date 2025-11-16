import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "@/components/Footer"

const RootLayout = () => {
  return (
    <div className="min-h-svh text-(--very-dark-brown)">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}
export default RootLayout