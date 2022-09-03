import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchHomePage, deleteHome } from '../../../redux/actions/homePage';
import useStyles from './style';
import { Typography, Grid, CardMedia, Button } from '@material-ui/core';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function Slider({ setupdateHomeCurrentId }) {
    const dispatch = useDispatch();
    const { isLoading, homePageData } = useSelector((state) => state.homePage);
    useEffect(() => {
        dispatch(fetchHomePage());
    }, [dispatch]);
    const theme = useTheme();
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
    const maxSteps = homePageData?.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
                {isLoading ? <Grid container style={{
                    padding: '0px',
                    margin: '0px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', height: '100vh' }}>
                        <div style={{
                            color: 'white',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            letterSpacing: '3px',
                        }}>Loading</div>
                    </div>
                </Grid> :
                    <>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            interval={10000}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {homePageData?.map((step, index) => (
                                <div key={step._id} className={classes.design} >
                                    <Typography
                                        style={
                                            {
                                                fontSize: '1.4rem',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                marginTop: '0.9rem',
                                                marginBottom: '1rem',
                                                textTransform: 'Capitalize',
                                                color: '#424242',
                                            }
                                        }
                                    >Previously Added Slider Images</Typography>
                                    {Math.abs(activeStep - index) <= 2 ? (
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
                                    ) : null}
                                    <Typography className={classes.title} variant="h5" component="h2">{step.title}</Typography>
                                    <Typography className={classes.detail} variant="body2" component="p">{step.detail}</Typography>
                                    <Button
                                        size="small"
                                        style={{ backgroundColor: "#01bf71" }}
                                        className={classes.btnFunction1}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setupdateHomeCurrentId(step._id)
                                        }}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        size="small"
                                        style={{ backgroundColor: "#ff4d4d" }}
                                        onClick={() => dispatch(deleteHome(step._id))}
                                        className={classes.btnFunction2}
                                    >
                                        <Delete />
                                    </Button>
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={maxSteps}
                            variant="text"
                            position="static"
                            activeStep={activeStep}
                            style={{
                                width: '95%',
                                margin: 'auto',
                            }}
                            nextButton={
                                <Button
                                    size="small"
                                    style={activeStep === maxSteps - 1 ? {
                                        backgroundColor: "gray",
                                        color: "white",
                                        borderRadius: "20px",
                                        marginRight: "20px",
                                        padding: "5px 7px 5px 14px",
                                    } : {
                                        backgroundColor: "rgb(0, 67, 77)",
                                        color: "white",
                                        borderRadius: "20px",
                                        marginRight: "20px",
                                        padding: "5px 7px 5px 14px",
                                    }}
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" style={activeStep === 0 ? {
                                    backgroundColor: "gray",
                                    color: "white",
                                    borderRadius: "20px",
                                    marginLeft: "20px",
                                    padding: "5px 14px 5px 7px",
                                } : {
                                    backgroundColor: "rgb(0, 67, 77)",
                                    color: "white",
                                    borderRadius: "20px",
                                    marginLeft: "20px",
                                    padding: "5px 14px 5px 7px",
                                }} onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </>
                }
            </Grid>
        </Grid >
    );
}

export default Slider;
