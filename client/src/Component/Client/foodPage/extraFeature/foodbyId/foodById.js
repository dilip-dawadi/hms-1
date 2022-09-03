import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    Paper,
    Typography,
    CardActions,
    Button,
    CardMedia,
} from "@material-ui/core/";
import { getFoodById, getFoodBySearch } from "../../../../redux/actions/foodPageaction";
import useStyles from "./foodByIdCss";
import moment from "moment";
import Loading from "../../../../redux/actions/loading/loading";
import Comment from './commentFood/commentFood';
import KhaltiPay from "../../../khaltiIntegration/khalti";

const FoodDetail = () => {
    const navigate = useNavigate();
    const openPost = (id) => {
        navigate(`/food/${id}`);
    }; const classes = useStyles();
    const dispatch = useDispatch();
    const { foodPageData, foodByData, isLoading } = useSelector((state) => state.foodPage);
    const { AsingleUser } = useSelector((state) => state.Auth);
    const user = JSON.parse(localStorage.getItem("profile"));
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(getFoodById(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (foodByData?.tags?.length > 0) {
            dispatch(getFoodBySearch({ search: "none", tags: foodByData?.tags?.join(",") }));
        }
    }, [dispatch, foodByData]);

    if (user === null) return navigate("/auth");
    if (isLoading) {
        return (
            <div style={{
                padding: "60px 0px 0px 0px", backgroundImage: 'url(/prabandhak.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%',
            }}>
                <Paper
                    elevation={3}
                    style={{
                        margin: '0px',
                        backgroundColor: 'rgba(255,255,255, 1)',
                        borderRadius: "12px",
                        height: "120vh",
                    }}
                >
                    <Loading />
                </Paper>
            </div>
        );
    }
    const recommented = foodPageData?.filter(({ _id }) => _id !== foodByData?._id);
    return (
        <div style={{
            padding: "60px 0px 0px 0px",
        }}>
            <Paper elevation={3} style={window.innerWidth < 600 ? { margin: '0px auto', backgroundColor: 'rgba(255,255,255, 1)', borderRadius: "0px", padding: "0px 10px" } : {
                borderRadius: "0px", margin: '0px auto', padding: "20px 100px", backgroundColor: 'rgba(255,255,255, 1)',
                backgroundBlendMode: 'darken',
            }}>
                <div className={classes.card} id="foodDetailPage">
                    <div className={classes.section}>
                        <Paper
                            elevation={3}
                            style={{
                                padding: "12px 16px",
                                margin: "2px auto",
                                cursor: "pointer",
                                borderRadius: "20px",
                                backgroundColor: "rgba(20,38,65, 0.005)",
                            }}
                        >
                            <div className={classes.section1} key={foodByData?._id}>
                                <div className={classes.imageSection} style={{ flex: 1 }}>
                                    <img
                                        className={classes.media}
                                        src={foodByData?.selectedFile}
                                        title={foodByData?.title}
                                        alt={foodByData?.title}
                                    />
                                </div>
                                <div style={{ margin: "auto", flex: "1" }}>
                                    <Typography className={classes.title}>
                                        {foodByData?.title}
                                    </Typography>
                                    <Typography className={classes.time}>
                                        {moment(foodByData?.createdAt).format("MMMM, Do YYYY")}
                                    </Typography>
                                    <div className={classes.details}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="h2"
                                            style={{
                                                marginTop: "10px",
                                                letterSpacing: "1px",
                                                color: "lightgray",
                                            }}
                                        >
                                            {foodByData?.tags
                                                .map((tag) => (
                                                    <Button
                                                        style={{
                                                            borderRadius: "0px 30px 30px 0px",
                                                            backgroundColor: "#FF8C00",
                                                            "&:hover": {
                                                                backgroundColor: "#FF8C00",
                                                            },
                                                            letterSpacing: "2px",
                                                            color: "white",
                                                            padding: "5px 10px",
                                                            margin: "0px 5px",
                                                            fontSize: "14px",
                                                            textTransform: "capitalize",
                                                        }}
                                                    >
                                                        {tag}
                                                    </Button>
                                                ))
                                                .splice(-3)}
                                        </Typography>
                                    </div>
                                    <Typography
                                        gutterBottom
                                        variant="body1"
                                        component="p"
                                        style={{
                                            textAlign: "justify",
                                            letterSpacing: "2px",
                                            lineHeight: "2",
                                            color: "black"
                                        }}
                                        className={classes.message}
                                    >
                                        {foodByData?.description}
                                    </Typography>
                                    <CardActions style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "left",
                                    }}>
                                        <Button
                                            size="small"
                                            className={classes.price}
                                        >
                                            Rs.{foodByData?.price}
                                        </Button>
                                        <Button className={classes.buy}
                                        >
                                            <KhaltiPay cart={AsingleUser.cart} address={AsingleUser.address} />
                                        </Button>
                                    </CardActions>
                                </div>
                            </div>
                            <Comment food={foodByData} />
                        </Paper>
                    </div>
                    {!!recommented.length && (
                        <div className={classes.section2}>
                            <Typography gutterBottom variant="h5" style={{
                                fontSize: "22px",
                                fontWeight: "bold",
                                color: "black",
                                textTransform: "capitalize",
                            }}>
                                Similar Food:
                            </Typography>
                            <div className={classes.recommendedPosts}>
                                {recommented
                                    ?.slice(0, 8)
                                    .map(({ title, tags, description, selectedFile, _id }) => (
                                        <Paper
                                            elevation={3}
                                            style={{
                                                padding: "12px 16px",
                                                margin: "20px auto",
                                                cursor: "pointer",
                                                borderRadius: "12px",
                                                backgroundColor: "rgba(20,38,65, 0.005)",
                                            }}
                                            onClick={() => openPost(_id)}
                                            key={_id}
                                        >
                                            <Paper style={{ width: "220px" }} elevation={0}>
                                                <CardMedia
                                                    style={{
                                                        backgroundImage: `url('./backimage.png'), url(${selectedFile})`,
                                                    }}
                                                    className={classes.relatedImage}
                                                    title={title}
                                                />
                                            </Paper>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                style={{
                                                    letterSpacing: "1.5px",
                                                    marginTop: "10px",
                                                    textTransform: "capitalize",
                                                    fontWeight: "600",
                                                    color: "black",
                                                }}
                                            >
                                                {title.split(" ").slice(0, 2).join(" ")}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle2"
                                                style={{
                                                    letterSpacing: "2px",
                                                    margin: "10px 0",
                                                    color: "black",
                                                }}
                                            >
                                                {tags
                                                    .map(tag =>
                                                        <Button
                                                            style={{
                                                                borderRadius: "0px 30px 30px 0px",
                                                                backgroundColor: "#FF8C00",
                                                                "&:hover": {
                                                                    backgroundColor: "#FF8C00",
                                                                },
                                                                letterSpacing: "2px",
                                                                color: "white",
                                                                padding: "3px 8px",
                                                                margin: "0px 5px",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            {tag}
                                                        </Button>
                                                    )
                                                    .splice(-2)}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle2"
                                                style={{
                                                    color: "black",
                                                    letterSpacing: "1.1px",
                                                    fontWeight: "300",
                                                    margin: "10px 0",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {description?.split(" ").splice(0, 4).join(" ")}..
                                            </Typography>
                                        </Paper>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </Paper>
        </div>
    );
};

export default FoodDetail;
