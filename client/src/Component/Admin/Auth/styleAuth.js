import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '0px',
        margin: '30px auto 10px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    style2: {
        padding: '50px 35px 0px 35px',
        borderRadius: '20px',
        margin: 'auto',
        height: '80vh',
        objectFit: 'cover',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        "@media (max-width: 600px)": {
            display: 'none',
        }
    },
    Style: {
        margin: '30px auto 0px auto',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            height: '80vh',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Style1: {
        margin: '0px auto 0px auto',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        borderRadius: '0.5rem',
        maxWidth: '500px',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        margin: theme.spacing(3),
        backgroundColor: 'rgba(20,38,65, 0.02)',
    },
    paper1: {
        maxWidth: '450px',
        borderRadius: '0.5rem',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        backgroundColor: 'rgba(20,38,65, 0.02)',
    },
    title: {
        letterSpacing: '2px',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: 'rgb(0, 67, 77)'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'rgb(0, 67, 77)',
    },
    formData: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor: 'rgb(0, 67, 77)',
        color: 'white',
        letterSpacing: '3px',
        padding: '0.4rem 0.7rem',
        fontSize: '15px',
        width: '100%',
        margin: '10px auto',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgb(0, 67, 77) ',
            color: 'white',
        }
    },
    googleButton: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        backgroundColor: 'rgba(0, 67, 77, 0.8)',
        color: '#fff',
        fontSize: '15px',
        padding: '0.4rem 1rem',
        letterSpacing: '1px',
        '&:hover': {
            backgroundColor: 'rgba(33, 161, 121, 1)',
        }
    },
}));