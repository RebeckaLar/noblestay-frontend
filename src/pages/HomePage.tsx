import { useEffect, useState } from "react"
import HorizontalList from "../components/HorizontalList"
import axios from "../api/axios"
import { IoLocationOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  const [stays, setStays] = useState([])
  const [location, setLocation] = useState("")

  useEffect(() => {
    const getStays = async () => {
      const res = await axios.get('/api/stays')
      console.log(res)
      if(res.status !== 200) return

      setStays(res.data)
    }
    getStays()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (location.trim()) {
      navigate(`/stays?location=${encodeURIComponent(location)}`)
    }
  }



  return (
    <div className="">
      <div className="hero flex flex-col items-center justify-center gap-19 h-104">
          <div className="laptop-hero container mx-auto px-10 py-5 flex flex-col text-center bg-(--secondary)/80 rounded-xl w-197 h-71">
            <div>
              <h1>Check Into a Fairytale</h1>
              <h6 className="h6-brown p-2">Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Noble Stay, your storybook stay begins for real.</h6>
            </div>
          </div>
          <div className="search-form container mx-auto p-4 flex flex-col items-center justify-center bg-(--secondary)/80 rounded-lg h-87 w-[85%]">
            <form onSubmit={handleSearch} className="search-items flex justify-between gap-4 paragraph">
              <div className="search-input-hp flex flex-col">
              <label htmlFor="location" className="flex items-center gap-1 paragraph"> 
                  <IoLocationOutline /> 
                  Search location 
                </label>
                <input 
                  id="location" 
                  name="location"
                  className="p-1"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Sweden or Denmark"
                />

              </div>
              {/* <label>Search date
                <input id="date" name="date"></input>
              </label> */}
              {/* <label>Select guests
                <input id="guests" name="guests"></input>
              </label>
              <button type="button">Filter</button> */}
              <button className="primary-btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="mobile-hero container mx-auto px-10 py-5 flex flex-col text-center">
          <h2>Check Into a Fairytale</h2>
          <p className="paragraph py-2">Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Nobel Stay, your storybook stay begins for real.</p>
        </div>
      
      {/* LIST OF STAYS */}
      <HorizontalList stays={stays} />
    </div>
  )
}
export default HomePage