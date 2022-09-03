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
                backgroundImage: 'url(/prabandhak.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%',
            }} >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', height: '100vh' }}>
                    <div style={{
                        color: 'rgba(0,0,0, 0.5)',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        letterSpacing: '3px',
                        display: "block"
                    }}>Page Not Found</div>
                    <Button onClick={() => navigate('/home')} style={{
                        position: "absolute",
                        top: '10%',
                        left: '2%',
                        // backgroundColor:"rgb(0, 67, 77)",
                        color: "#000",
                        borderRadius: "10px"
                    }} startIcon={<KeyboardBackspace />} >Go Back</Button>

                </div>
            </div>
        </Grid>
    )
}

export default PageNotFound