import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";

// @description   Get Room By Id
// @route         GET /api/rooms/:id
// @access        Admin/Private
const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id).populate({
    path: "user",
    select: "name",
    strictPopulate: false,
  });

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
    return;
  }

  res.json(room);
});

// @description   Fetch all Rooms
// @route         GET /api/rooms?keyword=""
// @access        Admin/Private
const getRooms = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const { sort } = req.query;
  const SORT = sort || "createdAt";

  const rooms = await Room.find({ ...keyword }).sort(SORT);

  res.json(rooms);
});

// @description   Create a Room
// @route         POST /api/rooms
// @access        Admin/Private
const createRoom = asyncHandler(async (req, res) => {
  const {
    title,
    details,
    standard,
    price,
    capacity,
    condition,
    noofbeds,
    image,
  } = req.body;

  const room = new Room({
    title,
    image,
    user: req.userId,
    details,
    standard,
    price,
    capacity,
    condition,
    noofbeds,
  });

  await room.save();

  res.status(201).json(room);
});

// @description   Update Room
// @route         PUT /api/rooms/:id
// @access        Admin/Private
const updateRoom = asyncHandler(async (req, res) => {
  const {
    title,
    details,
    standard,
    price,
    capacity,
    condition,
    noofbeds,
    image,
  } = req.body;

  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
    return;
  }

  room.title = title;
  room.details = details;
  room.standard = standard;
  room.price = price;
  room.capacity = capacity;
  room.condition = condition;
  room.noofbeds = noofbeds;
  room.image = image;

  const updatedRoom = await room.save();
  res.status(201).json(updatedRoom);
});

// @description   Delete Room
// @route         Delete /api/rooms/:id
// @access        Admin/Private
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
    return;
  }

  await room.remove();

  res.json({ message: "Room Deleted" });
});

// @description   Update Room Availability
// @route         PUT /api/rooms/:id/available
// @access        Admin/Private
const updateRoomStatus = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  if (room.isAvailable) {
    room.isAvailable = false;
  } else {
    room.isAvailable = true;
  }

  await room.save();

  res.json({ room });
});

// @description   Review Room
// @route         PUT /api/rooms/:id/reviews
// @access        Private
const createRoomReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  const alreadyReviewed = room.reviews.find(
    review => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Room already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.userId,
    image: req.user.selectedFile,
  };

  room.reviews.push(review);

  room.numReviews = room.reviews.length;

  room.rating =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save();
  res.status(201).json({ message: "Review added", room });
});

// @description   Review Room
// @route         PUT /api/rooms/:room_id/:review_id/reply
// @access        Private
const replyRoomReview = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { reply } = req.body;
  const room = await Room.findById(req.params.room_id);

  const review = room.reviews.find(
    review => review.id === req.params.review_id
  );

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const replyData = {
    name: req.user.name,
    reply,
    user: req.userId,
  };

  review.replies.push(replyData);

  await room.save();

  res.json(review.replies);
});

// @description   Delete Room Review
// @route         DELETE /api/rooms/:id/:review_id
// @access        Private
const deleteRoomReview = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  const review = room.reviews.find(
    review => review.id === req.params.review_id
  );

  if (!review) {
    res.status(404);
    throw new Error("No Review Found");
    return;
  }

  if (review.user.toString() !== req.userId) {
    res.status(401);
    throw new Error("User not authorized");
    return;
  }

  room.reviews = room.reviews.filter(
    review => review.id !== req.params.review_id
  );

  await room.save();

  res.json(room.reviews);
});

export {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  createRoomReview,
  updateRoomStatus,
  replyRoomReview,
  deleteRoomReview,
};
