import React from 'react'
import FoodPageForm from './foodPageForm/foodPageForm'
import FoodPagePost from './foodPagePost/foodPagePost';
import { Grid, Paper } from '@material-ui/core';
import Drawer from '../Drawer/drawer.js';
import ClientFoodPage from '../../Client/foodPage/clientFoodPage';
const FoodAdminPage = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const [updateFoodCurrentId, setupdateFoodCurrentId] = React.useState(null);
    if (!user?.result?.role) {
        return (
            <ClientFoodPage />
        )
    }
    return (
        // <Grow in={true}>
        <Grid container style={{
            padding: '0px',
            margin: '0px',
        }}>
            <div style={{
                backgroundImage: 'url(/prabandhak.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                height: '100%',
                width: '100%',
            }} >
                <Grid container justifyContent="space-between" alignItems="stretch" style={{
                    padding: '0px',
                    marginTop: '70px',
                }} spacing={0}>
                    <Grid item xs={2} sm={2} md={2}>
                        <Drawer />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10}>
                        <Paper style={{
                            margin: '0px',
                            padding: '0px',
                        }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FoodPageForm setupdateFoodCurrentId={setupdateFoodCurrentId} updateFoodCurrentId={updateFoodCurrentId} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FoodPagePost setupdateFoodCurrentId={setupdateFoodCurrentId} />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Grid>
        // </Grow>
    )
}

export default FoodAdminPage;