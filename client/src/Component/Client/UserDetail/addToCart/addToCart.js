import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { singleUser, deleteaCart, incrementaCart } from '../../../redux/actions/Auth';
import { Typography, CardMedia, Button, TextField, Grid, Paper } from '@material-ui/core';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Delete from '@mui/icons-material/Delete';
import KhaltiPay from '../../khaltiIntegration/khalti';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminCartPage from '../../../Admin/CartAdmin/SeeCartDetail';
function AddToCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { AsingleUser } = useSelector((state) => state.Auth);
    const [disable, setdisable] = React.useState(false);
    const [placeOrder, setplaceOrder] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (user) {
            dispatch(singleUser(user?.result?._id));
        }
    }, [dispatch]);
    const increment = async (id) => {
        const cart = await AsingleUser.cart.map((items) => items)
        let increment = true;
        await dispatch(incrementaCart({ id, cart, increment }));
        await dispatch(singleUser(user?.result?._id));
    }
    const decrement = async (id) => {
        const cart = await AsingleUser.cart.map((items) => items)
        let increment = false;
        await dispatch(incrementaCart({ id, cart, increment }));
        await dispatch(singleUser(user?.result?._id));
    }
    const removeProduct = async (id) => {
        const cart = await AsingleUser.cart.map((items) => items)
        await dispatch(deleteaCart({ id, cart }));
        await dispatch(singleUser(user?.result?._id));
    }
    const rows = AsingleUser?.cart?.map((cartData, index) => {
        return {
            id: index + 1,
            title: cartData?.title,
            Image: cartData?.selectedFile,
            Add: cartData?._id,
            Quantity: cartData?.quantity,
            Remove: cartData?._id,
            Total: cartData?.price * cartData.quantity,
            Delete: cartData?._id
        }
    });
    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            minWidth: 140,
            sortable: true,
            filter: true,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                }} >
                    {params.value}
                </Typography>
        },
        {
            field: 'Image',
            headerName: 'Image',
            width: 140,
            renderCell: (params) =>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={params.value}
                    title="Contemplative Reptile"
                    style={{
                        width: "95%",
                        height: "70%",
                        margin: "auto",
                        borderRadius: "20px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                />
        },
        {
            field: 'Add',
            headerName: 'Add',
            width: 110,
            renderCell: (params) =>
                <Button
                    id="addItem"
                    onClick={() => {
                        setdisable(true);
                        setTimeout(() => {
                            setdisable(false);
                        }, 3000);
                        increment(params.value)
                    }}
                    style={{ backgroundColor: 'rgb(0, 67, 77)', textAlign: 'center', color: 'white', padding: '2px', margin: 'auto' }}
                    disabled={disable}
                >
                    <Add />
                </Button >
        },
        {
            field: 'Quantity',
            headerName: 'Quantity',
            width: 110,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                }}>
                    {params.value}
                </Typography>
        },
        {
            field: 'Remove',
            headerName: 'Remove',
            width: 110,
            renderCell: (params) =>
                <Button
                    id="removeItem"
                    onClick={() => {
                        setdisable(true);
                        setTimeout(() => {
                            setdisable(false);
                        }, 3000);
                        decrement(params.value)
                    }}
                    style={{ backgroundColor: '#a7414a', textAlign: 'center', color: 'white', padding: '2px', margin: 'auto' }}
                >
                    <Remove />
                </Button>
        },
        {
            field: 'Total',
            headerName: 'Total',
            width: 125,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    padding: "0px 12px",
                }}>
                    Rs.{params.value}/
                </Typography>
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            width: 110,
            renderCell: (params) =>
                <Button
                    id="deleteItem"
                    onClick={() => {
                        setdisable(true);
                        setTimeout(() => {
                            setdisable(false);
                        }, 3000);
                        removeProduct(params.value)
                    }}
                ><Delete style={{
                    color: '#a7414a',
                }} /></Button>

        }

    ];
    if (user?.result?.role) {
        return (
            <AdminCartPage />
        )
    }
    return (
        AsingleUser?.cart?.length > 0 ?
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
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={0} style={{
                            marginTop: '70px',
                        }}>
                            <Grid item xs={12} sm={8} md={8}>
                                <div style={{
                                    padding: '5px 5px',
                                    height: '100vh'
                                }} >
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        rowHeight={140}
                                        headerHeight={60}
                                        pageSize={5}
                                        rowsPerPageOptions={[5, 10, 20, 50]}
                                        sx={{
                                            "& .MuiDataGrid-columnHeaderTitle": {
                                                color: "black",
                                                fontSize: 16,
                                                letterSpacing: '1px',
                                                fontWeight: 'bold',
                                                padding: "0px 20px",
                                            },
                                            "& .MuiDataGrid-virtualScrollerRenderZone": {
                                                "& .MuiDataGrid-row": {
                                                    "&:nth-of-type(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
                                                }
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            padding: '10px',
                                            margin: 'auto',
                                            borderRadius: '6px',
                                            backgroundColor: 'white',
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <div style={{ padding: '5px 5px', height: '100%' }}>
                                    <Paper style={{
                                        margin: 'auto',
                                        height: '100%',
                                        textAlign: 'center',
                                    }} >
                                        <Typography variant="h6" style={{
                                            paddingTop: '40px',
                                            fontWeight: 'bold',
                                        }}
                                        >
                                            Order Summary
                                        </Typography>
                                        <Typography variant="h6" style={{
                                            paddingTop: '20px',
                                        }}
                                        >
                                            Total Items: {AsingleUser?.cart?.length}
                                        </Typography>
                                        <form autoComplete="off"
                                            style={placeOrder ? {
                                                display: 'none'
                                            } : { paddingTop: '20px' }}
                                        >
                                            <TextField
                                                id="outlined-basic"
                                                label="Name"
                                                variant="outlined"
                                                style={{
                                                    width: '90%',
                                                    margin: '10px auto',
                                                }}
                                                value={AsingleUser?.name}
                                                disabled
                                            />
                                            <TextField
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                style={{
                                                    width: '90%',
                                                    margin: '10px auto',
                                                }}
                                                value={AsingleUser?.email}
                                                disabled
                                            />
                                            <TextField

                                                id="outlined-basic"
                                                label="Number"
                                                variant="outlined"
                                                style={{
                                                    width: '90%',
                                                    margin: '10px auto',
                                                }}
                                                value={AsingleUser?.number}
                                                disabled
                                            />
                                            <TextField
                                                id="outlined-basic"
                                                label="Address"
                                                variant="outlined"
                                                style={{
                                                    width: '90%',
                                                    margin: '10px auto',
                                                }}
                                                value={AsingleUser?.address}
                                                disabled
                                            />
                                            <Button
                                                id="placeOrder"
                                                style={{
                                                    backgroundColor: 'rgb(0, 67, 77)',
                                                    textAlign: 'center',
                                                    color: 'white',
                                                    padding: '2px 20px',
                                                    margin: 'auto 20px',
                                                    display: 'inline-block',
                                                    height: '50px',
                                                    marginTop: '10px',
                                                    fontWeight: 'bold',
                                                }}
                                                half='true'
                                                onClick={() => {
                                                    setplaceOrder(true)
                                                }}
                                            >
                                                Place Order
                                            </Button>
                                            <Button
                                                style={{
                                                    backgroundColor: '#a7414a',
                                                    textAlign: 'center',
                                                    color: 'white',
                                                    padding: '2px 20px',
                                                    margin: 'auto 20px',
                                                    display: 'inline-block',
                                                    height: '50px',
                                                    marginTop: '10px',
                                                    fontWeight: 'bold',
                                                }}
                                                half='true'
                                                onClick={() => {
                                                    navigate('/profile')
                                                }
                                                }
                                            >
                                                Edit Details
                                            </Button>
                                        </form>
                                        <Typography variant="h6" style={{
                                            paddingTop: '20px',
                                        }}
                                        >
                                            Total: Rs.{AsingleUser?.cart?.reduce((acc, curr) => {
                                                return acc + curr?.price * curr?.quantity
                                            }, 0)}
                                        </Typography>
                                        <Button
                                            id="orderNowKhalti"
                                            style={{
                                                backgroundColor: 'rgb(0, 67, 77)',
                                                textAlign: 'center',
                                                color: 'white',
                                                margin: 'auto',
                                                width: '90%',
                                                height: '50px',
                                                marginTop: '10px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            <KhaltiPay cart={AsingleUser.cart} address={AsingleUser.address} />
                                        </Button>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </>
            :
            <div style={{
                padding: '10px',
                margin: '0px',
                borderRadius: '0px',
                backgroundImage: 'url(/prabandhak.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} >

                <Typography variant="h6" style={{
                    paddingTop: '50px',
                    margin: 'auto',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                }}
                >
                    {user ? 'Your Cart is Empty' : 'Create an Account to Order'}
                </Typography>
            </div>
    )
}
export default AddToCart;