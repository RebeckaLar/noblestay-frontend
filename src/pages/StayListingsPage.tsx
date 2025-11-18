import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import StayListingCard from "@/components/StayListingCard";

const StayListingsPage = () => {
const { currentUser } = useUser()
const navigate = useNavigate()

    
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex justify-between mb-6">
        <h5 className="m-3">All available stays</h5>

        {currentUser && 
          <button className="secondary-btn" onClick={() => navigate("/hostings")}>Want to host?</button>     
        }
      </div>

      <StayListingCard />
    </div>
  )
}
export default StayListingsPage