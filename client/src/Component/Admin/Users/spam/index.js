import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Spammer from './spammer';
import { Grid, Paper } from '@material-ui/core';
import Drawer from '../../Drawer/drawer';
import { getUsers } from '../../../redux/actions/Auth';
import Loading from '../../../redux/actions/loading/loading';
const FoodAdminPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const { isLoading, allUser } = useSelector((state) => state.Auth);
    return (
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
                            <Grid item xs={12} sm={12} md={12} style={{
                                backgroundColor: '#fafafa',
                            }}>
                                {(isLoading || allUser === undefined) ? <Loading /> :
                                    <Spammer spammer={allUser} loading={isLoading} />}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default FoodAdminPage;