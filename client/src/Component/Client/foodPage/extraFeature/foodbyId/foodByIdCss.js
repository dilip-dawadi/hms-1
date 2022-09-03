import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '98%',
        maxWidth: '630px',
        maxHeight: '450px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 'auto',
        },
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 15px',
    },
    buy: {
        margin: 'auto',
        padding: '5px 8px',
        textTransform: 'capitalize',
        backgroundColor: "rgb(0, 67, 77)",
        border: '0px solid black',
        borderRadius: "20px",
        letterSpacing: '1px',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: "rgb(0, 67, 77)",
            color: 'white',
        },
    },
    price: {
        margin: 'auto',
        padding: '8px 20px',
        textTransform: 'capitalize',
        letterSpacing: '1px',
        borderRadius: '12px',
        color: 'black',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        '&:hover': {
            color: 'black',
        },
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        display: 'inline-block',
        borderRadius: '7px',
        padding: ' 8px 15px',
        letterSpacing: '3px',
        color: 'black',
        marginTop: '10px',
    },
    time: {
        display: 'inline-block',
        padding: '10px',
        color: 'gray',
    },
    message: {
        padding: '10px',
        // first word capital
        textTransform: 'capitalize',
        color: 'black',
        margin: '10px',
        lineHeight: 2,
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
        margin: '10px auto',
        flex: 1,
    },
    section1: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    section2: {
        borderRadius: '20px',
        margin: '20px 10px',
        flex: 1,
    },
    imageSection: {
        margin: 'auto',
    },
    recommendedPosts: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '1rem',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    },
    relatedImage: {
        width: '220px',
        height: '200px',
        objectFit: 'contain',
        margin: 'auto',
        borderRadius: "4px"
    },
    commentsInnerContainer: {
        height: '250px',
        width: '95%',
        margin: '10px auto',
        padding: '10px',
        overflowY: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '200px',
            margin: '0px',
            padding: '0px',
            textAlign: 'center',
        },
    },
}));