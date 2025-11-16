import { useStay } from "@/contexts/StayContext";
import { useRoom } from "@/contexts/RoomContext";
import { useBooking } from "@/contexts/BookingContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { BiChevronLeft } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { CgArrowRight } from "react-icons/cg";

function BookingReviewPage() {
  const navigate = useNavigate();
  const { actions } = useStay();
  const { actions: roomActions } = useRoom();
  const { bookingData, clearBooking } = useBooking();
  
  //If no booking data, redirect back
  if (!bookingData) {
    return (
      <div className="container mx-auto px-4">
        <h5>No booking data found</h5>
        <Button onClick={() => navigate('/')}>Go back to home</Button>
      </div>
    );
  }
  
  //Get stay and room details
  const stay = actions.getStayByID(Number(bookingData.stayId));
  const room = roomActions.getRoomByID(Number(bookingData.rid));
  
  if (!stay) {
    return <div>Stay not found</div>;
  }
  
  return (
    <>
      <button onClick={() => navigate(-1)} className='flex gap-2 items-center mb-3 mt-6'>
          <BiChevronLeft />
          <p>Go back without booking</p>
        </button>

      <div className="container mx-auto px-4">
        <h4>Booking Summary</h4>
        
        {/* <div className="mt-6 space-y-4"> */}
          {/* Stay Details */}
          <div className="p-4">
            <div className=" bg-gray-300 h-58 rounded-xl">Image</div>
            <h6>{stay.title}</h6>
            <div className="flex gap-1">
              <IoLocationOutline />
              <p className="caption">{stay.location}</p>
            </div>
            <p className="caption text-(--grey)">{stay.rules}</p>
          </div>
          
          <hr className="solid text-(--grey)"></hr>

          {/* Booking details: DATE */}
            <div className="p-4">
            <h6>Date:</h6>
            <div className="flex gap-1 items-center">
              <p className="body-small">{new Date(bookingData.dateRange.from).toLocaleDateString()}</p>
              <CgArrowRight />
              <p className="body-small">{new Date(bookingData.dateRange.to).toLocaleDateString()}</p>
            </div>
          </div>     

          <hr className="solid text-(--grey)"></hr>   
          
          {/* Booking Details: ROOM */}
          {room && (
            <div className="p-4">
              <h6>Room:</h6>
              <div className="flex gap-1 items-center">
                <p className="body-small">1 {room.roomCategory}</p>
              </div>
            </div>
          )}

          <hr className="solid text-(--grey)"></hr>
          
          {/* Booking Details: GUESTS */}
          <div className="p-4">
            <h6>Guests:</h6>
            <div className="space-y-1">
              {bookingData.adults && bookingData.adults > 0 && (
                <p className="body-small">{bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}</p>
              )}
              {bookingData.children && bookingData.children > 0 && (
                <p className="body-small">{bookingData.children} Child{bookingData.children > 1 ? 'ren' : ''}</p>
              )}
              {bookingData.pets && bookingData.pets > 0 && (
                <p className="body-small">{bookingData.pets} Pet{bookingData.pets > 1 ? 's' : ''}</p>
              )}
              <p className="caption text-gray-500">Total: {bookingData.numberOfGuests} guest{bookingData.numberOfGuests > 1 ? 's' : ''}</p>
            </div>
          </div>

          <hr className="solid text-(--grey)"></hr>
          {/* Booking details: PRICE */}
          <div className="p-4">
            <h6>Price</h6>
            {room && (
              <p>{room.price.toString()}</p>
            )}
          </div>
          
          {/* ACTION BUTTON */}
          <div className="flex justify-center gap-4 mt-6">
            <Button className="action-btn" onClick={() => {
              // TO-DO: Implement actual booking confirmation
              console.log("Booking confirmed!");
              clearBooking(); // Clear booking data after confirmation
              alert("Booking confirmed! (This is a demo)");
              navigate('/');
            }}>
              CONFIRM BOOKING
            </Button>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}
export default BookingReviewPage