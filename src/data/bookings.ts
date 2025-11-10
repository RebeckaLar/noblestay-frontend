export const dummyBookings: Booking[] = [
    {
    user: { type: 1212, ref: 'User', required: true },
    bookedStay: { type: 8989, ref: 'Stay', required: true},
    checkInDate: 7,
    checkOutDate: 10,
    room: "Standard room",
    guestType: "Adult",
    numberOfGuests: 2,
    }
]