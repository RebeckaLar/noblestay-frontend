
type Stay = {
    id: Number,
    title: String; 
    description: String;
    rules: String;
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true };
    location: String;
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}];
    guestType: GuestCategory;
    numberOfGuests: Number;
    room: Room;
    price: Number;
    availableEvent?: String;
}

type Booking = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true };
    bookedStay: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay', required: true};
    checkInDate: Number;
    checkOutDate: Number;
    room: Room;
    guestType: GuestCategory;
    numberOfGuests: Number;
}

type User = {
    // guestName: string;
    email: String;
    password: String; //never save in plain text! encryption required¨
    uid: Number,
}

type GuestCategory =  "Adult" | "Children" | "Pets"

type Room = {
    rid: Number,
    title: String,
    roomCategory: "Standard Castle Room" | "Luxury Ruite" | "Unique Tower Room"
    description: String,
    price: Number
}

