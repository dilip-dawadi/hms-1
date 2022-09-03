import React, { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import RoomDetail from "./RoomDetails";
import { createRoom, listRooms, updateRoom } from "../../../redux/actions/room";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { TextField, Typography, Paper } from "@material-ui/core";
import Message from "../../../Message/Message";
import ClientRoomScreen from "../../../Client/ClientScreens/Rooms/ClientRoomScreen";
import SearchBox from "../../../Extra/SearchBox";
import { bookRoomList } from "../../../redux/actions/roomBook";

const AdminRoomScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    standard: "",
    price: 0,
    capacity: 0,
    condition: "",
    noofbeds: 0,
  });
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState({
    image: "",
  });
  const [imageUrl, setimageUrl] = useState();

  const roomCreate = useSelector((state) => state.roomCreate);
  const { success: successCreate, error: errorCreate } = roomCreate;

  const roomList = useSelector((state) => state.roomList);
  const { success, rooms } = roomList;

  const roomUpdate = useSelector((state) => state.roomUpdate);
  const { success: successUpdate } = roomUpdate;

  const roomBookList = useSelector((state) => state.roomBookList);
  const { roomBookingItems } = roomBookList;

  const roomDelete = useSelector((state) => state.roomDelete);
  const { success: successDelete } = roomDelete;

  const updateFormData = rooms.filter((room) => room._id === currentId)[0];

  useEffect(() => {
    if (updateFormData) {
      setFormData(updateFormData);
      setimageUrl(updateFormData.image);
    }
  }, [updateFormData]);

  const { title, details, standard, price, capacity, condition, noofbeds } =
    formData;

  const dispatch = useDispatch();

  const upload = () => {
    if (!imageData.image) return;
    const storageRef = ref(storage, `files/${imageData.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageData.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused": // or 'paused'
            setProgress("Upload is paused");
            break;
          case "running": // or 'running'
            setProgress("Upload is " + progress + "% done");
            break;
          default:
            break;
        }
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    // if (successCreate) {
    //   dispatch(listRooms());
    //   // navigate("/room");
    // }
    dispatch(listRooms(keyword));
    dispatch(bookRoomList());
  }, [dispatch, successCreate, successUpdate, keyword, successDelete]);

  const userRole = JSON.parse(localStorage.getItem("profile"));
  if (!userRole?.result?.role) {
    return <ClientRoomScreen />;
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateRoom(currentId, { ...formData, image: imageUrl }));
    } else {
      dispatch(createRoom({ ...formData, image: imageUrl }));
    }
  };

  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user?.result?.role) {
    return <ClientRoomScreen />;
  }

  const linkContainer = () => {
    navigate("/list/book/room");
  };

  return (
    <>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <div
        style={{
          backgroundImage: "url(/prabandhak.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <FormContainer>
          {/* <Paper
            elevation={3}
            style={{
              padding: "0px 20px 0px 20px",
            }}
          > */}
          <h1
            className="py-3 text-center"
            style={{ marginTop: "5rem", color: "black" }}
          >
            Room Details
          </h1>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="title" className="py-3">
                  <Form.Label className="text-black">Title</Form.Label>
                  <Form.Control
                    type="name"
                    name="title"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="detail" className="py-3">
                  <Form.Label className="text-black">Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="details"
                    placeholder="Enter Details"
                    value={details}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
                {progress ? (
                  <Typography variant="body1">{progress}</Typography>
                ) : (
                  <div style={{ textAlign: "center" }} className="py-2">
                    <TextField
                      type="file"
                      name="image"
                      onChange={(e) =>
                        setImageData({
                          ...imageData,
                          image: e.target.files[0],
                        })
                      }
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={upload}
                      style={{
                        background: "gray",
                        color: "black",
                      }}
                      className="my-2"
                    >
                      Upload
                    </Button>
                  </div>
                )}
                <Form.Group controlId="standard" className="py-3">
                  <Form.Label className="text-black">Standard</Form.Label>
                  <Form.Control
                    type="text"
                    name="standard"
                    placeholder="Enter standard"
                    value={standard}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="price" className="py-3">
                  <Form.Label className="text-black">Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="capacity" className="py-3">
                  <Form.Label className="text-black">Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    placeholder="Enter capacity"
                    value={capacity}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="condition" className="py-3">
                  <Form.Label className="text-black">Condition</Form.Label>
                  <Form.Control
                    type="text"
                    name="condition"
                    placeholder="Enter condition"
                    value={condition}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="noofbeds" className="py-3">
                  <Form.Label className="text-black">No of Beds</Form.Label>
                  <Form.Control
                    type="number"
                    name="noofbeds"
                    placeholder="Enter no of beds"
                    value={noofbeds}
                    onChange={(e) => onChange(e)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div>
              <Button
                type="submit"
                variant="primary"
                style={{
                  margin: "1rem auto",
                  display: "block",
                  background: "rgb(0, 67, 77)",
                }}
                className="mb-3"
              >
                Submit
              </Button>
            </div>
          </Form>
          {/* </Paper> */}
        </FormContainer>
      </div>

      <Container>
        <div
          className="room-grid mt-3"
          style={{ width: "60rem", margin: "auto", minHeight: "38rem" }}
        >
          <div
            className="room-flex-top"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1 className="mt-3">Rooms</h1>
            <SearchBox />
            {/* <LinkContainer to=""> */}
            <Button variant="info" onClick={linkContainer}>
              Booked Rooms ({roomBookingItems.length})
            </Button>
            {/* </LinkContainer> */}
          </div>
          {success && rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomDetail
                rooms={room}
                key={room._id}
                setCurrentId={setCurrentId}
              />
            ))
          ) : (
            <h1>No Rooms Yet</h1>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminRoomScreen;
