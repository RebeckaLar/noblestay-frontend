
type Stay = {
    // id: Number,
    _id: String;
    title: String; 
    description: String;
    rules: "Check-in från 15:00";
    owner: User;
    location: String;
    bookings: Booking;
    guestType: GuestCategory;
    numberOfGuests: Number;
    room: Room;
    price: Number;
    availableEvent?: String,
    // Source - https://stackoverflow.com/a
    // Posted by Misaz
    // Retrieved 2025-11-19, License - CC BY-SA 3.0
    image?: HTMLImageElement | String
}

type Booking = {
    _id: string;
    user: User;
    bookedStay: Stay | string;
    checkInDate: number;
    checkOutDate: number;
    room: Room | string;
    guestType: GuestCategory;
    numberOfGuests: number;
}

type User = {
    userName: String,
    email: String;
    password: String; //never save in plain text! encryption required¨
    _id: String;
}

type GuestCategory =  "Adult" | "Children" | "Pets"

type Room = {
    _id: String,
    title: String,
    roomCategory: "Standard Castle Room" | "Luxury Ruite" | "Unique Tower Room"
    description: String,
    price: Number
}

