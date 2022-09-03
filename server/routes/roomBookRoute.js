import express from "express";
const router = express.Router();
import { auth, isAdmin } from "../middleware/auth.js";
import {
  addBookRooms,
  deleteBookedRooms,
  getBookedRooms,
  getMyBookedRooms,
  getBookedRoomById,
  updateRoomApproval,
  updateRoomPayment,
} from "../controller/roomBookController.js";

router
  .route("/:id")
  .get(auth, getBookedRoomById)
  .post(auth, addBookRooms)
  .delete(auth, deleteBookedRooms);
router.route("/").get(auth, isAdmin, getBookedRooms);
router.route("/my/own").get(auth, getMyBookedRooms);
router.route("/:id/approve").put(auth, isAdmin, updateRoomApproval);
router.route("/:id/payment").put(auth, updateRoomPayment);

export default router;
