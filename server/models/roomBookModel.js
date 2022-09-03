import mongoose from "mongoose";

const roomOrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  phnumber: { type: String, required: [true, "Phone Number is required"] },
  noofguests: {
    type: Number,
    default: 1,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  noofdays: {
    type: Number,
    default: 1,
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const RoomBook = mongoose.model("RoomBook", roomOrderSchema);

export default RoomBook;
