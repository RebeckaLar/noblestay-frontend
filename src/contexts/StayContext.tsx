import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import LocalStorageService from "../utils/LocalStorageService";
import { dummyBookings } from "../data/bookings";
import api from "../api/axios";
// import { preDefinedTags } from "../data/tag"; //NYTT

type StayState = {
  stays: Stay[];
  bookings: Booking[];
//   tags: StayTag[]; //NYTT
  actions: {
    createStay: (stay: Stay) => void;
    // updateQNAStay: (threadIndex: number, updatedStay: QNAStay) => void;
    getStayByID: (stayId: string) => Stay | undefined;
    addBooking: (booking: Booking) => void;
    // addTags: (tag: StayTag) => void; //NYTT
    // isQNAAnswered: (stayId: Stay['id']) => boolean;
    // toggleBookingsLock: (stayId: Stay['id']) => void;
  }
};

const defaultState: StayState = {
  stays: [],
  bookings: [],
//   tags: [], //NYTT
  actions: {
    createStay: () => { },
    // updateQNAStay: () => {},
    getStayByID: () => undefined,
    addBooking: () => { },
    // addTags: () => { }, //NYTT
    // isQNAAnswered: () => false,
    // toggleBookingsLock: () => { }
  }
};

const StayContext = createContext<StayState>(defaultState);

function StayProvider({ children }: PropsWithChildren) {
  const [stays, setStays] = useState<Stay[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
//   const [tags, setTags] = useState<StayTag[]>([]); //NYTT

  useEffect(() => {
    _getStays();
    getBookings();
    // getTags(); //NYTT
  }, [])

  const _getStays = async () => {
    try {
      const res = await api.get('/api/stays');
      if (res.status === 200 && Array.isArray(res.data)) {
        // Persist a copy locally as cache
        LocalStorageService.setItem<Stay[]>('@stays/stays', res.data as unknown as Stay[]);
        setStays(res.data as unknown as Stay[]);
        return;
      }
      // Non-200 or unexpected shape → fallback to cache
      const cached: Stay[] = LocalStorageService.getItem('@stays/stays', []);
      setStays(cached);
    } catch (err) {
      // Network/API error → fallback to cache
      const cached: Stay[] = LocalStorageService.getItem('@stays/stays', []);
      setStays(cached);
    }
  }

  const createStay: typeof defaultState.actions.createStay = (stay) => {
    const newStays = [...stays, stay]
    setStays(newStays)
    LocalStorageService.setItem<Stay[]>('@stays/stays', newStays)
  }

  const getStayByID: typeof defaultState.actions.getStayByID = (stayId: string): Stay | undefined => {
    // Match by Mongo _id as string; fallback to id if present in cached/local data
    return stays.find(stay => String((stay as any)._id) === String(stayId) || String((stay as any).id) === String(stayId))
  }
  const addBooking: typeof defaultState.actions.addBooking = (booking): void => {
    const newBookings = [...bookings, booking]
    setBookings(newBookings)
    LocalStorageService.setItem<Booking[]>('@stays/bookings', newBookings)

    setBookings(newBookings)
  }

  const getBookings = () => {
    const _bookings: Booking[] = LocalStorageService.getItem('@stays/bookings', dummyBookings)
    setBookings(_bookings)
  }

//     const addTags: typeof defaultState.actions.addTags = (tag): void => {
//     const newTags = [...tags, tag]
//     setTags(newTags)
//     LocalStorageService.setItem<StayTag[]>('@stays/tags', newTags)

//     setTags(newTags)
//   }

//     const getTags = () => {
//     const _tags: StayTag[] = LocalStorageService.getItem('@stays/tags', preDefinedTags)
//     setTags(_tags)
//   }

//   const toggleBookingsLock: typeof defaultState.actions.toggleBookingsLock = (stayId: number): void => {
//     const updatedStays = stays.map((stay) =>
//       stay.id === stayId
//         ? { ...stay, bookingsLocked: !stay.bookingsLocked }
//         : stay
//     );

//     setStays(updatedStays);
//     LocalStorageService.setItem('@stays/stays', updatedStays);
//   }

  const actions: typeof defaultState.actions = {
    createStay,
    // updateQNAStay,
    getStayByID,
    addBooking,
    // addTags,
    // isQNAAnswered,
    // toggleBookingsLock
  }

  return (
    <StayContext.Provider value={{
      stays,
      bookings,
    //   tags,
      actions
    }}>
      {children}
    </StayContext.Provider>
  )
}
function useStay() {
  const context = useContext(StayContext);
  return context;
}
export {
  StayProvider,
  useStay
}