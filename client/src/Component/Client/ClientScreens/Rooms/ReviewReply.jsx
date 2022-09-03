// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button, Form } from "react-bootstrap";
// import FormContainer from "../../../Admin/AdminScreens/Rooms/FormContainer";
// import { replyRoomReview } from "../../../redux/actions/room";
// import Message from "../../../Message/Message";
// import PropTypes from "prop-types";

// const ReviewReply = ({ roomId, reviewId }) => {
//   const dispatch = useDispatch();

//   const [reply, setReply] = useState("");

//   const roomReviewReply = useSelector(state => state.roomReviewReply);
//   const { error: errorReviewReply } = roomReviewReply;

//   const submitHandler = e => {
//     e.preventDefault();
//     console.log("this is me");
//     dispatch(replyRoomReview(roomId, reviewId, reply));
//   };

//   return (

//   );
// };

// ReviewReply.propTypes = {
//   roomId: PropTypes.string,
//   reviewId: PropTypes.string,
// };

// export default ReviewReply;
