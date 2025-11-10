import { BiChevronLeft } from "react-icons/bi"
import { useStay } from "../contexts/StayContext"
import { useParams, useNavigate } from "react-router-dom"

const StayDetailsPage = () => {
  const { actions } = useStay();
  const params = useParams();
  const navigate = useNavigate();

  const stayId = params.id ? Number(params.id) : undefined;
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
         <p>Go back to listings</p>
       </button>

      <div className=" bg-gray-300 h-58 rounded-xl">Image</div>
      
      {/* CASTLE DESCRIPTION */}
      <div>
        <h5>{stay.title}</h5>
        <p>{stay.description}</p>
      </div>

    </div>
  )
}
export default StayDetailsPage