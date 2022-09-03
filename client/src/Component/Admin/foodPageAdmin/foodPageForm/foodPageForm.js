import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './foodPageFormStyle';
import { createFoodPage, updateFoodPage } from '../../../redux/actions/foodPageaction';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MenuItem from '@mui/material/MenuItem';
import StyleTextField from '../../../Extra/styleTextField';
import { StyleChipInput } from '../../../Extra/styleText';

const HomePageForm = ({ setupdateFoodCurrentId, updateFoodCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', description: '', tags: [], price: '', quantity: '' });
    const [image, setimage] = useState({ selectedFile: '' });
    const [imageUrl, setimageUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const { foodPageData } = useSelector((state) => state.foodPage);
    const UpdateFooPage = foodPageData.filter(updatefoodData => updatefoodData._id === updateFoodCurrentId)[0];
    React.useEffect(() => {
        if (UpdateFooPage) {
            setPostData(UpdateFooPage);
            setimageUrl(UpdateFooPage.selectedFile);
        };
    }, [UpdateFooPage]);
    const dispatch = useDispatch();
    const classes = useStyles();

    const Quantity = [
        {
            value: '50',
            label: '50'
        },
        {
            value: '100',
            label: '100'
        },
        {
            value: '150',
            label: '150'
        },
        {
            value: '200',
            label: '200'
        },
    ];
    const clear = () => {
        setPostData({ title: '', description: '', tags: [], price: '', quantity: '' });
        setimage({ selectedFile: '' });
        setimageUrl(null);
        setProgress(0);
        setupdateFoodCurrentId(null);
    };

    const upload = () => {
        if (!image.selectedFile) return;
        const sotrageRef = ref(storage, `files/${image.selectedFile.name}`);
        console.log(sotrageRef, 'check');
        const uploadTask = uploadBytesResumable(sotrageRef, image.selectedFile);
        console.log(uploadTask, 'check');

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused": // or 'paused'
                        setProgress("Upload is paused");
                        break;
                    case "running": // or 'running'
                        setProgress("Upload is " + progress + "% done");
                        break;
                    default:
                        setProgress("Upload");

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
        if (updateFoodCurrentId) {
            dispatch(updateFoodPage(updateFoodCurrentId, { ...postData, selectedFile: imageUrl }));
        } else {
            dispatch(createFoodPage({ ...postData, selectedFile: imageUrl }));
        };
    };
    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags?.filter((tag) => tag !== chipToDelete) });
    };
    return (
        <>
            <Typography variant="h6" className={classes.title} >Food Item Details</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Grid container spacing={3} item sm={6} md={6} >
                    <StyleTextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value.toLowerCase() })} className={classes.TextField} />
                    <StyleTextField name="Description" variant="outlined" label="Description" fullWidth multiline minRows={3} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} className={classes.TextField} />
                    <StyleTextField name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} className={classes.TextField} />
                </Grid>
                <Grid container spacing={3} item sm={6} md={6}>
                    <StyleTextField style={window.innerWidth < 600 ? { marginTop: "35px" } : {}} id="outlined-select-currency-native" select variant="outlined" label="Quantity" placeholder='Quantity' fullWidth value={postData.quantity} onChange={(e) => setPostData({ ...postData, quantity: e.target.value })} className={classes.TextField}>
                        {Quantity.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </StyleTextField>
                    <StyleChipInput
                        className={classes.TextField}
                        name="tags"
                        variant="outlined"
                        label="Tag"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                    {progress ?
                        <div style={{ padding: '7px 0', width: '98%', margin: '20px auto', textAlign: 'center' }}>
                            <Typography variant="body1">{progress}</Typography>
                        </div> :
                        <div style={{ textAlign: "center" }} >
                            <input style={{ padding: '20px 0px', marginLeft: "50px" }} type="file" id='selectedFile' name='selectedFile' onChange={(e) => setimage({ ...image, selectedFile: e.target.files[0] })} />
                            <Button variant="contained" size="small" className={classes.upload} onClick={upload}><UploadFileIcon /></Button>
                        </div>}
                    <Button className={classes.buttonSubmit} id="foodAddBtn" variant="contained" color="primary" size="large" type="submit" >Submit</Button>
                    <Button variant="contained" className={classes.buttonSubmit1} size="large" onClick={clear} >Clear</Button>
                </Grid>
            </form>
        </>
    );
}

export default HomePageForm;