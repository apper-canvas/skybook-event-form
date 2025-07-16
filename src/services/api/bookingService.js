import bookingData from "@/services/mockData/bookings.json";

let bookings = [...bookingData];

export const bookingService = {
  createBooking: async (bookingDetails) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBooking = {
      ...bookingDetails,
      Id: Math.max(...bookings.map(b => b.Id), 0) + 1,
      bookingId: `SKY${Date.now().toString().slice(-6)}`,
      bookingDate: new Date().toISOString(),
      status: "confirmed"
    };
    
    bookings.push(newBooking);
    return newBooking;
  },

  getAllBookings: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...bookings];
  },

  getBookingById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return bookings.find(booking => booking.Id === parseInt(id));
  },

  updateBooking: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bookingIndex = bookings.findIndex(booking => booking.Id === parseInt(id));
    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }
    
    bookings[bookingIndex] = { ...bookings[bookingIndex], ...updates };
    return bookings[bookingIndex];
  },

  cancelBooking: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bookingIndex = bookings.findIndex(booking => booking.Id === parseInt(id));
    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }
    
    bookings[bookingIndex].status = "cancelled";
    return bookings[bookingIndex];
  },

  deleteBooking: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bookingIndex = bookings.findIndex(booking => booking.Id === parseInt(id));
    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }
    
    const deletedBooking = bookings[bookingIndex];
    bookings.splice(bookingIndex, 1);
    return deletedBooking;
  }
};