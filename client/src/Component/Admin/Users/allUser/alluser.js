import React from 'react';
import { Typography, Button, Grid, CardMedia } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { deleteUser, getUsers } from '../../../redux/actions/Auth';
function AllUser({ allUser }) {
    const dispatch = useDispatch();
    const rows = allUser?.map((allU) => {
        return {
            id: allU._id,
            UserName: allU.name,
            Email: allU.email,
            Address: allU.address,
            report: allU.report,
            Image: allU.selectedFile,
            Cart: allU.cart,
            Role: allU.role,
            Number: allU.number,
            VerifiedUser: allU.verifiedUser,
            createdAt: allU.createdAt,
            deleteUser: allU._id,
        }
    });
    const columns = [
        {
            field: 'Image',
            headerName: 'Image',
            width: 120,
            renderCell: (params) =>
                <CardMedia
                    component="img"
                    alt='image'
                    height="140"
                    image={params.value}
                    title={params.value}
                    style={{
                        width: "70%",
                        height: "70%",
                        margin: "auto",
                        borderRadius: "20px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                />
        },
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
            field: 'Email',
            headerName: 'Email',
            align: 'left',
            width: 240,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                    textAlign: "left !important",
                    letterSpacing: "1px",
                }} >
                    {params.value}
                </Typography>
        },
        {
            field: 'Role',
            headerName: 'Role',
            align: 'center',
            width: 100,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                    letterSpacing: "1px",
                }}>
                    {params.value === 1 ? "Admin" : "User"}
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
            field: 'deleteUser',
            headerName: 'Action',
            align: 'center',
            width: 120,
            renderCell: (params) =>
                <Button
                    style={{ textAlign: 'center', padding: '4px 10px', margin: 'auto', letterSpacing: "1px", textTransform: "capitalize" }}
                    color="secondary"
                    variant="contained"
                    onClick={async () => {
                        await dispatch(deleteUser(params.value))
                        await dispatch(getUsers())
                    }
                    }
                >
                    Delete
                </Button >
        },
    ];
    return (
        <>
            <Grid container justifyContent="space-between" alignItems="stretch" style={{
                padding: '0px',
                margin: 'auto',
                width: '86%',
                height: '100%',
            }} spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                    padding: '0px',
                    margin: '0px',
                    width: '100%',
                    height: '100%',
                }}>
                    <div style={{
                        textAlign: 'Left',
                        padding: '10px 0px 15px 10px',
                        fontWeight: 'bold',
                        fontSize: "2rem",
                        letterSpacing: '2px',
                        color: '#000',
                        textTransform: 'uppercase',
                    }}>All Users</div>
                    <div style={{
                        padding: '5px 5px 10px 5px',
                        height: '100vh'
                    }} >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowHeight={90}
                            headerHeight={60}
                            pageSize={6}
                            rowsPerPageOptions={[6, 12, 18, 50]}
                            autoPageSize
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
                                padding: '0px 10px',
                                margin: 'auto',
                                borderRadius: '6px',
                                backgroundColor: 'white',
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
export default AllUser;