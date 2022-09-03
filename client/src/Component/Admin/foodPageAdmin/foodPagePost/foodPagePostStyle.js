import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxWidth: '300px',
        minWidth: '300px',
        maxHeight: '150px',
        minHeight: '150px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: 'auto',
        },
        '@media (max-width: 460px)': {
            maxWidth: '240px',
            minWidth: '240px',
            maxHeight: '150px',
            minHeight: '150px',
        },
        '@media (max-width: 400px)': {
            maxWidth: '200px',
            minWidth: '200px',
            maxHeight: '120px',
            minHeight: '120px',
        },
        '@media (max-width: 350px)': {
            maxWidth: '150px',
            minWidth: '150px',
            maxHeight: '100px',
            minHeight: '100px',
        },
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 5px',
    },
    buy: {
        margin: 'auto',
        border: '0px solid white',
        borderRadius: '12px',
        backgroundColor: 'rgb(0, 67, 77)',
        '&:hover': {
            backgroundColor: 'rgb(0, 67, 77)',
        },
        color: 'white',
    },
    title: {
        textTransform: 'uppercase',
        display: 'inline-block',
        fontWeight: 'bold',
        letterSpacing: '1.3px',
        color: 'black',
        margin: '5px 10px',
    },
    time: {
        display: 'inline-block',
        padding: '10px',
        color: 'gray',
    },
    message: {
        color: 'black',
        borderRadius: "0px 30px 30px 0px",
        border: '1px solid rgb(0, 67, 77)',
        padding: '4px 8px',
        margin: '2px',
    },
    tagStyle: {
        padding: '3px 10px',
        margin: '2px 3px',
        fontSize: '12px',
        borderRadius: "0px 30px 30px 0px",
        backgroundColor: "#FF8C00",
        '&:hover': {
            backgroundColor: "#FF8C00",
        },
        color: 'white',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            padding: '5px',
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    section1: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    imageSection: {
        margin: 'auto',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}));