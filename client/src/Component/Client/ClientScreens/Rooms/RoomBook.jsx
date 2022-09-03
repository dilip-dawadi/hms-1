import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../../../Admin/AdminScreens/Rooms/FormContainer";
import { bookRoom } from "../../../redux/actions/roomBook";
import Message from "../../../Message/Message";
import { ROOM_BOOK_RESET } from "../../../redux/constants/actionTypes";
import { detailRoom } from "../../../redux/actions/room";

const RoomBook = () => {
  const params = useParams();
  const roomId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const roomBook = useSelector((state) => state.roomBook);
  const { success: successBook, error: errorBook } = roomBook;

  const roomDetails = useSelector((state) => state.roomDetails);
  const { room, loading: lodingroomDetails } = roomDetails;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phnumber: "",
    noofguests: 1,
    bookingDate: "",
    noofdays: 1,
  });

  const { name, email, phnumber, noofguests, bookingDate, noofdays } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(detailRoom(roomId));
  }, [dispatch, roomId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(bookRoom(formData, roomId));
  };

  useEffect(() => {
    setTimeout(() => {
      if (successBook) {
        dispatch({ type: ROOM_BOOK_RESET });
        navigate("/room");
      }
    }, 4000);

    if (!user) {
      navigate("/auth");
    }
  }, [dispatch, navigate, roomId, successBook, user]);

  return (
    !lodingroomDetails && (
      <>
        <div
          style={{
            paddingTop: "6rem",
            paddingBottom: "2rem",
            minHeight: "41rem",
          }}
        >
          {successBook && <Message variant="primary">Room Booked</Message>}
          {errorBook && <Message variant="danger">{errorBook}</Message>}
          <FormContainer>
            <h1 className="py-3 text-center">Customer Detail</h1>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6} className="my-3">
                  <Form.Group controlId="name" className="py-3">
                    <Form.Label className="text-black">Name</Form.Label>
                    <Form.Control
                      id="bookName"
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => onChange(e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="phnumber" className="py-3">
                    <Form.Label className="text-black">Phone Number</Form.Label>
                    <Form.Control
                      id="bookPhone"
                      type=""
                      name="phnumber"
                      placeholder="Enter number"
                      value={phnumber}
                      onChange={(e) => onChange(e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="bookingDate" className="py-3">
                    <Form.Label className="text-black">Booking Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="bookingDate"
                      value={bookingDate}
                      onChange={(e) => onChange(e)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} className="py-3">
                  <Form.Group controlId="email" className="py-3">
                    <Form.Label className="text-black">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      id="bookEmail"
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="guests"
                    className="py-3"
                    id="bookguests"
                  >
                    <Form.Label className="text-black">
                      No. of Guests{" "}
                      <small style={{ fontSize: "0.65rem" }}>
                        (Based on room capacity)
                      </small>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="noofguests"
                      value={noofguests}
                      onChange={(e) => onChange(e)}
                    >
                      {[...Array(room.capacity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="noofdays" className="py-3">
                    <Form.Label className="text-black">No of Days</Form.Label>
                    <Form.Control
                      as="select"
                      name="noofdays"
                      value={noofdays}
                      onChange={(e) => onChange(e)}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <div className="btn-booking">
                <Button
                  size="small"
                  type="submit"
                  id="bookRoomBtn"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    background: "rgb(0, 67, 77)",
                    padding: "0.8rem 3rem",
                  }}
                >
                  Book
                </Button>
              </div>
            </Form>
          </FormContainer>
        </div>
      </>
    )
  );
};

export default RoomBook;
