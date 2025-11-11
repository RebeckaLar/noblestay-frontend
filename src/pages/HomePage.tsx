import HorizontalList from "../components/HorizontalList"

const HomePage = () => {

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
      <HorizontalList  />
    </div>
  )
}
export default HomePage