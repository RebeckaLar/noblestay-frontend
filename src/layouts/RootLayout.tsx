import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "@/components/Footer"
import { useUser } from "@/contexts/UserContext"
import { RiLoaderFill } from "react-icons/ri"



const RootLayout = () => {

  const { authReady } = useUser()
  if(!authReady) {
    return (
      <div className="min-h-dvh text-(--primary-purple) flex items-center justify-center">
        <RiLoaderFill className="size-16 animate-spin"/>
      </div>
    )
  }

  return (
    <div className="min-h-svh text-(--very-dark-brown)">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}
export default RootLayout