import { createContext, useContext, useState, type PropsWithChildren } from "react";

type BookingData = {
  rid: string;
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
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: PropsWithChildren) {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const clearBooking = () => setBookingData(null);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, clearBooking }}>
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
