import React, { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../Extra/Rating";
import { bookRoomDetails } from "../../../redux/actions/roomBook";

const RoomBookedDetails = () => {
  const params = useParams();
  const roomId = params.id;
  const dispatch = useDispatch();

  const roomBookDetails = useSelector(state => state.roomBookDetails);
  const { roomBookingData: roomData, loading: loadingDetails } =
    roomBookDetails;

  useEffect(() => {
    dispatch(bookRoomDetails(roomId));
  }, [dispatch, roomId]);

  return (
    !loadingDetails && (
      <div style={{ paddingTop: "6rem" }}>
        <Container>
          <Row className="my-3">
            <Col md={6}>
              <Image
                src={roomData.room.image}
                style={{ height: "28rem", width: "33.5rem" }}
              />
            </Col>
            <Col md={6}>
              <h3>{roomData.room.title}</h3>
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
                      value={roomData.room.rating ? roomData.room.rating : 0}
                      text={`${roomData.room.rating} out of 5`}
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
                      {roomData.room.numReviews} customer{" "}
                      {roomData.room.numReviews <= 1 ? "rating" : "ratings"}
                    </small>
                  </div>
                </div>

                <div
                  className="vl"
                  style={{
                    border: "1px solid black",
                    height: "1.5rem",
                    marginTop: "9px",
                    marginRight: "1rem",
                  }}
                ></div>

                <p
                  style={{
                    color: "black",
                    marginTop: "7px",
                    marginRight: "10px",
                  }}
                >
                  Booked{" "}
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
                <div
                  className="vl"
                  style={{
                    border: "1px solid black",
                    height: "1.5rem",
                    marginTop: "9px",
                    marginRight: "1rem",
                  }}
                ></div>
                <p
                  style={{
                    color: "black",
                    marginTop: "7px",
                  }}
                >
                  {roomData.isPaid ? (
                    <>
                      Paid{" "}
                      <i
                        className="fa fa-check"
                        aria-hidden="true"
                        style={{
                          marginLeft: "5px",
                          fontSize: "1.2rem",
                          color: "green",
                        }}
                      ></i>
                    </>
                  ) : (
                    <>
                      Not Paid{" "}
                      <i
                        className="fa fa-close"
                        aria-hidden="true"
                        style={{
                          marginLeft: "5px",
                          fontSize: "1.2rem",
                          color: "red",
                        }}
                      ></i>
                    </>
                  )}
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
                      It include {roomData.room.noofbeds} Queen sized bed,
                      private kitchen, bathroom and some living spaces.
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
                  Rs. {roomData.room.price} / Night
                </h3>

                {roomData.isApproved ? (
                  <Button
                    style={{
                      fontSize: "1rem",
                      outline: "auto",
                      outlineStyle: "round",
                      backgroundColor: "green",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="fas fa-check"
                      style={{
                        fontSize: "1.2rem",
                        marginRight: "0.6rem",
                        marginTop: "2px",
                      }}
                    ></i>
                    Approved
                  </Button>
                ) : (
                  <Button
                    style={{
                      fontSize: "1rem",
                      outline: "auto",
                      outlineStyle: "round",
                      backgroundColor: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="fas fa-ban"
                      style={{
                        fontSize: "1.2rem",
                        marginRight: "0.6rem",
                        marginTop: "2px",
                      }}
                    ></i>
                    Pending
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default RoomBookedDetails;
