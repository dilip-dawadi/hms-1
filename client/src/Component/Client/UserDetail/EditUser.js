import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux';
import { updateSingleUser } from '../../redux/actions/Auth';
import { Button, Typography } from '@material-ui/core';
import StyleTextField from '../../Extra/styleTextField';
import { storage } from '../../Admin/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        maxWidth: "400px",
        margin: "auto",
        maxHeight: "600px",
        "@media (max-width: 420px)": {
            maxWidth: "250px",
            maxHeight: "250px",
        }
    },
    btn: {
        backgroundColor: '#4abdac',
        padding: '8px 15px',
        marginTop: '10px',
        border: '0px solid white',
        borderRadius: '12px',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            background: "#008f95",
            color: 'white',
        },
    },
    paper: {
        backgroundColor: 'rgb(20, 44, 75)',
        borderRadius: "20px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 4),
        margin: "65px auto 0px auto",
    },
    textStyle: {
        margin: '14px auto 7px auto',
    }
}));
const initialState = { fullName: '', email: '', address: '', number: '' };

export default function ModalMessage({ openM, setOpenM, aUser }) {
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [image, setimage] = useState({ selectedFile: '' });
    const [imageUrl, setimageUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [wait, setWait] = useState(false);
    useEffect(() => {
        setFormData(
            {
                ...formData,
                fullName: aUser?.name,
                email: aUser?.email,
                address: aUser?.address,
                number: aUser?.number,
            });
        setimageUrl(aUser?.selectedFile);
    }, [aUser]);
    const upload = () => {
        if (!image.selectedFile) return;
        const sotrageRef = ref(storage, `images/${image.selectedFile.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, image.selectedFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress("Upload is " + progress + "% done");
                // eslint-disable-next-line default-case
                switch (snapshot.state) {
                    case "paused": // or 'paused'
                        setProgress("Upload is paused");
                        break;
                    case "running": // or 'running'
                        setProgress("Upload is " + progress + "% done");
                        break;
                }
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setimageUrl(downloadURL);
                });
            });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setWait(true);
        setTimeout(() => {
            setWait(false);
        }, 3000);
        if (imageUrl === null) {
            setimageUrl(aUser?.selectedFile);
        };
        dispatch(updateSingleUser(aUser._id, {
            ...formData, selectedFile: imageUrl, firstName: formData.fullName?.split(' ')[0],
            lastName: formData.fullName?.split(' ')[1],
        }));
    };
    const handleClose = () => {
        setOpenM(false);
    }
    const body = (
        <div className={classes.paper}>
            <form className={classes.formData} onSubmit={handleSubmit}>
                <div>
                    <StyleTextField variant="outlined" id="transition-modal-title" name="FullName" label="First Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} inputProps={{
                        style: {
                            color: "white"
                        }
                    }} className={classes.textStyle} />
                    <StyleTextField variant="outlined" name="email" label="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" inputProps={{
                        style: {
                            color: "white"
                        }
                    }} className={classes.textStyle} />
                    <StyleTextField variant="outlined" name="address" label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} inputProps={{
                        style: {
                            color: "white"
                        }
                    }} className={classes.textStyle} />
                    <StyleTextField variant="outlined" name="number" label="Phone Number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} inputProps={{
                        style: {
                            color: "white"
                        }
                    }} className={classes.textStyle} />
                </div>
                {progress ?
                    <div style={{ padding: '7px 0', width: '98%', margin: '20px auto', textAlign: 'center' }}>
                        <Typography variant="body1">{progress}</Typography>
                    </div> :
                    <div style={{ textAlign: "center" }} ><input style={{ padding: '20px 0px', marginLeft: "50px", color: 'white' }} type="file" id='selectedFile' name='selectedFile' onChange={(e) => setimage({ ...image, selectedFile: e.target.files[0] })} />
                        <Button variant="contained" style={{ backgroundColor: 'rgb(25, 45, 85)', margin: '10px 1px', color: 'white' }} size="large" onClick={upload}>Upload Image</Button></div>}
                {!wait ? <Button type="submit" fullWidth variant="contained" disabled={wait} style={{ backgroundColor: 'rgb(25, 45, 85)', margin: '0px 1px', color: 'white' }} >
                    Update
                </Button> : <Button fullWidth disabled style={{ backgroundColor: 'rgb(25, 35, 75)', margin: '0px 1px', color: 'white' }}>
                    updating
                </Button>}
            </form>
        </div>
    )
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openM}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openM}>
                {body}
            </Fade>
        </Modal>
    );
}
