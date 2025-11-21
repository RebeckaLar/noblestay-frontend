import { FaCheck } from "react-icons/fa6";
import { useBooking } from "@/contexts/BookingContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { IoLocationOutline } from "react-icons/io5";
import { CgArrowRight } from "react-icons/cg";

const BookingConfirmedPage = () => {
  const { userBookings, fetchUserBookings } = useBooking();
  const params = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      const bookingId = params.id;
      if (bookingId) {
        // Fetch specific booking by ID
        try {
          const token = sessionStorage.getItem('jwt');
          const res = await api.get(`/api/bookings/${bookingId}`, {
            headers: { authorization: `Bearer ${token}` }
          });
          console.log('Fetched booking:', res.data);
          console.log('bookedStay:', res.data.bookedStay);
          console.log('bookedStay type:', typeof res.data.bookedStay);
          setBooking(res.data);
        } catch (error) {
          console.error('Failed to fetch booking:', error);
        }
      } else {
        // Fallback: fetch all user bookings and get the most recent
        await fetchUserBookings();
        if (userBookings.length > 0) {
          setBooking(userBookings[userBookings.length - 1]);
        }
      }
      setLoading(false);
    };
    
    fetchBooking();
  }, [params.id]);

  if (loading) {
    return <div className="container mx-auto px-4 mt-6">Loading booking details...</div>;
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <p>No booking found.</p>
        <button onClick={() => navigate('/bookings')} className="primary-btn mt-4">
          View My Bookings
        </button>
      </div>
    );
  }

  const stay = typeof booking.bookedStay === 'object' ? booking.bookedStay : null;
  const room = typeof booking.room === 'object' ? booking.room : null;
  const checkInDate = new Date(Number(booking.checkInDate)).toLocaleDateString();
  const checkOutDate = new Date(Number(booking.checkOutDate)).toLocaleDateString();

  return (
    <div>
      <div className="flex flex-col items-center px-6">
        <FaCheck className="text-4xl text-(--success) mt-10"/>
        <h4>Booking completed!</h4>
        <p className="body-small mt-2 mb-10">A booking confirmation has been sent to your mail.</p>
        
        <div className="w-full max-w-md bg-white border rounded-xl p-6 space-y-4">
          
          {stay && (
            <div className="p-3">
              <h6 className="mb-1">{String(stay.title)}</h6>
              <div className="flex gap-1">
                <IoLocationOutline />
                <p className="caption">{stay.location}</p>
              </div>
                {/* <p className="caption text-(--grey)">{stay.rules}</p> */}
            </div>
          )}
          
          <hr className="solid text-(--grey)" />

          {/* Booking details: DATE */}
            <div className="p-3">
            <h6 className="">Date:</h6>
            <div className="flex gap-2 items-center">
              <p className="body-small">{checkInDate}</p>
              <CgArrowRight className="text-(--grey)" />
              <p className="body-small">{checkOutDate}</p>
            </div>
          </div>
          
          <hr className="solid text-(--grey)" />
          
          {room && (
            <div>
              <p className="caption text-gray-500">Room</p>
              <p className="paragraph">{String(room.title)}</p>
              <p className="caption">{String(room.roomCategory)}</p>
            </div>
          )}
          
          <div className="p-3">
            <h6>Guests:</h6>
            <p className="paragraph">{booking.numberOfGuests} guest{booking.numberOfGuests > 1 ? 's' : ''}</p>
          </div>
          
          <hr className="solid text-(--grey)" />
          
          <div className="p-3">
            <h6>Booking ID:</h6>
            <p className="caption font-mono">{String(booking._id)}</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/bookings')} 
          className="primary-btn mt-6"
        >
          View All Bookings
        </button>
      </div>
    </div>
  )
}
export default BookingConfirmedPage