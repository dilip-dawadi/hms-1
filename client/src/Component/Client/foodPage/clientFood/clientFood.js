import React, { useEffect } from "react";
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
import useStyles from "./clientFoodStyle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFoodPage } from "../../../redux/actions/foodPageaction";
import { addCart, singleUser } from "../../../redux/actions/Auth";
import { NotifyError } from "../../../redux/actions/notify";
import FoodHeaderPage from "./FoodHeaderPage";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import moment from "moment";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ClientFoodView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { foodPageData } = useSelector((state) => state.foodPage);
  const [disable, setdisable] = React.useState(false);
  const { AsingleUser } = useSelector(state => state.Auth);
  const user = JSON.parse(localStorage.getItem("profile"));
  const query = useQuery();
  const page = query.get('page');
  const limit = query.get('limit');
  const sort = query.get('sort');
  const tags = query.get('tags');
  const title = query.get('title')
  const foodquery = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 4,
    sort: sort ? sort : "-createdAt",
    tags: tags ? tags : "none",
    title: title || "none",
  };
  useEffect(() => {
    dispatch(fetchFoodPage(foodquery));
    if (user) {
      dispatch(singleUser(user?.result._id));
    }
  }, [dispatch]);

  const classes = useStyles();
  return (
    <>
      <FoodHeaderPage foodLength={foodPageData?.length} />
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={2}
      >
        {foodPageData.slice(0, 4).map((foodData) =>
        (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card} raised elevation={3}>
              <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={() => {
                  navigate(`/food/${foodData._id}`)
                }}
                id='foodDetailBtn'
              >
                <CardMedia
                  className={classes.media}
                  style={{ backgroundImage: `url(${foodData.selectedFile})` }}
                  title={foodData.title.split(" ").splice(0, 1)}

                />
              </ButtonBase>
              <div style={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {foodData.title.split(" ").splice(0, 2).join(" ")}
                </Typography>
                <VolumeUpIcon style={{
                  color: 'rgb(0, 67, 77)',
                  paddingTop: '4px',
                  cursor: 'pointer',
                }}
                  onClick={() => {
                    let utterance = new SpeechSynthesisUtterance(`The item ${foodData.title} is available in ${foodData.quantity} units for a cost of ${foodData.price} rupees. Selling was started from ${moment(foodData?.createdAt).format("MMMM DD")}.`);
                    utterance.lang = 'en-US';
                    utterance.rate = 0.8;
                    window.speechSynthesis.speak(utterance);
                  }}
                />
              </div>
              <CardContent className={classes.cartTitle}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {foodData.description.split(" ").splice(0, 11).join(" ")}
                  ...
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
                      {foodData.quantity}
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
                      Rs.{foodData.price}/
                    </span>
                  </Typography>
                </div>
              </CardContent>
              <div className={classes.details}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h2"
                >
                  {foodData.tags
                    .map((tag) => (
                      <Button
                        style={{
                          backgroundColor: "rgba(0, 67, 77, 0.9)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 67, 77, 0.9)",
                          },

                          borderRadius: "6px",
                          color: "white",
                          padding: "3px 10px",
                          margin: "2px 5px",
                          fontSize: "13px",
                        }}
                      >
                        {tag}
                      </Button>
                    ))
                    .splice(-2)}
                </Typography>
              </div>
              <CardActions className={classes.cardActionsI} id="foodAddToCart">
                <Button size="small" className={classes.btn} type="button" onClick={
                  async () => {
                    if (user) {
                      if (user?.token?.length < 500) {
                        const check = AsingleUser.cart.every(item => {
                          return item._id !== foodData._id
                        })
                        const cart = AsingleUser.cart;
                        if (check) {
                          setdisable(true);
                          setTimeout(() => {
                            setdisable(false);
                          }, 4000);
                          await dispatch(addCart(cart, foodData));
                          await dispatch(singleUser(user?.result?._id));
                        } else {
                          NotifyError("Item Already Added");
                        }
                      } else {
                        NotifyError(" Cart Cannot Added With Google Account");
                      }
                    } else {
                      NotifyError("Please Login To Add Item To Cart");
                    }

                  }} disabled={disable} >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ClientFoodView;
