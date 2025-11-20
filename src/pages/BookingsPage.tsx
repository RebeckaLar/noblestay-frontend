import { useStay } from "@/contexts/StayContext"
import { useNavigate } from "react-router"


const BookingsPage = () => {

    const { stays, bookings } = useStay()
        const navigate = useNavigate()

  return (
        <div className="listing-cards grid grid-cols-1 gap-10">
          {bookings.map((b, i) => (
            <div key={i} 
            // onClick={() => navigate(`/stays/${b.bid}`, {
            //     state: { from: "/", flash: "Welcome to your dashboard!" },
            //     })} 
              className="shadow-md rounded-xl pb-6 flex flex-col">
              <div className="bg-gray-300 rounded-t-xl w-full min-h-55"></div>

              <div className="lower-half px-4 h-full flex flex-col">
                <div className="py-3">
                  <h6>{b.room.roomCategory}</h6>
                  <p className="caption">{b.room.description}</p>
                </div>

                <div className="space-y-3 h-full flex flex-col justify-between">
                  <p className="paragraph line-clamp-5">{b.checkInDate.toLocaleString()}</p>
                  <hr className="solid text-(--grey)"></hr>

                  <div className="flex justify-between items-center">
                    <p className="body-small">{String(b.room.price)} kr / night</p>
                    <button className="primary-btn" type="button">Read more</button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
  )
}
export default BookingsPage