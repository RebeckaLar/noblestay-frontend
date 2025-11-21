import { createContext, useContext, useState, type PropsWithChildren } from "react";
import axios from "../api/axios";

type BookingData = {
  _id: string;
  dateRange: { from: Date; to: Date };
  guestType: Stay['guestType'];
  numberOfGuests: number;
  adults?: number;
  children?: number;
  pets?: number;
  stayId: string;
};

type BookingContextType = {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData) => void;
  clearBooking: () => void;
  createBooking: () => Promise<string | null>; // returns booking ID or null
  bookingLoading: boolean;
  bookingError: string | null;
  userBookings: Booking[];
  fetchUserBookings: () => Promise<void>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: PropsWithChildren) {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const clearBooking = () => setBookingData(null);

  const createBooking: BookingContextType['createBooking'] = async () => {
    if (!bookingData) {
      setBookingError('No booking data to submit');
      return null;
    }
    setBookingLoading(true);
    setBookingError(null);
    try {
      const token = sessionStorage.getItem('jwt');
      if (!token) {
        setBookingError('You must be logged in to confirm booking');
        return null;
      }
      // Build payload expected by backend
      const payload = {
        stayId: bookingData.stayId,
        room: bookingData._id, // backend expects 'room'
        checkInDate: bookingData.dateRange.from.toISOString(),
        checkOutDate: bookingData.dateRange.to.toISOString(),
        guestType: bookingData.guestType,
        numberOfGuests: bookingData.numberOfGuests,
        adults: bookingData.adults ?? 0,
        children: bookingData.children ?? 0,
        pets: bookingData.pets ?? 0,
      };
      const res = await axios.post('/api/bookings', payload, {
        headers: { authorization: `Bearer ${token}` }
      });

      if (res.status === 201 || res.status === 200) {
        // Return the booking ID from the response
        return res.data._id || null;
      }
      setBookingError('Unexpected response from server');
      return null;
    } catch (err: any) { //FIX
      setBookingError(err?.response?.data?.message || 'Failed to create booking');
      return null;
    } finally {
      setBookingLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    setBookingLoading(true);
    setBookingError(null);
    try {
      const token = sessionStorage.getItem('jwt');
      if (!token) {
        setBookingError('You must be logged in to view bookings');
        setUserBookings([]);
        return;
      }
      const res = await axios.get('/api/bookings/auth', {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.status === 200 && Array.isArray(res.data)) {
        setUserBookings(res.data);
      } else {
        setBookingError('Unexpected response from server');
        setUserBookings([]);
      }
    } catch (err: any) {
      setBookingError(err?.response?.data?.message || 'Failed to fetch bookings');
      setUserBookings([]);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, clearBooking, createBooking, bookingLoading, bookingError, userBookings, fetchUserBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
