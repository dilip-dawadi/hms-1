import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin, signup } from '../../redux/actions/Auth';
import useStyles from './styleAuth';
import Google from './Google';
import Loading from "../../redux/actions/loading/loading";
import StyleTextField from '../../Extra/styleTextField';
import useStyle from './styleTextField';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', address: '', number: '' };
const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const classesTextField = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [imageUrl, setimageUrl] = useState('');
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup({ ...formData, selectedFile: imageUrl }, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const { isLoading } = useSelector((state) => state.Auth);
  return (
    <Grid container className={classes.container}>
      {isLoading && <Loading />}
      <Grid item xs={12} sm={6} md={6} className={classes.image}>
        <div className={classes.style2} id="loginPage">
          <img src='/contact.png' alt="logo" style={{ width: '100%', height: '100%' }} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} square>
        <div className={isSignup ? classes.Style : classes.Style1}>
          <Paper className={isSignup ? classes.paper : classes.paper1} elevation={3}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className={classes.title} >{isSignup ? 'Sign up' : 'Sign in'}</Typography>
            </div>
            <Google isSignup={isSignup} />
            <form className={classes.formData} id='authForm' onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <StyleTextField variant='outlined' name="firstName" label="First Name" onChange={handleChange} half={window.innerWidth < 600 ? false : true} fullWidth={window.innerWidth < 600 ? true : false} className={classesTextField.TextField} />
                    <StyleTextField variant='outlined' name="lastName" label="Last Name" onChange={handleChange} half={window.innerWidth < 600 ? false : true} fullWidth={window.innerWidth < 600 ? true : false} className={classesTextField.TextField} />
                  </>
                )}
                <StyleTextField variant='outlined' name="email" label="Email Address" onChange={handleChange} type="email" fullWidth className={classesTextField.TextField} />
                <StyleTextField variant='outlined' name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} fullWidth className={classesTextField.TextField} />
                {isSignup && <StyleTextField variant='outlined' name="confirmPassword" label="Repeat Password" type={showCPassword ? 'text' : 'password'} onChange={handleChange} fullWidth className={classesTextField.TextField} />}
                {isSignup && <StyleTextField variant='outlined' name="address" label="Address" onChange={handleChange} half={window.innerWidth < 600 ? false : true} fullWidth={window.innerWidth < 600 ? true : false} className={classesTextField.TextField} />}
                {isSignup && <StyleTextField variant='outlined' name="number" label="Phone Number" onChange={handleChange} half={window.innerWidth < 600 ? false : true} fullWidth={window.innerWidth < 600 ? true : false} className={classesTextField.TextField} />}
              </Grid>
              <Button type="submit" id='loginBtn' fullWidth variant="contained" className={classes.submit} style={isSignup ? { marginBottom: '10px' } : { marginBottom: '1px' }}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid container justifyContent="flex-end" style={{
                margin: '0px',
                padding: '0px',
              }}>
                <Grid item>
                  <Button onClick={switchMode} id='dontHaveAnAccount' style={isSignup ? {
                    color: 'rgb(0, 67, 77)',
                    marginTop: '10px 1px',
                    display: 'inline-block',
                  } : { color: 'rgb(0, 67, 77)', margin: '10px 1px', display: 'inline-block' }}>
                    {isSignup ? `Already have an account? Sign in` : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </Grid>
    </Grid >
  );
};

export default SignUp;