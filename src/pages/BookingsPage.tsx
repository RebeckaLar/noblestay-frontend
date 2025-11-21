import { useEffect } from "react"
import { useUser } from "@/contexts/UserContext"
import { useBooking } from "@/contexts/BookingContext"
import { useNavigate } from "react-router"


const BookingsPage = () => {
  const { user } = useUser()
  const { userBookings, fetchUserBookings, bookingLoading, bookingError } = useBooking()
  // const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetchUserBookings()
    }
  }, [user])

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
          userBookings.map((b, i) => {
            const isStayObject = typeof b.bookedStay === 'object';
            const stay = isStayObject ? (b.bookedStay as Stay) : null;
            const hasImage = stay?.image && String(stay.image).trim() !== '';
            const stayTitle = stay?.title ? String(stay.title) : String(b._id);
            const stayLocation = stay?.location ? String(stay.location) : '';
            const stayDescription = stay?.description ? String(stay.description) : '';
            const room = typeof b.room === 'object' ? (b.room as Room) : null;
            const roomPrice = room?.price ? String(room.price) : 'N/A';
            
            return (
            <div key={i}
              className="shadow-md rounded-xl pb-6 flex flex-col cursor-pointer">
              {hasImage && stay?.image && (
                <img 
                  src={String(stay.image)} 
                  alt={stayTitle}
                  className="rounded-t-xl w-full h-55 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              )}
              <div className={`bg-gray-300 rounded-t-xl w-full min-h-55 flex items-center justify-center text-gray-500 ${hasImage ? 'hidden' : ''}`}>
                No image
              </div>
              <div className="lower-half px-4 h-full flex flex-col">
                <div className="py-3">
                  <h6>{stayTitle}</h6>
                  <p className="caption">{stayLocation}</p>
                </div>
                <div className="space-y-3 h-full flex flex-col justify-between">
                  <p className="paragraph line-clamp-5">{stayDescription}</p>
                  <hr className="solid text-(--grey)" />
                  <div className="flex justify-between items-center">
                    <p className="body-small">{roomPrice} kr / night</p>
                  </div>
                </div>
              </div>
            </div>
            )
          })
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