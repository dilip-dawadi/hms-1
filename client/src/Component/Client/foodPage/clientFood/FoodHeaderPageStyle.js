import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    design: {
        position: 'relative',
        margin: 'auto',
    },
    media: {
        height: '75vh',
        objectFit: 'cover',
        width: '100%',
        margin: '0px auto',
        backgroundBlendMode: 'darken',
        borderRadius: '0% 0% 50% 50% / 0% 0% 2% 2%',
        ObjectFit: 'contain',
        ObjectPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -70%)',
        color: 'white',
        fontSize: '2rem',
        letterSpacing: '7px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadow: '2px 1px 2px #white',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            width: '100%',
            textAlign: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            fontSize: '1.4rem',
            width: '100%',
            textAlign: 'center',
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
        color: '#f5f5f5',
        fontSize: '1rem',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        textShadow: '1px 1px 2px #fff',
        [theme.breakpoints.down('sm')]: {
            top: '68%',
            left: '50%',
            transform: 'translate(-50%, -68%)',
            fontSize: '1rem',
            width: '100%',
            textAlign: 'center',
            letterSpacing: '4px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9rem',
            letterSpacing: '2px',
        }
    },
    // showing 1-4 of 4 items
    foodResult: {
        padding: '15px 20px',
        color: 'rgb(0, 67, 77)',
        fontSize: '17px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginTop: '10px',
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
            padding: '25px 0px 15px 0px',
            width: '100%',
            textAlign: 'center',
        }
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        }
    },
    textFieldSearch: {
        padding: '12px 0 0 0',
        width: '700px',
        [theme.breakpoints.down('sm')]: {
            width: '250px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '290px',
        }
    },
    formControl: {
        minWidth: 170,
        margin: '0 20px',
    }
}));

