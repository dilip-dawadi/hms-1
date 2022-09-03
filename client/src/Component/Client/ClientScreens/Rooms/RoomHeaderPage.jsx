import React, { useEffect } from "react";
import { CardMedia, Typography } from "@material-ui/core";
import useStyle from "./RoomHeaderPageStyle";
import RoomSecond from "../../../images/roomSecond.jpg";
import SearchBox from "../../../Extra/SearchBox";
import SortBox from "../../../Extra/Sort";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { myBookedRoomList } from "../../../redux/actions/roomBook";
import { LinkContainer } from "react-router-bootstrap";

const RoomHeaderPage = ({ roomData }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const myRooms = useSelector((state) => state.roomMyBookList);
  const { roomBookingItems } = myRooms;

  useEffect(() => {
    dispatch(myBookedRoomList());
  }, [dispatch]);

  return (
    <>
      <div className={classes.design}>
        <CardMedia
          className={classes.media}
          style={{
            backgroundImage: `url(${RoomSecond})`,
          }}
          title="prabandak"
        />
        <Typography className={classes.title} variant="h5" component="h2">
          Prabandak Hotel
        </Typography>
        <Typography className={classes.detail} variant="h5" component="h2">
          Home - Room
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            padding: "20px 20px",
            color: "#595775",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          {roomData.length === 0
            ? "No Rooms Yet"
            : `Showing ${roomData.length} results`}
        </div>
        <LinkContainer
          to="/list/myBooking"
          id="myBooking"
          style={{
            height: "3rem",
            marginTop: "0.7rem",
            background: "#595775",
            color: "white",
          }}
        >
          <Button>
            My Booking {roomBookingItems && "(" + roomBookingItems.length + ")"}
          </Button>
        </LinkContainer>
        <SortBox />
        <SearchBox />
      </div>
    </>
  );
};

export default RoomHeaderPage;
