import { useStay } from "@/contexts/StayContext";
import { useRoom } from "@/contexts/RoomContext";
import { useBooking } from "@/contexts/BookingContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { BiChevronLeft } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { CgArrowRight } from "react-icons/cg";
import { useUser } from "@/contexts/UserContext";
import LoginForm from "@/components/LoginForm";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";

function BookingReviewPage() {
  const navigate = useNavigate();
  const { actions } = useStay();
  const { actions: roomActions } = useRoom();
  const { bookingData, clearBooking, createBooking, bookingLoading, bookingError } = useBooking();
  const { currentUser } = useUser()
  const [showRegister, setshowRegister] = useState<boolean>(false)
  
  //If no booking data, redirect back
  if (!bookingData) {
    return (
      <div className="container mx-auto px-4">
        <h5 className="m-4">No booking data found</h5>
        <div className="flex gap-2 items-center mb-3">
          <BiChevronLeft />
          <button onClick={() => navigate('/')}>Go back to home</button>
        </div>
      </div>
    );
  }
  
  //Get stay and room details
  const stay = actions.getStayByID(bookingData.stayId);
  const room = roomActions.getRoomByID(bookingData._id);
  
  if (!stay) {
    return <div>Stay not found</div>;
  }
  // Derived pricing metrics
  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(bookingData.dateRange.to).getTime() -
        new Date(bookingData.dateRange.from).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const nightly = room ? Number(room.price) : 0;
  const total = nightly * nights;
  
  return (
    <>
      <button onClick={() => navigate(-1)} className='flex gap-2 items-center mb-3 mt-6'>
          <BiChevronLeft />
          <p>Go back without booking</p>
        </button>

      <div className="container mx-auto px-4">

        
        {/* <div className="mt-6 space-y-4"> */}
          {/* Stay Details */}
          <div className="p-4">
            <div>
            <h4>Booking Summary</h4>
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
            <div className="flex gap-2 items-center">
              <p className="body-small">{new Date(bookingData.dateRange.from).toLocaleDateString()}</p>
              <CgArrowRight className="text-(--grey)" />
              <p className="body-small">{new Date(bookingData.dateRange.to).toLocaleDateString()}</p>
            </div>
            <p className="caption text-(--grey) mt-1">
              Nights: {Math.max(1, Math.ceil((new Date(bookingData.dateRange.to).getTime() - new Date(bookingData.dateRange.from).getTime()) / (1000*60*60*24)))}
            </p>
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
              <div className="space-y-1">
                <p className="caption">{nights} night{nights>1?'s':''} x {nightly} SEK</p>
                <p className="body-small font-medium">Total: {total} SEK</p>
              </div>
            )}
          </div>
          </div>

          <div className="flex flex-col items-center">
          { !currentUser && !showRegister &&
            <div>
              <LoginForm onSuccess={() => console.log('Login successful')}/>
                <p className="text-sm my-4">Don't have an account? {''}
                <button className="text-(--action) underline text-sm" onClick={() => setshowRegister(true)}>SIGN UP</button>
              </p>
            </div>
          }

          { !currentUser && showRegister && 
          <div>
            <RegisterForm onSuccess={() => setshowRegister(false)}/>
              <p className="text-sm my-4">Already have an account? {''}
                <button className="text-(--action) underline text-sm" onClick={() => setshowRegister(false)}>LOGIN</button>
              </p>
            </div>
          }

          { currentUser &&
          <div className="flex flex-col items-center gap-2 mt-6">
            {bookingError && <p className="text-(--error) text-sm">{bookingError}</p>}
            <Button disabled={bookingLoading} className="action-btn my-4" onClick={async () => {
              const bookingId = await createBooking();
              if (bookingId) {
                clearBooking();
                navigate(`/bookingconfirmed/${bookingId}`);
              }
            }}>
              {bookingLoading ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
            </Button>
            <p className="caption text-(--grey)">You will receive a confirmation email shortly.</p>
          </div>
          }
        </div>
      </div>
    </>
  );
}
export default BookingReviewPage