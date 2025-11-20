import { BiChevronLeft } from "react-icons/bi"
import { BsShare } from "react-icons/bs";
import { useStay } from "../contexts/StayContext"
import { useParams, useNavigate } from "react-router-dom"
import { CgChevronDown } from "react-icons/cg";
import { RiStarSFill } from "react-icons/ri";
import AddBooking from "@/components/AddBooking";
import { IoLocationOutline } from "react-icons/io5";

const StayDetailsPage = () => {
  const { actions } = useStay();
  const params = useParams();
  const navigate = useNavigate();

  // Use Mongo-style _id passed in route as string
  const stayId = params.id; // string | undefined
  const stay = stayId ? actions.getStayByID(stayId) : undefined;

  if (!stay) {
    return (
      <div className="container mx-auto px-4">
        <button onClick={() => navigate(-1)} className='flex gap-2 items-center mb-3'>
          <BiChevronLeft />
          <p>Go back to listings</p>
        </button>
        <p>Stay not found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <button onClick={() => navigate(-1)} className='flex gap-2 items-center mb-3'>
          <BiChevronLeft />
         <p>Go back</p>
       </button>

{/* STAY DETAILS */}
    <div className="container">
      <div className=" bg-gray-300 h-58 rounded-xl">Image</div>
      
      {/* CASTLE DESCRIPTION */}
      <div className="mt-4">
        <div className="flex justify-between">
          <h5>{stay.title}</h5>
          <button className="caption flex items-center gap-1 shadow-md px-3 rounded-2xl"><BsShare /> Share</button>
        </div>
        <div className="flex gap-1">
          <IoLocationOutline />
          <p className="caption">{stay.location}</p>
        </div>
          { stay.availableEvent == 'true' &&

          <button className="caption mb-2 text-(--primary-purple) border border-(--primary-purple) rounded-xl px-2">Event available</button>
          }
        <p className="paragraph mt-2">{stay.description}</p>
        <button className="text-(--action) flex items-center">Expand <CgChevronDown /></button>
      </div>

      {/* RULES */}
      <p>{stay.rules}</p>

      <hr className="solid text-(--grey)"></hr>

      {/* OWNER */}
      <div className="flex justify-between">
        <div>
          <h6 className="h6-brown">Meet the castle owner</h6>
          {/* <p className="body-small">{stay.owner.userName}</p> FIX */} 
          {/* FIX */}
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full w-15 h-15 bg-gray-300"></div>
          <div className="flex text-(--very-dark-brown)">
            <RiStarSFill /> 
            <RiStarSFill /> 
            <RiStarSFill /> 
            <RiStarSFill /> 
            <RiStarSFill /> 
          </div>
        </div>
      </div>

      <hr className="solid text-(--grey)"></hr>
      
      {/* SELECTIONS */}
      <div>
        <AddBooking />
      </div>
    </div>

  </div>
  )
}
export default StayDetailsPage