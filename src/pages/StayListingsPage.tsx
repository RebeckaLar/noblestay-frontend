import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import StayListingCard from "@/components/StayListingCard";
import { useStay } from "@/contexts/StayContext";
import { useMemo } from "react";

const StayListingsPage = () => {
const { currentUser } = useUser()
const { stays } = useStay()
const navigate = useNavigate()
const [searchParams] = useSearchParams()
const locationFilter = searchParams.get('location')

const filteredStays = useMemo(() => {
  if (!locationFilter) return stays
  
  const filterLower = locationFilter.toLowerCase()
  return stays.filter((stay: Stay) => {
    const stayLocation = stay.location?.toLowerCase() || ""
    return stayLocation.includes(filterLower)
  })
}, [stays, locationFilter])

    
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex justify-between mb-6">
        <h5 className="m-3">
          {locationFilter 
            ? `Stays in ${locationFilter}` 
            : 'All available stays'}
        </h5>

        {currentUser && 
          <button className="secondary-btn" onClick={() => navigate("/hostings")}>Want to host?</button>     
        }
      </div>

      <StayListingCard filteredStays={filteredStays} />
    </div>
  )
}
export default StayListingsPage