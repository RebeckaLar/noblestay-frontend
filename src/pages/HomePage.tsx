import HorizontalList from "../components/HorizontalList"

const HomePage = () => {

  return (
    <div className="">
      <div className="hero flex flex-col items-center justify-center gap-19 h-104">
          <div className="laptop-hero container mx-auto px-10 py-5 flex flex-col text-center bg-(--secondary)/80 rounded-xl w-197 h-71">
            <div>
              <h1>Check Into a Fairytale</h1>
              <h6 className="h6-brown p-2">Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Noble Stay, your storybook stay begins for real.</h6>
            </div>
          </div>
          <div className="search-form container mx-auto p-4 flex flex-col items-center bg-(--secondary)/80 rounded-lg h-87 w-[85%]">
            <form className="search-items flex flex-col justify-between paragraph">
              <label>Search location
                <input id="location" name="location"></input>
              </label>
              <label>Search date
                <input id="date" name="date"></input>
              </label>
              <label>Select guests
                <input id="guests" name="guests"></input>
              </label>
              <button type="button">Filter</button>
            </form>
            <button className="primary-btn" type="submit">
              Search
            </button>
          </div>
        </div>

        <div className="mobile-hero container mx-auto px-10 py-5 flex flex-col text-center">
          <h2>Check Into a Fairytale</h2>
          <p className="paragraph py-2">Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Nobel Stay, your storybook stay begins for real.</p>
        </div>
      
      {/* LIST OF STAYS */}
      <HorizontalList  />
    </div>
  )
}
export default HomePage