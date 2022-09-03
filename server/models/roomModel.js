import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserDetails",
    },
    image: { type: String },
    replies: [
      {
        name: { type: String, required: true },
        reply: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "UserDetails",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const roomSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserDetails",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    details: {
      type: String,
      required: [true, "Details is required"],
    },
    standard: {
      type: String,
      required: [true, "Standard is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      default: 0,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
    },
    noofbeds: {
      type: Number,
      required: [true, "No Of Beds is required"],
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
