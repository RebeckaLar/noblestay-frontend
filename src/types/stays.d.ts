
type Stay = {
    title: String; 
    description: String;
    rules: String;
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true };
    location: String;
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}];
    guestType: String;
    numberOfGuests: Number;
    room: String;
    price: Number;
    availableEvent?: String;
}

type Booking = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true };
    bookedStay: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay', required: true};
    checkInDate: Number;
    checkOutDate: Number;
    room: String;
    guestType: String;
    numberOfGuests: Number;
}

type User = {
    // guestName: string;
    email: string;
    password: string; //never save in plain text! encryption required¨
    id: number,
}