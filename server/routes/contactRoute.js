import express from "express";
const router = express.Router();
import {
  contactAdmin,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../controller/contactController.js";
import { auth, isAdmin } from "../middleware/auth.js";

router.route("/").post(auth, contactAdmin).get(auth, isAdmin, getAllContacts);
router.route("/:id/resolve").put(auth, isAdmin, updateContactStatus);
router.route("/:id").delete(auth, isAdmin, deleteContact);

export default router;
