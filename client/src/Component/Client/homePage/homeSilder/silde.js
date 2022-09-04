import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchHomePage } from '../../../redux/actions/homePage';
import useStyles from './style';
import { CircularProgress } from '@mui/material';
import { Typography, Button, Grid, CardMedia, Paper, ButtonBase } from '@material-ui/core';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function Slider() {
  const dispatch = useDispatch();
  const { isLoading, homePageData } = useSelector((state) => state.homePage);
  useEffect(() => {
    dispatch(fetchHomePage());
  }, [dispatch]);
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  // find width of device screen
  const width = window.innerWidth;
  const height = window.innerHeight;
  // find user device
  const [device, setDevice] = React.useState(
    width > height ? 'desktop' : 'mobile'
  );
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        {isLoading ? <Grid container style={{
          padding: '0px',
          margin: '0px',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            backgroundColor: 'rgba(256, 256, 256, 0.1)',
            padding: '10px',
            borderRadius: '20px',
            backgroundImage: `url('/commingsoon.gif')`,
            width: '100%',
            objectFit: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            margin: 'auto',
          }} >
            <div style={window.innerWidth > 450 ? {
              color: 'rgb(0,67,77)',
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              display: "block",
              marginTop: '370px',
              zIndex: '1',
            } : {
              color: 'rgb(0,67,77)',
              fontSize: '20px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              display: "block",
              marginTop: '370px',
              zIndex: '1',
            }}>Please wait, loading...</div></div></Grid> :
          <>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              interval={10000}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {homePageData?.map((step, index) => (
                <div key={step.title} className={classes.design} >
                  {Math.abs(activeStep - index) <= 2 && (
                    (device === 'mobile') ? (<CardMedia
                      style={{
                        backgroundImage: `url('./backimage.png'), url(${step.selectedFile})`,
                      }}
                      className={classes.media}
                      title={step.title} />) : (<CardMedia
                        style={{
                          backgroundImage: `url(${step.selectedFile})`,
                        }}
                        className={classes.media}
                        title={step.title} />
                    )
                  )}
                  <Typography className={classes.title} variant="h5" component="h2">{step.title}</Typography>
                  <Typography className={classes.detail} variant="body2" color="textSecondary" component="p">{step.description}</Typography>
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <div className={classes.whyChoose}>
              <div className={classes.details} style={{ backgroundColor: "#c7e1d9", backgroundBlendMode: 'darken', }}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "12px 16px",
                    margin: "20px auto",
                    cursor: "pointer",
                    borderRadius: "12px",
                    backgroundBlendMode: 'darken',
                    backgroundColor: "rgba(20,38,65, 0.009)",
                  }}
                >
                  <ButtonBase onClick={() => navigate('/food')} id="orderNow">
                    <Paper style={{ width: "300px", margin: 'auto', background: "transparent", borderRadius: "20px" }} elevation={1}>
                      <CardMedia
                        style={{
                          backgroundImage: `url('/food.svg')`,
                        }}
                        className={classes.relatedImage}
                        title='hi'
                      />
                    </Paper>
                  </ButtonBase>
                  <center>
                    <Typography
                      gutterBottom
                      variant="h6"
                      style={{
                        letterSpacing: "1.5px",
                        margin: "10px auto 15px auto",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        color: "rgb(0, 67, 77)",
                      }}
                    >
                      Food Delivery
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      style={{
                        letterSpacing: "2px",
                        margin: "10px 0",
                        color: "black",
                        textTransform: "capitalize",
                      }}
                    >
                      <p>Order foods as you like from our</p>
                      <p>website and get to experiene</p>
                      faster food delivery.
                    </Typography>
                    <Button
                      style={{
                        color: "white",
                        borderRadius: "20px",
                        backgroundColor: "rgb(0, 67, 77)",
                        letterSpacing: "1.1px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        margin: "10px auto 10px auto",
                        padding: "10px 20px",
                      }}
                      onClick={() => navigate('/food')}
                      name="orderNow"
                    >
                      Order Now
                    </Button>
                  </center>
                </Paper>
                <Paper
                  elevation={3}
                  style={{
                    padding: "12px 16px",
                    margin: "20px auto",
                    cursor: "pointer",
                    borderRadius: "12px",
                    backgroundColor: "rgba(20,38,65, 0.009)",
                  }}
                >
                  <ButtonBase onClick={() => navigate('/room')} id="bookNow">
                    <Paper style={{ width: "300px", margin: 'auto', background: "transparent", borderRadius: "20px" }} elevation={1}>
                      <CardMedia
                        style={{
                          backgroundImage: `url('/hotel.gif')`,
                        }}
                        className={classes.relatedImage}
                        title='hi'
                      />
                    </Paper>
                  </ButtonBase>
                  <center>
                    <Typography
                      gutterBottom
                      variant="h6"
                      style={{
                        letterSpacing: "1.5px",
                        margin: "10px auto 15px auto",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        color: "rgb(0, 67, 77)",
                      }}
                    >
                      Comfortable Rooms
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      style={{
                        letterSpacing: "2px",
                        margin: "10px 0",
                        color: "black",
                        textTransform: "capitalize",
                      }}
                    >
                      <p>We have every sized</p>
                      <p>bed rooms with comfy beds</p>
                      and various amenities.
                    </Typography>
                    <Button
                      gutterBottom
                      style={{
                        color: "white",
                        borderRadius: "20px",
                        backgroundColor: "rgb(0, 67, 77)",
                        letterSpacing: "1.1px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        padding: "10px 20px",
                        margin: "10px auto 10px auto",
                      }}
                      onClick={() => navigate('/room')}
                      id='bookNow'
                    >
                      Book Now
                    </Button>
                  </center>
                </Paper>
                <Paper
                  elevation={3}
                  style={{
                    padding: "12px 16px",
                    margin: "20px auto",
                    cursor: "pointer",
                    borderRadius: "12px",
                    backgroundColor: "rgba(20,38,65, 0.009)",
                  }}
                >
                  <ButtonBase onClick={() => navigate('/room')} id="bookNow">
                    <Paper style={{ width: "300px", margin: 'auto', background: "transparent", borderRadius: "20px" }} elevation={1}>
                      <CardMedia
                        style={{
                          backgroundImage: `url('/contact.svg')`,
                        }}
                        className={classes.relatedImage}
                        title='hi'
                      />
                    </Paper>
                  </ButtonBase>
                  <center>
                    <Typography
                      gutterBottom
                      variant="h6"
                      style={{
                        letterSpacing: "1.5px",
                        margin: "10px auto 15px auto",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        color: "rgb(0, 67, 77)",
                      }}
                    >
                      Conatact Us
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      style={{
                        letterSpacing: "2px",
                        margin: "10px 0",
                        color: "black",
                        textTransform: "capitalize",
                      }}
                    >
                      <p>We have 24 servies</p>
                      <p>All the staff are </p>
                      responsive and well behave.
                    </Typography>
                    <Button
                      gutterBottom
                      style={{
                        color: "white",
                        borderRadius: "20px",
                        backgroundColor: "rgb(0, 67, 77)",
                        letterSpacing: "1.1px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        padding: "10px 20px",
                        margin: "10px auto 10px auto",
                      }}
                      onClick={() => navigate('/room')}
                      id='bookNow'
                    >
                      Contact Now
                    </Button>
                  </center>
                </Paper>
              </div>
              <Paper
                elevation={2}
                style={window.innerWidth < 570 ? {
                  display: "flex",
                  flexDirection: "rows",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 12px",
                  margin: "auto",
                  cursor: "pointer",
                  height: "100vh",
                  width: "100%",
                  // rgb(2 126 145)
                  textAlign: "center", backgroundColor: "rgb(28 101 112)",
                  backgroundImage: 'url("https://uploads-ssl.webflow.com/610a3f7bd34716485e27f5b4/61154ed3e99aea39586a91b8_Group%20166.svg")',
                  backgroundPosition: '-60% 20%',
                  backgroundSize: 'auto',
                  backgroundRepeat: 'no-repeat'
                } : {
                  display: "flex",
                  flexDirection: "rows",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 20px",
                  cursor: "pointer",
                  height: "70vh",
                  width: "100%",
                  textAlign: "center",
                  margin: "auto",
                  backgroundColor: "rgb(28 101 112)",
                  backgroundImage: 'url("https://uploads-ssl.webflow.com/610a3f7bd34716485e27f5b4/61154ed3e99aea39586a91b8_Group%20166.svg")',
                  backgroundPosition: '-60% 20%',
                  backgroundSize: 'auto',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <Grid container spacing={1} style={{
                  display: "flex",
                  flexDirection: "rows",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "white",
                        zIndex: "1",
                        textTransform: "capitalize",
                      }}>
                      About Us
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={window.innerWidth < 600 ? {
                        fontSize: "16px",
                        textTransform: "none",
                        color: "white",
                        padding: "5px 5px",
                      } : {
                        padding: "10px 80px",
                        letterSpacing: "2px",
                        margin: "10px 0",
                        fontSize: "16px",
                        color: "white",
                        textTransform: "none",
                        textAlign: "center",
                        lineHeight: "1.5",
                      }}
                    >
                      A world away from the everyday, Rhinospot and kalij farm creates the time and space for you to rediscover the meaning of relaxation.<br />
                      Designed in harmony with the natural environment, the resort seamlessly blends traditional Nepali architecture with contemporary elegance and modern comforts.  <br /> <span style={window.innerWidth < 600 ? { display: "none" } : {}}> Luxuriate in the privacy of the resort’s beachfront and over-water villas that offer an oasis just steps from the sand, or the pleasure of slipping straight from your deck into the cool, clear waters to reach your own private lagoon.</span>
                    </Typography>

                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{
                    margin: "auto",
                  }}>
                    <img src="/aboutUs.svg" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="hi" />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </>
        }
      </Grid>
    </Grid >
  );
}

export default Slider;
