import { useState } from "react"
import { dummyStays } from "../data/stays"
import { useNavigate } from "react-router-dom";
import { useStay } from "@/contexts/StayContext";

const StayListingsPage = () => {
// const [stays, setStays] = useState(dummyStays)
const { stays, actions } = useStay()
const navigate = useNavigate()

    
  return (
    <div className="container mx-auto px-4 mt-6">
        <h5 className="m-3">All available stays</h5>

        <button className="secondary-btn" onClick={() => navigate("/")}>My stays</button> 
        {/* FIX */}

        <div className="listing-cards grid grid-cols-1 gap-10">
          {stays.map((s, i) => (
            <div key={i} 
            onClick={() => navigate(`/stays/${s.id}`, {
                state: { from: "/", flash: "Welcome to your dashboard!" },
                })} 
              className="shadow-md rounded-xl pb-6 flex flex-col">
              <div className="bg-gray-300 rounded-t-xl w-full min-h-55"></div>

              <div className="lower-half px-4 h-full flex flex-col">
                <div className="py-3">
                  <h6>{s.title}</h6>
                  <p className="caption">{s.location}</p>
                </div>

                <div className="space-y-3 h-full flex flex-col justify-between">
                  <p className="paragraph line-clamp-5">{s.description}</p>
                  <hr className="solid text-(--grey)"></hr>

                  <div className="flex justify-between items-center">
                    <p className="body-small">{String(s.price)} kr / night</p>
                    <button className="primary-btn" type="button">Read more</button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
export default StayListingsPage