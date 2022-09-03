import asyncHandler from "express-async-handler";
import RoomBook from "../models/roomBookModel.js";
import Room from "../models/roomModel.js";

// @description   Book a room
// @route         POST /api/booked/rooms
// @access        Private
const addBookRooms = asyncHandler(async (req, res) => {
  const { name, email, phnumber, noofguests, bookingDate, noofdays } = req.body;

  const roomData = await Room.findById(req.params.id);

  if (!roomData) {
    res.status(400);
    throw new Error("Invalid Room Id");
    return;
  }

  const bookedRoom = new RoomBook({
    user: req.userId,
    room: req.params.id,
    name,
    email,
    phnumber,
    noofguests,
    bookingDate,
    noofdays,
  });

  bookedRoom.isBooked = true;

  bookedRoom.save();

  res.status(201).json(bookedRoom);
});

// @description   Get all booked rooms
// @route         GET /api/booked/rooms
// @access        Private/Admin
const getBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.find({}).populate({
    path: "room",
    select: "title",
    strictPopulate: false,
  });

  res.json(roomData);
});

// @description   Get booked rooms By Id
// @route         GET /api/booked/rooms/:id
// @access        Private
const getBookedRoomById = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.findById(req.params.id).populate({
    path: "room",
    select: [
      "image",
      "title",
      "price",
      "capacity",
      "noofbeds",
      "rating",
      "numReviews",
    ],
    strictPopulate: false,
  });

  if (!roomData) {
    res.status(404);
    throw new Error("No such booked rooms");
  }

  res.json(roomData);
});

// @description   Get my booked rooms
// @route         GET /api/booked/rooms/me
// @access        Private/
const getMyBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.find({ user: req.userId }).populate({
    path: "room",
    select: ["image", "standard", "price", "rating"],
    strictPopulate: false,
  });

  if (!roomData) {
    res.status(404);
    throw new Error("No Booked Rooms");
  }

  res.json(roomData);
});

// @description   Update Room Approval
// @route         PUT /api/booked/rooms/:id/approve
// @access        Admin/Private
const updateRoomApproval = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.findById(req.params.id);

  if (!roomData) {
    res.status(404);
    throw new Error("No such booked rooms");
  }

  // if (!roomData.isApproved) {
  //   roomData.isApproved = true;
  // } else {
  //   roomData.isApproved = false;
  // }

  roomData.isApproved = !roomData.isApproved;

  const updatedRoom = await roomData.save();

  res.json(updatedRoom);
});

// @description   Update Room Approval
// @route         PUT /api/booked/rooms/:id/payment
// @access        Admin/Private
const updateRoomPayment = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.findById(req.params.id);

  if (!roomData) {
    res.status(404);
    throw new Error("No such booked rooms");
  }

  roomData.isPaid = true;

  await roomData.save();

  res.json(roomData);
});

// @description   Delete my booked rooms
// @route         DELETE /api/booked/rooms/:id
// @access        Private/Admin & Private
const deleteBookedRooms = asyncHandler(async (req, res) => {
  const roomData = await RoomBook.findById(req.params.id);

  if (!roomData) {
    res.status(404);
    throw new Error("No Such Booked Rooms");
    return;
  }

  await roomData.remove();

  res.json({ message: "Booked Room Deleted" });
});

export {
  addBookRooms,
  getBookedRooms,
  getMyBookedRooms,
  getBookedRoomById,
  deleteBookedRooms,
  updateRoomApproval,
  updateRoomPayment,
};
