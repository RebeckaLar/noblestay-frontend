import { useEffect } from "react"
import { useUser } from "@/contexts/UserContext"
import { useBooking } from "@/contexts/BookingContext"
import { useNavigate } from "react-router"


const BookingsPage = () => {
  const { user } = useUser()
  const { userBookings, fetchUserBookings, bookingLoading, bookingError } = useBooking()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetchUserBookings()
    }
  }, [user])

  // For debugging
  console.log('BookingsPage - user:', user)
  console.log('BookingsPage - bookings:', userBookings)

  if (!user) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <h5>Please log in to view your bookings</h5>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <h5 className="m-3">My Bookings</h5>

      {bookingLoading && (
        <div className="my-4">Loading bookings...</div>
      )}
      {bookingError && (
        <div className="my-4 text-(--error)">{bookingError}</div>
      )}

      <div className="listing-cards grid grid-cols-1 sm:grid-cols-2 gap-6">
        {userBookings.length > 0 ? (
          userBookings.map((b, i) => (
            <div key={i}
              onClick={() => navigate(`/bookings/${b._id}`, {
                state: { from: "/bookings" },
              })}
              className="shadow-md rounded-xl pb-6 flex flex-col cursor-pointer">
              <div className="bg-gray-300 rounded-t-xl w-full min-h-55"></div>
              <div className="lower-half px-4 h-full flex flex-col">
                <div className="py-3">
                  <h6>{typeof b.bookedStay === 'object' && 'title' in b.bookedStay ? b.bookedStay.title : b._id}</h6>
                  <p className="caption">{typeof b.bookedStay === 'object' && 'location' in b.bookedStay ? b.bookedStay.location : ''}</p>
                </div>
                <div className="space-y-3 h-full flex flex-col justify-between">
                  <p className="paragraph line-clamp-5">{typeof b.bookedStay === 'object' && 'description' in b.bookedStay ? b.bookedStay.description : ''}</p>
                  <hr className="solid text-(--grey)" />
                  <div className="flex justify-between items-center">
                    <p className="body-small">{typeof b.room === 'object' && 'price' in b.room ? String(b.room.price) : ''} kr / night</p>
                    <button className="primary-btn" type="button">Read more</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <p className="paragraph text-gray-500">You have not booked any stay yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default BookingsPage