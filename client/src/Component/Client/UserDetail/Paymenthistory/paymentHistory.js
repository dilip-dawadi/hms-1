import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { fetchPaymentClient } from '../../../redux/actions/paymentaction';
import moment from 'moment';
import PayDetails from './paymentDetail';
import { CssGridToolbarQuickFilter, StyleDataGrid } from '../../../Extra/styleText';
import { Skeleton } from '@mui/material';
function CustomToolbar() {
    return (
        <GridToolbarContainer style={{
            margin: "0px auto 10px auto",
        }}>
            <CssGridToolbarQuickFilter
                style={{
                    width: '50%',
                    margin: '0px 0px 0px 10px',
                    padding: '0px',
                }}
                placeholder="Search by ID"
                label="Search"
                variant='outlined'
                fullWidth={true}
            />
            <span style={window.innerWidth < 600 ? {
                color: '#A6A6A6',
                fontSize: '14px',
                margin: '0px 0px 0px 10px',
                letterSpacing: '1px',
                display: 'inline-block',
            } : {
                color: '#A6A6A6',
                fontSize: '14px',
                margin: '0px 0px 0px 70px',
                letterSpacing: '1px',
                display: 'inline-block',
            }}>Table will updated as you type</span>
        </GridToolbarContainer>
    );
}
function PaymentDetail() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPaymentClient());
    }, [dispatch]);
    const { PaymentData, isLoading } = useSelector((state) => state.payment);
    const rows = PaymentData?.map((payment, index) => {
        return {
            id: index + 1,
            UserName: payment.name,
            Address: payment.address,
            PaymentId: payment.paymentID,
            OrderDate: payment.createdAt,
            Status: payment,
            Details: payment.cart,
            EstimatedTime: payment.createdAt,
        }
    });
    const columns = [
        {
            field: 'UserName',
            headerName: 'User Name',
            minWidth: 200,
            align: 'center',
            sortable: true,
            filter: true,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                    letterSpacing: "1px",
                }} >
                    {params.value}
                </Typography>
        },
        {
            field: 'Address',
            headerName: 'Address',
            align: 'center',
            minWidth: 150,
            maxWidth: 200,
            sortable: true,
            filter: true,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p">
                    {params.value}
                </Typography>
        },
        {
            field: 'PaymentId',
            headerName: 'Payment Id',
            align: 'center',
            width: 200,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                    letterSpacing: "1px",
                }}>
                    {params.value}
                </Typography>
        },
        {
            field: 'OrderDate',
            headerName: 'Order Date',
            align: 'center',
            width: 200,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    padding: "0px 12px",
                }}>
                    {moment(params.value).format('MMMM Do, hh:mm a') || 'none'}
                </Typography>
        },
        {
            field: 'Details',
            headerName: 'Details',
            align: 'center',
            width: 130,
            renderCell: (params) =>
                <Button
                    id="orderDetailBtn"
                    style={{ backgroundColor: '#00434d', textAlign: 'center', color: 'white', padding: '2px 8px', margin: 'auto' }}
                >
                    <PayDetails details={params.value} />
                </Button >
        },
        {
            field: 'Status',
            align: 'center',
            headerName: 'Status',
            width: 170,
            renderCell: (params) =>
                <Button style={{
                    width: '100%',
                    height: '100%',
                }}>
                    {params.value.status === false ? <img src='/process.png' alt='delivering' height={120} /> : <img src='/done.png' alt='delivered' height={120} />}
                </Button>
        },
        {
            field: 'EstimatedTime',
            headerName: 'Estimated Time',
            align: 'center',
            width: 200,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    padding: "0px 12px",
                }}>
                    {moment(params.value).add(Math.floor(Math.random() * 10) + 1, 'hours').add(Math.floor(Math.random() * 10) + 1, 'minutes').add(Math.floor(Math.random() * 10) + 1, "day").format('MMMM Do, hh:mm a') || 'none'}
                </Typography>
        }
    ];
    return (
        <>
            <Grid container style={{
                padding: '0px',
                margin: '0px',
                width: '100%',
                height: '100%',
            }}>
                <div style={{
                    backgroundImage: 'url(/prabandhak.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '100%',
                }} >
                    <Grid container justifyContent="space-between" alignItems="stretch" style={window.innerWidth > 600 ? {
                        height: '100%', padding: '0px',
                        margin: '70px auto 0px auto',
                        width: '80%',
                    } : {
                        height: '100%', padding: '0px',
                        margin: '70px 2px 0px 2px',
                        width: '98%',
                    }} spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                            padding: '0px',
                            margin: '0px',
                            width: '100%',
                            height: '100%',
                        }}>
                            <div style={{
                                textAlign: 'center',
                                padding: '25px 0px 15px 0px',
                                fontSize: '26px',
                                fontWeight: 'bold',
                                letterSpacing: '2px',
                                color: '#00434d',
                                textTransform: 'uppercase',
                            }}>Payment History</div>
                            <Paper style={window.innerWidth > 600 ? {
                                margin: "10px 20px 10px 0px",
                                padding: "10px 0px 10px 0px",
                                borderRadius: "20px",
                            } : {
                                margin: "10px auto",
                                padding: "10px 0px 10px 0px",
                                borderRadius: "20px",
                            }} elevation={3}>
                                <div style={(rows.length === 1) ? {
                                    height: '40vh'
                                } : (rows.length === 2) ? {
                                    height: '60vh'
                                } : (rows.length >= 3) ? {
                                    height: '80vh'
                                } : null}>
                                    <StyleDataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowHeight={90}
                                        headerHeight={65}
                                        autoHeight={true}
                                        disableSelectionOnClick={true}
                                        disableColumnMenu={true}
                                        disableColumnSelector={true}
                                        rowsPerPageOptions={[5, 10, 20, 50]}
                                        components={{
                                            Toolbar: CustomToolbar,
                                            LoadingOverlay: () => <Skeleton variant="rect" animation="wave" height="30vh" />,
                                        }}
                                        loading={isLoading}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div >
            </Grid >
        </>
    )
}
export default PaymentDetail;