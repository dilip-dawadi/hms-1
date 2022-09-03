import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  approveBookedRoom,
  bookRoomList,
  deleteBookedRoom,
} from "../../../redux/actions/roomBook";
import Moment from "react-moment";
import moment from "moment";

const RoomBookedList = () => {
  const dispatch = useDispatch();

  const roomBookList = useSelector(state => state.roomBookList);
  const { roomBookingItems, loading: loadingBookingItems } = roomBookList;

  const roomBookDelete = useSelector(state => state.roomBookDelete);
  const { success: successDelete } = roomBookDelete;

  const roomBookApprove = useSelector(state => state.roomBookApprove);
  const { success: successApprove } = roomBookApprove;

  useEffect(() => {
    dispatch(bookRoomList());
  }, [dispatch, successApprove, successDelete]);
  return (
    !loadingBookingItems && (
      <div style={{ height: "100vh" }}>
        <Container>
          <div
            className="booked-room-list text-center"
            style={{ marginTop: "6rem" }}
          >
            <h1>Booked Room List</h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-black">Name</th>
                  <th className="text-black">Room Name</th>
                  <th className="text-black">No of Guests</th>
                  <th className="text-black">No of Days</th>
                  <th className="text-black">Check-In Date</th>
                  <th className="text-black">Check-Out Date</th>
                  <th className="text-black">Status</th>
                  <th></th>
                </tr>
              </thead>
              {roomBookingItems.map(item => (
                <tbody key={item._id}>
                  <tr>
                    <td className="text-black">{item.name}</td>
                    <td className="text-black">{item?.room?.title}</td>
                    <td className="text-black">{item.noofguests}</td>
                    <td className="text-black">{item.noofdays}</td>
                    <td>
                      <Moment format="YYYY/MM/DD" className="text-black">
                        {item.bookingDate}
                      </Moment>
                    </td>
                    <td>
                      <Moment format="YYYY/MM/DD" className="text-black">
                        {moment(item.bookingDate).add(item.noofdays, "days")}
                      </Moment>
                    </td>
                    <td className="text-black">
                      {!item.isApproved ? (
                        <Button
                          variant="warning"
                          onClick={() => dispatch(approveBookedRoom(item._id))}
                        >
                          Pending
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => dispatch(approveBookedRoom(item._id))}
                        >
                          Approved
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteBookedRoom(item._id))}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
        </Container>
      </div>
    )
  );
};

export default RoomBookedList;
