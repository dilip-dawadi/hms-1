import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    design: {
        position: 'relative',
        margin: '0px',
        paddingTop: '22px',
    },
    media: {
        height: '34vh',
        objectFit: 'cover',
        width: '90%',
        margin: '0px auto',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        position: 'absolute',
        top: '70%',
        left: '50%',
        width: '100%',
        textAlign: 'center',
        transform: 'translate(-50%, -70%)',
        color: 'white',
        fontSize: '2rem',
        letterSpacing: '7px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadow: '2px 1px 2px #white',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down('sm')]: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.4rem',
            letterSpacing: '4px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.2rem',
            letterSpacing: '2px',
        },
    },
    detail: {
        position: 'absolute',
        top: '79%',
        left: '50%',
        transform: 'translate(-50%, -79%)',
        width: '100%',
        textAlign: 'center',
        color: '#f5f5f5',
        fontSize: '1rem',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        textShadow: '1px 1px 2px #fff',
        [theme.breakpoints.down('sm')]: {
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            fontSize: '1rem',
            letterSpacing: '4px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9rem',
            letterSpacing: '2px',
        }
    },
    btnFunction2: {
        position: 'absolute',
        margin: 'auto',
        padding: '8px 45px',
        border: '0px solid white',
        borderRadius: '12px',
        color: 'white',
        top: '95%',
        left: '60%',
        transform: 'translate(-60%, -95%)',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        [theme.breakpoints.down('sm')]: {
            padding: '8px 25px',
            left: '70%',
            transform: 'translate(-70%, -95%)',
        }
    },
    btnFunction1: {
        position: 'absolute',
        margin: 'auto',
        padding: '8px 45px',
        border: '0px solid white',
        borderRadius: '12px',
        color: 'white',
        top: '95%',
        left: '40%',
        transform: 'translate(-40%, -95%)',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        [theme.breakpoints.down('sm')]: {
            padding: '8px 25px',
            left: '30%',
            transform: 'translate(-30%, -95%)',
        }
    },

}));

