import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// @description   Contact admin
// @route         POST /api/contact
// @access        Private
const contactAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, comment } = req.body;

  const contact = new Contact({
    user: req.userId,
    firstName,
    lastName,
    email,
    comment,
  });

  const contactData = await contact.save();

  res.status(201).json(contactData);
});

// @description   Update Contact List Approval
// @route         PUT /api/contact/:id/resolve
// @access        Admin/Private
const updateContactStatus = asyncHandler(async (req, res) => {
  const contactData = await Contact.findById(req.params.id);

  if (!contactData) {
    res.status(404);
    throw new Error("No such booked rooms");
  }

  contactData.isResolved = !contactData.isResolved;

  const updatedContact = await contactData.save();

  res.json(updatedContact);
});

// @description   Get all contacts admin
// @route         GET /api/contact
// @access        Private/Admin
const getAllContacts = asyncHandler(async (req, res) => {
  const getAllContactDetail = await Contact.find({}).populate({
    path: "user",
    select: ["role"],
    strictPopulate: false,
  });

  res.json(getAllContactDetail);
});

// @description   Delete contact
// @route         DELETE /api/contact/:id
// @access        Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.remove();

  res.json({ message: "Contact Deleted Successfully" });
});

export { contactAdmin, getAllContacts, updateContactStatus, deleteContact };
