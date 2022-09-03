import React from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteRoom } from "../../../redux/actions/room";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const RoomDetail = ({ rooms, setCurrentId }) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteRoom(rooms._id));
  };
  return (
    <>
      <div
        className="room-details my-4"
        style={{
          display: "flex",
          width: "59rem",
          margin: "auto",
          height: "auto",
          border: "1px solid #BFBFBF",
          boxShadow: "10px 10px 5px #aaaaaa",
        }}
      >
        {/* <CardMedia
          style={{
            backgroundImage: `url(${rooms.image})`,
            width: "40%",
          }}
          alt="room-image"
        /> */}
        <Link
          to={`/${rooms._id}/details/room`}
          style={{ display: "flex", textDecoration: "none" }}
        >
          <Image
            src={rooms.image}
            style={{ width: "38%", height: "auto", marginRight: "2rem" }}
          />
          <div
            className="room-details-full mt-3"
            style={{ minWidth: "30rem", cursor: "pointer" }}
          >
            <p
              className="room-title"
              style={{ fontSize: "1.3rem", fontWeight: "bold" }}
            >
              {rooms.title}
            </p>
            <p className="text-black">{rooms.details}</p>
            <p className="room-title-beds text-black">
              Available {rooms.noofbeds}bed {rooms.capacity}person
            </p>
            <p className="room-title-category text-black">
              <span style={{ fontWeight: "bold" }}>{rooms.standard}</span> Rs.
              {rooms.price}/ per night
            </p>
          </div>
        </Link>
        <div
          className="room-details-change text-black mt-1"
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "1rem",
          }}
        >
          <Button
            variant="success"
            className="py-2 m-2"
            onClick={e => {
              e.stopPropagation();
              setCurrentId(rooms?._id);
            }}
          >
            <i className="fas fa-edit fa-anup"></i>
          </Button>
          {/* </LinkContainer> */}

          <Button variant="danger" className="py-2 m-2" onClick={deleteHandler}>
            <i className="fas fa-trash fa-anup"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

RoomDetail.propTypes = {
  rooms: PropTypes.object.isRequired,
};

export default RoomDetail;
