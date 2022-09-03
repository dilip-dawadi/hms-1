import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Info from '@mui/icons-material/Info';
import { Typography, CardMedia } from '@material-ui/core';
import { StyleDataGrid } from '../../../Extra/styleText';
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
                // fullScreen={fullScreen}
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
                            height: '57vh',
                        }} >
                        <StyleDataGrid
                            rows={rows}
                            columns={columns}
                            rowHeight={window.innerWidth < 600 ? 100 : 85.8}
                            headerHeight={70}
                            autoHeight={window.innerWidth < 600 ? true : false}
                            disableSelectionOnClick={true}
                            disableColumnMenu={true}
                            disableColumnSelector={true}
                            pageSize={3}
                            rowsPerPageOptions={[3, 6, 16, 30, 50]}
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
                        backgroundColor: '#A5A5A5',
                        color: '#fff',
                        padding: '8px 30px',
                        letterSpacing: '2px',
                        margin: 'auto',
                    }}>Cancel</Button>
                    <Button onClick={handleClose} style={{
                        fontWeight: 'bold',
                        backgroundColor: '#00434d',
                        color: '#fff',
                        padding: '8px 30px',
                        letterSpacing: '2px',
                        margin: 'auto',
                    }}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
