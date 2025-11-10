import { useState } from "react"
import { dummyStays } from "../data/stays"
import { useNavigate } from "react-router-dom";

const HorizontalList = () => {
  // Use local dummy data instead of fetching from API
const [stays, setStays] = useState(dummyStays)
const navigate = useNavigate()

  return (
      <div className="mt-6">
        <h5 className="m-3">Scandinavia</h5>
        <div className="overflow-x-auto overflow-y-hidden space-y-10 flex gap-(--spacing-xs)">
          {stays.map((s, i) => (
            <div key={i} 
            onClick={() => navigate(`/stays/${s.id}`, {
      state: { from: "/", flash: "Welcome to your dashboard!" },
    })} 
              className="ml-3 shadow-md rounded-xl h-full pb-6">
              <div className="bg-gray-300 rounded-t-xl w-40 h-28"></div>
              <div className="lower-half p-2">
                <p className="paragraph">{s.title}</p>
                <div className="flex flex-col text-sm">
                  <p className="caption">{s.location}</p>
                  <p className="body-small">{String(s.price)} kr / night</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
export default HorizontalList