import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import useStyles from "./ClientRoomStyle";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import RoomHeaderPage from "./RoomHeaderPage";
import Message from "../../../Message/Message";

const ClientRoomView = () => {
  const roomList = useSelector((state) => state.roomList);
  const { rooms } = roomList;

  const roomBook = useSelector((state) => state.roomBook);
  const { success: successBook } = roomBook;

  const classes = useStyles();

  return (
    <>
      <RoomHeaderPage roomData={rooms} />
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={2}
      >
        {rooms.map((roomData) => (
          <Grid key={roomData._id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              className={classes.cards}
              raised
              elevation={3}
              style={{ height: "100%" }}
            >
              <LinkContainer to={`/${roomData._id}/details/room`}>
                <ButtonBase
                  id="roomDetailBtn"
                  component="span"
                  name="test"
                  className={classes.cardAction}
                >
                  <CardMedia
                    className={classes.media}
                    style={{ backgroundImage: `url(${roomData.image})` }}
                    title={roomData.title}
                  />
                  <Typography
                    className={classes.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {roomData.title}
                  </Typography>
                  <CardContent className={classes.cartTitle}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {roomData.details}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "12px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{}}
                      >
                        Available:{" "}
                        <span
                          style={{
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          {roomData.capacity}
                        </span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{}}
                      >
                        Price:{" "}
                        <span
                          style={{
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          Rs.{roomData.price}
                        </span>
                      </Typography>
                    </div>
                  </CardContent>
                </ButtonBase>
              </LinkContainer>

              <CardActions className={classes.cardActionsI} style={{}}>
                <LinkContainer
                  id="bookNowBtn"
                  to={`/${roomData._id}/book/room`}
                >
                  <Button size="small" className={classes.btn} type="button">
                    Book now
                  </Button>
                </LinkContainer>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ClientRoomView;
