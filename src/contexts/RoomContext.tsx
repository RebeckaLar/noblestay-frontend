import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import LocalStorageService from "../utils/LocalStorageService";
import { dummyRooms } from "../data/rooms";
import { dummyBookings } from "../data/bookings";
// import { preDefinedTags } from "../data/tag"; //NYTT

type RoomState = {
  room: Room[];
  bookings: Booking[];
  actions: {
    createRoom: (room: Room) => void;
    // getRoomByID: (roomId: Room['_id']) => Room | undefined;
    getRoomByID: (roomId: String) => Room | undefined;
    // addBooking: (booking: Booking) => void;
  }
};

const defaultState: RoomState = {
  room: [],
  bookings: [],
  actions: {
    createRoom: () => { },
    getRoomByID: () => undefined,
    // addBooking: () => { },
  }
};

const RoomContext = createContext<RoomState>(defaultState);

function RoomProvider({ children }: PropsWithChildren) {
  const [room, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    _getRooms();
    // getBookings();
  }, [])

  const _getRooms = () => {
    const _rooms: Room[] = LocalStorageService.getItem('@stays/rooms', dummyRooms);
    setRooms(_rooms)
    
  }

  const createRoom: typeof defaultState.actions.createRoom = (newRoom) => {
    const newRooms = [...room, newRoom]
    setRooms(newRooms)
    LocalStorageService.setItem<Room[]>('@stays/rooms', newRooms)
  }

  const getRoomByID: typeof defaultState.actions.getRoomByID = (roomId: String): Room | undefined => {
    // return room.find(room => room._id === roomId)
    return room.find(r => String(r._id) === String(roomId))
  }
//   const addBooking: typeof defaultState.actions.addBooking = (booking): void => {
//     const newBookings = [...bookings, booking]
//     setBookings(newBookings)
//     LocalStorageService.setItem<Booking[]>('@room/bookings', newBookings)

//     setBookings(newBookings)
//   }

//   const getBookings = () => {
//     const _bookings: Booking[] = LocalStorageService.getItem('@room/bookings', dummyBookings)
//     setBookings(_bookings)
//   }

  const actions: typeof defaultState.actions = {
    createRoom,
    getRoomByID,
    // addBooking,
  }

  return (
    <RoomContext.Provider value={{
      room,
      bookings,
      actions
    }}>
      {children}
    </RoomContext.Provider>
  )
}
function useRoom() {
  const context = useContext(RoomContext);
  return context;
}
export {
  RoomProvider,
  useRoom
}