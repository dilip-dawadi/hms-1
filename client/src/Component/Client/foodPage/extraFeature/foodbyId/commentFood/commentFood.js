import React, { useState, useRef } from "react";
import { Typography, Button, Avatar, Paper } from "@material-ui/core/";
import { Delete, Edit, FavoriteBorder, Report, Send } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { commentFood, deleteCommentFood } from "../../../../../redux/actions/foodPageaction";
import { NotifyError, NotifyWarning, NotifyInfo } from "../../../../../redux/actions/notify";
import { reportByUser } from "../../../../../redux/actions/Auth";
import useStyles from "../foodByIdCss";
import StyleTextField from "../../../../../Extra/styleTextField"

const CommentSection = ({ food }) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const classes = useStyles();
    const commentsRef = useRef();
    const [updated, setUpdated] = useState(false);
    const { AsingleUser } = useSelector(state => state.Auth);
    const [commentData, setCommentData] = useState({
        comments: "",
        userId: AsingleUser?._id,
        foodId: food?._id,
        foodImage: food?.selectedFile,
        userImage: AsingleUser?.selectedFile,
        createdAt: new Date(),
    });
    const { foodPageData } = useSelector((state) => state.foodPage);
    const findCommentById = foodPageData?.find((comment) => comment._id === food?._id);

    let reversefindCommentById = [];
    let index = 0;
    for (let i = findCommentById?.comments?.length - 1; i >= 0; i--) {
        reversefindCommentById[index] = findCommentById?.comments[i];
        index++;
    }
    const handleComment = async () => {
        await dispatch(
            commentFood(food._id, { ...commentData, comments: `${AsingleUser?.name}: ${comment}` }, updated)
        );
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
        setComment("");
    };
    const updatedText = () => {
        const userId = AsingleUser?._id;
        const commentByUserId = findCommentById?.comments.filter((comment) => comment.userId === userId)[0];
        setComment(commentByUserId.comments.split(":")[1])
    }
    const deleteComment = async () => {
        await dispatch(deleteCommentFood(food._id, AsingleUser?._id));
    }
    const fakeUser = AsingleUser?.report.length >= 2 ? true : false;
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [report, setReport] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [whatWasComment, setWhatWasComment] = useState("");
    const handleReport = (userId, toWhom) => {
        !fakeUser && NotifyInfo(`Please write the reason for reporting ${toWhom.split(": ")[0].toLowerCase()}`);
        setUserId(userId);
        setUserName(toWhom.split(": ")[0].toLowerCase());
        setWhatWasComment(toWhom.split(": ")[1].toLowerCase());
    }
    const SecondhandleReport = async () => {
        if (reportReason === "") return NotifyWarning("Please enter a reason");
        const reportData = {
            reporterUserId: AsingleUser?._id,
            productId: food._id,
            reason: reportReason,
            whatWasComment: whatWasComment,
            date: new Date()
        }
        await dispatch(reportByUser(userId, reportData));
        setReport(false);
        setReportReason("");
    }
    return (
        <div>
            <Paper
                elevation={1}
                style={{
                    padding: "12px 16px",
                    margin: "12px auto 0 auto",
                    cursor: "pointer",
                    borderRadius: "20px",
                    backgroundColor: "rgba(20,38,65, 0.005)",
                }}
            >
                <Typography variant="h6" style={{ margin: '20px auto 20px auto', fontWeight: "bold", letterSpacing: '1px', fontSize: '1.2rem' }}>
                    Total Comments ({findCommentById?.comments?.length})
                </Typography>
                <div style={{}}>
                    <Paper
                        elevation={3}
                        style={{
                            width: "95%", display: 'flex',
                            padding: "12px 0px 12px 10px",
                            margin: "12px auto 0 auto",
                            cursor: "pointer",
                            borderRadius: "20px",
                            backgroundColor: "rgba(20,38,65, 0.005)",
                        }}
                    >
                        <Avatar src={AsingleUser?.selectedFile} style={{ width: '40px', height: '40px', margin: '0.4rem 1rem 0rem 0rem' }} />
                        {report ?
                            <StyleTextField
                                fullWidth
                                size={window.innerWidth < 600 ? "small" : "medium"}
                                style={window.innerWidth < 600 ? { width: '80%', margin: "auto" } : { width: '80%', margin: "auto" }}
                                multiline
                                variant="outlined"
                                autoFocus={true}
                                inputProps={{ maxLength: 100, style: { fontSize: "1rem", color: 'black' } }}
                                label={fakeUser ? "You're not allowed to comment" : `Reason for Reporting ${userName}`}
                                InputLabelProps={fakeUser ? { style: { fontSize: "1rem", color: '#f50057' } } : { style: { fontSize: "1rem", color: 'black' } }}
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                            />
                            :
                            <StyleTextField
                                fullWidth
                                size={window.innerWidth < 600 ? "small" : "medium"}
                                style={window.innerWidth < 600 ? { width: '80%', margin: "auto" } : { width: '80%', margin: "auto" }}
                                multiline
                                variant="outlined"
                                inputProps={{ maxLength: 100, style: { fontSize: "1.1rem", color: 'black' } }}
                                label={fakeUser ? "You're not allowed to comment" : "Write a comment"}
                                InputLabelProps={fakeUser ? { style: { fontSize: "1rem", color: 'red' } } : { style: { fontSize: "1rem", color: 'black' } }}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />}
                        <Button
                            style={{
                                margin: "auto 10px",
                                borderRadius: "20px",
                                padding: "0.5rem 1.5rem",
                                color: "#fff",
                                height: "100%",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                letterSpacing: "1px",
                                fontWeight: "bold",
                                backgroundColor: "rgb(0, 67, 77)"
                            }}
                            variant="contained"
                            onClick={() => {
                                fakeUser ? NotifyError("Banned because you're affecting other user") :
                                    report ? SecondhandleReport() : handleComment()
                            }}
                            endIcon={report ? <Report /> : <Send />}
                        >
                            {window.innerWidth > 600 ? !report ? "Comment" : "report" : ""}
                        </Button>
                    </Paper>
                </div>
                <div ref={commentsRef} />
                <div className={classes.commentsInnerContainer}>
                    {reversefindCommentById.map((c, i) => (
                        <Paper elevation={3} style={{
                            backgroundColor: "white",
                            color: "#fff",
                            width: "100%",
                            padding: "0.5rem 1rem",
                            borderRadius: "20px",
                            fontSize: "1rem",
                            letterSpacing: "1px",
                            fontWeight: "bold",
                            display: "flex",
                            margin: "0rem auto 1rem auto",
                        }} key={i} >
                            <Avatar src={c?.userImage} style={{ width: '40px', height: '40px', margin: '0.2rem 1rem 0rem 0rem' }} />
                            <Typography key={i} gutterBottom variant="subtitle1" style={{ color: 'black', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', textTransform: "none", letterSpacing: '2px' }}>
                                <strong style={{
                                    letterSpacing: '0px',
                                }}>{c?.comments.split(": ")[0]}</strong>

                                {window.innerWidth > 600 ? `${c?.comments.split(":")[1].slice(0, 100)}` : `${c?.comments.split(":")[1].slice(0, 28)}`}
                            </Typography>
                            <div style={window.innerWidth < 600 ? { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' } : {
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            }}>
                                {(c?.userId === AsingleUser?._id) ? (
                                    <>
                                        <Button variant="contained" style={{
                                            color: '#fff',
                                            backgroundColor: "#f52f2f",
                                            borderRadius: '20px',
                                            padding: '0.4rem 0.9rem',
                                            margin: 'auto 0.5rem auto 0.5rem',
                                            minWidth: '40px',
                                            maxWidth: '50px',
                                            minHeight: '40px',
                                            maxHeight: '50px',
                                        }}
                                            onClick={() => {
                                                deleteComment()
                                            }}
                                        ><Delete /></Button>
                                        {!fakeUser && <Button variant="contained" style={{
                                            color: '#fff',
                                            marginRight: '10px',
                                            backgroundColor: "rgb(0, 67, 77)",
                                            borderRadius: '20px',
                                            padding: '0.4rem 0.9rem',
                                            margin: 'auto 0.5rem auto 0.5rem',
                                            minWidth: '40px',
                                            maxWidth: '50px',
                                            minHeight: '40px',
                                            maxHeight: '50px',
                                        }} onClick={() => { setUpdated(true); updatedText() }}
                                        ><Edit /></Button>}
                                    </>
                                ) : <>
                                    <Button variant="contained" style={{
                                        color: '#fff',
                                        marginRight: '10px',
                                        backgroundColor: "rgb(0, 67, 77)",
                                        borderRadius: '20px',
                                        padding: '0.4rem 0.9rem',
                                        margin: 'auto 0.5rem auto 0.5rem',
                                        minWidth: '40px',
                                        maxWidth: '50px',
                                        minHeight: '40px',
                                        maxHeight: '50px',
                                    }}>
                                        <FavoriteBorder /></Button>
                                    <Button variant="contained" style={{
                                        color: '#fff',
                                        backgroundColor: "#f52f2f",
                                        borderRadius: '20px',
                                        padding: '0.4rem 0.9rem',
                                        margin: 'auto 0.5rem auto 0.5rem',
                                        minWidth: '40px',
                                        maxWidth: '50px',
                                        minHeight: '40px',
                                        maxHeight: '50px',
                                    }}
                                        onClick={() => {
                                            fakeUser ? NotifyWarning("Banned because you're affecting other user") : setReport(true); handleReport(c?.userId, c?.comments)
                                        }}
                                    > <Report /></Button></>}
                            </div>
                        </Paper>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default CommentSection;
