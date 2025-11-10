
import { useState } from "react"
import { dummyStays } from "../data/stays"

const HomePage = () => {


  // Use local dummy data instead of fetching from API
  const [stays, setStays] = useState(dummyStays)

  return (
    <div className="">
      <div className="container bg-gray-300 mx-auto px-4 flex flex-col items-center h-96">
        Search
      </div>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2>Check Into a Fairytale</h2>
        <p>Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? 
        With Nobel Stay, your storybook stay begins for real.</p>
      </div>
      {/* LIST OF STAYS */}
      <div className="mt-6">
        <h5 className="m-3">Scandinavia</h5>
        <div className="overflow-x-auto overflow-y-hidden space-y-10 flex gap-(--spacing-md)">
          {stays.map((s, i) => (
            <div key={i} className="ml-3 shadow-md rounded-xl h-full pb-6">
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
    </div>
  )
}
export default HomePage