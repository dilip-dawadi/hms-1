import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Icon from "./Icon";
import useStyles from "./styleAuth";
import { NotifyError } from "../../redux/actions/notify";
import { signin, signup } from '../../redux/actions/Auth';
const GoogleAuth = ({ isSignup }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const clientId = "426614789973-umcv7inmjg49cprhasmtmiu1q1j705s2.apps.googleusercontent.com";
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const formData = {
            firstName: result?.givenName,
            lastName: result?.familyName,
            email: result?.email,
            password: 'cf468amvfeh0x7sl#lpqaxwrrxwdgxxg59$#@!',
            confirmPassword: 'cf468amvfeh0x7sl#lpqaxwrrxwdgxxg59$#@!',
            selectedFile: result?.imageUrl,
            address: "unknown",
            number: 1234567890,
        };

        try {
            if (isSignup) {
                dispatch(signup(formData, navigate));
            } else {
                dispatch(signin(formData, navigate));
            }
        } catch (error) {
            NotifyError(error.message);
        }
    };
    const googleError = () => NotifyError("Login Failed");
    return (
        <>
            <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (

                    isSignup ? <Button
                        className={classes.googleButton
                        }
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant="contained"
                        fullWidth
                    >
                        Google Sign Up
                    </Button> : <Button
                        className={classes.googleButton}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant="contained"
                        fullWidth
                    >
                        Google Sign In                    </Button>
                )}
                buttonText="Login"
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
            />
        </>
    );
};
export default GoogleAuth;
