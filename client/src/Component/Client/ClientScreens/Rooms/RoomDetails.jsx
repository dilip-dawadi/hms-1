import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";
import { reportByUser } from "../../../redux/actions/Auth";
import { reportMessage } from "./dropdown";
// function(){
// reportData = {
// reporterUserId: AsingleUser?._id,
// productId: food._id,
// reason: reportReason,
// whatWasComment: whatWasComment,
// date: new Date()
// }
// await dispatch(reportByUser(userId, reportData));
// }

import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoomReview,
  detailRoom,
  replyRoomReview,
} from "../../../redux/actions/room";
import Rating from "../../../Extra/Rating";
import Message from "../../../Message/Message";
import { Link } from "react-router-dom";
import { ROOM_CREATE_REVIEW_RESET } from "../../../redux/constants/actionTypes";
import ReviewReply from "./ReviewReply";
import FormContainer from "../../../Admin/AdminScreens/Rooms/FormContainer";

const RoomDetails = () => {
  const params = useParams();
  const roomId = params.id;
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [report, setReport] = useState("none");

  const roomDetails = useSelector(state => state.roomDetails);
  const { room, loading: loadingDetails } = roomDetails;

  const Auth = useSelector(state => state.Auth);
  const { AsingleUser: userInfo } = Auth;

  const roomReviewCreate = useSelector(state => state.roomReviewCreate);
  const { error: errorRoomReview, success: successRoomReview } =
    roomReviewCreate;

  const roomReviewReply = useSelector(state => state.roomReviewReply);
  const { success: successReplyReview, error: errorReplyReview } =
    roomReviewReply;

  const reportFunc = async (event, newValue, userId, whatWasComment) => {
    // console.log(event);
    const reportData = {
      reporterUserId: userInfo?._id,
      productId: room._id,
      reason: newValue,
      whatWasComment: whatWasComment,
      date: new Date(),
    };
    await dispatch(reportByUser(userId, reportData));
    // console.log(reportData, userId);
  };

  const [reply, setReply] = useState("");

  useEffect(() => {
    if (successRoomReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: ROOM_CREATE_REVIEW_RESET });
    }
    dispatch(detailRoom(roomId));
  }, [dispatch, roomId, successRoomReview, successReplyReview]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createRoomReview(params.id, { rating, comment }));
  };

  return (
    !loadingDetails && (
      <div style={{ paddingTop: "6rem" }} id="roomDetailPage">
        <Container>
          <Row className="my-3">
            <Col md={6}>
              <Image
                src={room.image}
                style={{ height: "28rem", width: "33.5rem" }}
              />
            </Col>
            <Col md={6}>
              <h3>{room.title}</h3>
              <div
                className="room-details-rating-full my-4"
                style={{ display: "flex" }}
              >
                <div>
                  <div
                    className="room-details-rating"
                    style={{
                      marginRight: "8px",
                      color: "black",
                      display: "flex",
                      background: "#e7e4e4",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Rating
                      value={room.rating ? room.rating : 0}
                      text={`${room.rating} out of 5`}
                      color="#523c8d"
                    />
                  </div>
                  <div className="mt-2">
                    <small
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {room.numReviews} customer ratings
                    </small>
                  </div>
                </div>

                <div
                  className="vl"
                  style={{
                    border: "1px solid black",
                    height: "1.5rem",
                    marginTop: "9px",
                  }}
                ></div>

                <p
                  style={{
                    marginLeft: "1rem",
                    color: "black",
                    marginTop: "7px",
                  }}
                >
                  Available{" "}
                  <i
                    className="fa fa-check"
                    aria-hidden="true"
                    style={{
                      marginLeft: "5px",
                      fontSize: "1.2rem",
                      color: "green",
                    }}
                  ></i>
                </p>
              </div>

              <div className="room-details-full" style={{ display: "flex" }}>
                <div
                  className="room-details-full-left"
                  style={{ maxWidth: "17rem", marginRight: "0.8rem" }}
                >
                  <h5>Suite</h5>
                  <div
                    className="room-details-top-icon mt-3"
                    style={{ display: "flex" }}
                  >
                    <i
                      className="fa fa-bed"
                      style={{
                        marginRight: "1rem",
                        fontSize: "1.5rem",
                        marginTop: "5px",
                      }}
                    ></i>
                    <p style={{ fontSize: "0.75rem" }}>
                      It include {room.noofbeds} Queen sized bed, private
                      kitchen, bathroom and some living spaces.
                    </p>
                  </div>
                  <div
                    className="room-details-middle-icon"
                    style={{ display: "flex" }}
                  >
                    <i
                      className="fas fa-bread-slice"
                      style={{
                        marginRight: "1rem",
                        fontSize: "1.5rem",
                        marginTop: "5px",
                      }}
                    ></i>
                    <p style={{ fontSize: "0.75rem" }}>
                      We offer light breakfast coffee with fresh bread &
                      pancakes.
                    </p>
                  </div>
                  <div
                    className="room-details-bottom-icon"
                    style={{ display: "flex" }}
                  >
                    <i
                      className="far fa-sun"
                      style={{
                        marginRight: "1rem",
                        fontSize: "1.5rem",
                        marginTop: "5px",
                      }}
                    ></i>
                    <p style={{ fontSize: "0.75rem" }}>
                      Best sunlight view in the morning.
                    </p>
                  </div>
                </div>

                <div
                  className="vl"
                  style={{
                    border: "1px solid gray",
                    height: "12rem",
                    marginTop: "9px",
                    marginRight: "1.5rem",
                  }}
                ></div>

                <div className="room-details-full-right">
                  <h5>Room Amenities</h5>
                  <div
                    className="room-details-service mt-3"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="room-details-service-left"
                      style={{ marginRight: "1.5rem" }}
                    >
                      <div
                        className="room-details-service-top"
                        style={{ display: "flex", marginTop: "3px" }}
                      >
                        <i
                          className="fas fa-shower"
                          style={{ marginRight: "0.7rem", marginTop: "3px" }}
                        ></i>
                        <p style={{ fontSize: "0.95rem" }}>Shower</p>
                      </div>
                      <div
                        className="room-details-service-middle"
                        style={{ display: "flex", marginTop: "3px" }}
                      >
                        <i
                          className="fa-solid fa-lock"
                          style={{ marginRight: "0.7rem", marginTop: "3px" }}
                        ></i>
                        <p style={{ fontSize: "0.95rem" }}>Safe</p>
                      </div>
                      <div
                        className="room-details-service-bottom"
                        style={{ display: "flex", marginTop: "3px" }}
                      >
                        <i
                          className="fa-solid fa-suitcase"
                          style={{ marginRight: "0.7rem", marginTop: "3px" }}
                        ></i>
                        <p style={{ fontSize: "0.95rem" }}>Luggage</p>
                      </div>
                    </div>
                    <div
                      className="room-details-service-right"
                      style={{ display: "flex" }}
                    >
                      <i
                        className="fas fa-clock"
                        style={{ marginTop: "4px", marginRight: "1rem" }}
                      ></i>
                      <p style={{ fontSize: "0.95rem" }}>24/7 service</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="room-detail-pricing mt-4"
                style={{ marginLeft: "1.5rem", display: "flex" }}
              >
                <h3 style={{ marginRight: "3rem" }}>
                  Rs. {room.price} / Night
                </h3>
                <LinkContainer
                  to={`/${room._id}/book/room`}
                  style={{ background: "#523c8d", borderRadius: "2rem" }}
                >
                  <Button type="primary">Book Now</Button>
                </LinkContainer>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {room.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {room.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        src={review.image}
                        style={{
                          height: "2.5rem",
                          width: "3rem",
                          borderRadius: "50%",
                          marginRight: "1rem",
                        }}
                      />
                      <strong>{review.name}</strong>
                      <Autocomplete
                        freeSolo
                        options={reportMessage.map(option => option.value)}
                        onChange={(event, newValue) =>
                          reportFunc(
                            event,
                            newValue,
                            review.user,
                            review.comment
                          )
                        }
                        value={report}
                        fullWidth={false}
                        style={{
                          display: "inline",
                          width: "50%",
                        }}
                        renderInput={params => (
                          <TextField {...params} label="report" />
                        )}
                      />
                    </div>
                    <Rating value={review.rating} />
                    <p style={{ color: "gray" }}>
                      Reviewed on {review.createdAt.substring(0, 10)}
                    </p>
                    <p style={{ marginRight: "2rem" }}>{review.comment}</p>
                    {userInfo?.role > 0 && (
                      // <ReviewReply
                      //   roomId={room._id}
                      //   reviewId={review._id}
                      // ></ReviewReply>
                      <FormContainer>
                        {errorReplyReview && (
                          <Message variant="danger">{errorReplyReview}</Message>
                        )}
                        <Form
                          onSubmit={e => {
                            e.preventDefault();
                            dispatch(
                              replyRoomReview(room._id, review._id, reply)
                            );
                          }}
                        >
                          <Form.Group controlId="reply">
                            <Form.Label>Reply</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={reply}
                              onChange={e => setReply(e.target.value)}
                              style={{ resize: "none" }}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            type="submit"
                            variant="primary"
                            className="mt-3 mb-3"
                          >
                            Submit
                          </Button>
                        </Form>
                      </FormContainer>
                    )}

                    {review?.replies.length > 0 &&
                      review?.replies.map(replyData => (
                        <div style={{ marginLeft: "2rem" }} key={replyData._id}>
                          <h6 style={{ color: "#523c8d" }}>
                            {userInfo?.role > 0
                              ? userInfo.name
                              : "Response From Admin"}
                          </h6>
                          <p>{replyData.reply}</p>
                        </div>
                      ))}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4 className="mb-3">Write a Customer Review</h4>
                  {errorRoomReview && (
                    <Message variant="danger">{errorRoomReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Great</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" className="mt-3">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/auth"> Sign In</Link> to write a review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default RoomDetails;
