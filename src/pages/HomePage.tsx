import { useState } from "react"
import { dummyStays } from "../data/stays"
import HorizontalList from "../components/HorizontalList"
import StayDetailsPage from "./StayDetailsPage"
import { Navigate } from "react-router"
import { useStay } from "../contexts/StayContext"


const HomePage = () => {
  // Use local dummy data instead of fetching from API
  // const [stays, setStays] = useState(dummyStays)
    const [selectedStay, setselectedStay] = useState<Stay | null>(null)
    const { actions } = useStay()
    // const id = actions.getStayByID(Stay)

  //   if (selectedStay) {

  //   return (
  //     <div className='container mx-auto px-4 pt-20 lg:max-w-6xl'>
  //       <button onClick={() => setselectedStay(null)} className='flex gap-2 items-center mb-3'>
  //         {/* <FaArrowLeft /> */}
  //         <p>Go back to listings</p>
  //       </button>
  //       <StayDetailsPage stay={selectedStay} />
  //     </div>
  //   )
  // }
  
  if(selectedStay) {
    console.log(selectedStay.title)
    console.log(selectedStay.id)

    return <Navigate to={`stays/${selectedStay.id}`}/>
  }

  return (
    <div className="">
      <div className="hero bg-gray-300 flex flex-col items-center h-100">
          <div className="bg-gray-300">
            <form className="flex flex-col">
              <label>Search location</label>
              <input name="location"></input>
              <label>Search date</label>
              <input name="date"></input>
              <label>Select guests</label>
              <input name="guests"></input>
              <button>Filter</button>
            </form>
            <button className="primary-btn">
              Search
            </button>
          </div>
        </div>

      <div className="container mx-auto px-(--spacing-2xl) flex flex-col items-center justify-center flex-wrap">
        <h2>Check Into a Fairytale</h2>
        <p className="paragraph">Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Nobel Stay, your storybook stay begins for real.</p>
      </div>
      
      {/* LIST OF STAYS */}
      <HorizontalList onStayClick={setselectedStay} />
    </div>
  )
}
export default HomePage