import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Info from '@mui/icons-material/Info';
import { Typography, CardMedia } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@material-ui/core';


export default function ScrollDialog({ details }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const rows = details?.map((orderData, index) => {
        return {
            id: index + 1,
            title: orderData?.title,
            Image: orderData?.selectedFile,
            Quantity: orderData?.quantity,
            Total: orderData?.price * orderData.quantity,
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
            width: 120,
            renderCell: (params) =>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={params.value}
                    title="Contemplative Reptile"
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
            field: 'Quantity',
            headerName: 'Quantity',
            width: 130,
            align: 'center',
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    margin: "auto",
                }}>
                    {params.value}
                </Typography>
        },
        {
            field: 'Total',
            headerName: 'Total',
            width: 125,
            renderCell: (params) =>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    padding: "0px 12px",
                }}>
                    Rs.{params.value}/.
                </Typography>
        },
    ];

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={handleClickOpen('paper')}><Info style={{
                color: '#fff',
            }} /></Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
            >
                <DialogTitle id="scroll-dialog-title" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Typography variant="h6" color="textSecondary" component="p" style={{
                        margin: "auto",
                        color: '#000',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                    }}>
                        Details
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="p" style={{
                        margin: "auto",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                    }}>
                        Total: Rs.{details?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        style={{
                            padding: '5px 0px',
                            height: '65vh',
                        }} >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            // autoHeight={true}
                            rowHeight={95}
                            headerHeight={60}
                            pageSize={3}
                            rowsPerPageOptions={[3, 4, 6, 10]}
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
                        // disableSelectionOnClick
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                }}>
                    <Button onClick={handleClose} style={{
                        fontWeight: 'bold',
                        backgroundColor: '#a9a9a9',
                        color: '#fff',
                        padding: '7px 30px',
                        letterSpacing: '2px',
                        margin: 'auto',
                    }}>Cancel</Button>
                    <Button onClick={handleClose} style={{
                        fontWeight: 'bold',
                        backgroundColor: 'rgb(0, 67, 77)',
                        color: '#fff',
                        padding: '7px 30px',
                        letterSpacing: '2px',
                        margin: 'auto',
                    }}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
