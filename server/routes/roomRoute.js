import { Router } from "express";
import {
  createRoom,
  getRoomById,
  updateRoom,
  getRooms,
  updateRoomStatus,
  deleteRoom,
  createRoomReview,
  replyRoomReview,
  deleteRoomReview,
} from "../controller/roomController.js";

import { auth, isAdmin } from "../middleware/auth.js";

const router = Router();

router.route("/").get(getRooms).post(auth, createRoom);
router
  .route("/:id")
  .put(auth, updateRoom)
  .get(getRoomById)
  .delete(auth, deleteRoom);
router.route("/:id/reviews").post(auth, createRoomReview);
router.route("/:id/status").put(auth, updateRoomStatus);
router.route("/:id/:review_id").delete(auth, deleteRoomReview);
router.route("/:room_id/:review_id/reply").put(auth, isAdmin, replyRoomReview);

export default router;
