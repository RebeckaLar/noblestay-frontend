import { BiChevronLeft } from "react-icons/bi"
import { useStay } from "../contexts/StayContext"

type StayProps = {
  stay: Stay;
};



const StayDetailsPage = ({ stay }: StayProps) => {
const { stays } = useStay();

  return (
    <div className="container mx-auto px-4">
      <button className='flex gap-2 items-center mb-3'>
          <BiChevronLeft />
         <p>Go back to listings</p>
       </button>

      <div className=" bg-gray-300 h-58 rounded-xl">Image</div>
      
      {/* CASTLE DESCRIPTION */}
      <div>
        {/* <h5>{stay.title}</h5> */}
      </div>

    </div>
  )
}
export default StayDetailsPage