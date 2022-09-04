import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { KeyboardBackspace } from '@material-ui/icons'
const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Grid container style={{
            padding: '0px',
            margin: '0px',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
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
                <div style={Window.innerWidth > 450 ? {
                    color: 'rgb(0,67,77)',
                    fontSize: '30px',
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
                }}>Page Comming Soon...</div>
                <Button onClick={() => navigate('/home')} style={{
                    position: "absolute",
                    top: '10%',
                    left: '2%',
                    // backgroundColor:"rgb(0, 67, 77)",
                    color: "#000",
                    borderRadius: "10px"
                }} startIcon={<KeyboardBackspace />} >Go Back</Button>
            </div>
        </Grid>
    )
}

export default PageNotFound