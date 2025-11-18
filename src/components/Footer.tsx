import logo_footer from '../assets/logo_footer.svg'
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <div className='border-(--grey) border-t'>
        <footer className="container mx-auto p-4 flex flex-row gap-4 justify-between">
            <div className="footer-logo flex flex-col justify-center">
                <a href="/" className='w-4/5'>
                    <img src={logo_footer} className="logo" alt="Noble Stay logo" />
                </a>
                <div>
                    <p className='copyright caption text-(--grey)'>&copy; NobleStayInc {new Date().getFullYear()} </p>
                </div>
            </div>

            <div className="contact-us flex flex-col px-4">
                <h6 className="">Contact us</h6>
                <div className="flex gap-1">
                    <p><MdOutlinePhoneInTalk /></p>
                    <p className="caption">000 000 00 00</p>
                </div>
                <div className="flex gap-1">
                    <p><MdMailOutline /></p>
                    <p className="caption">noblestay@gmail.com</p>
                </div>
                <div className="flex gap-1">
                    <p><MdOutlineLocationOn /></p>
                    <p className="caption">Stockholm, Sweden</p>
                </div>                
            </div>
        </footer>
    </div>
  )
}
export default Footer