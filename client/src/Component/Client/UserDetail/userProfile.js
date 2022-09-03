import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditUser from './EditUser';
import { singleUser, deleteUser } from '../../redux/actions/Auth';
import { LOGOUT } from '../../redux/constants/actionTypes';

export default function SimpleMenu() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [aUser, setaUser] = useState();
    const { AsingleUser } = useSelector(state => state.Auth);
    useEffect(() => {
        user?.token && dispatch(singleUser(user?.result?._id));
    }, [dispatch]);
    useEffect(() => {
        setaUser(AsingleUser);
    }, [AsingleUser, dispatch]);
    const [openM, setOpenM] = React.useState(false);

    const handleOpenM = () => {
        setOpenM(true);
    };
    const delUser = () => {
        dispatch(deleteUser(aUser?._id, navigate));
        setUser(null);
        navigate('/auth');
    }

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
        navigate('/auth');
    };
    return (
        user ?
            <Grid container style={{
                padding: '0px',
                margin: '0px',
            }}>
                <div style={{
                    backgroundImage: 'url(/prabandhak.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '100%',
                }} >
                    <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '10px', height: '100vh'
                    }}>
                        {aUser ?
                            <Paper elevation={10} style={{
                                backgroundColor: 'rgb(0, 67, 77)',
                                backgroundBlendMode: 'darken',
                                borderRadius: '10px',
                                padding: '10px',
                                margin: '10px',
                            }}>
                                <CardHeader
                                    avatar={
                                        <Avatar style={{ backgroundColor: 'rgb(20, 44, 75)', color: 'white' }} aria-label="recipe">
                                            {aUser?.name?.charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenM}>
                                            <MoreVertIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    }
                                    title={aUser?.name}
                                    style={{ color: 'white' }}
                                />
                                <div style={{
                                    width: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 'auto',
                                }} >
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={aUser?.selectedFile}
                                        alt="Paella dish"
                                        style={{
                                            borderRadius: '20px',
                                        }}
                                    />
                                </div>
                                <CardContent style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gridGap: '20px',
                                    color: 'white',
                                    backgroundColor: 'transparent',
                                }} >
                                    <Typography variant="body2" component="p">
                                        <b>Name:</b> {aUser?.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <b>Email:</b> {aUser?.email?.split('.')[0]}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <b>Number:</b> {aUser?.number}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <b>Address:</b> {aUser?.address}
                                    </Typography>
                                    <IconButton aria-label="add to favorites" style={{
                                        backgroundColor: 'transparent',
                                        borderRadius: '50px',
                                        border: '1px solid white',
                                    }} onClick={logout} >
                                        <LogoutIcon style={{
                                            color: 'white',
                                        }} />
                                    </IconButton>
                                    <IconButton aria-label="share" style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid white',
                                        borderRadius: '50px',
                                    }} onClick={delUser}>
                                        <DeleteIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                    <EditUser openM={openM} setOpenM={setOpenM} aUser={aUser} />
                                </CardContent>
                            </Paper> : <div style={{
                                color: 'white',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                letterSpacing: '2px',
                            }}>Loading...</div>}
                    </div >
                </div>
            </Grid > :
            <Grid container style={{
                padding: '0px',
                margin: '0px',
            }}>
                <div style={{
                    backgroundImage: 'url(/prabandhak.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '100%',
                }} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', height: '100vh' }}>
                        <div style={{
                            color: 'white',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                        }}>No Data Found</div>
                    </div>
                </div>
            </Grid>
    );
}