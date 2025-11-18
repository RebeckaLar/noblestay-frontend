import { BiChevronLeft } from "react-icons/bi"
import { useNavigate } from "react-router"

const Profile = () => {

    const navigate  = useNavigate()
  return (
    <div className="container mx-auto px-4">
      <button onClick={() => navigate(-1)} className='flex gap-2 items-center my-8'>
          <BiChevronLeft />
         <p>Go back</p>
       </button>
        
    </div>
  )
}
export default Profile