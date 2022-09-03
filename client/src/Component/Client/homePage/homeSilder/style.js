import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    design: {
        position: 'relative',
        margin: 'auto',
    },
    media: {
        height: '78vh',
        objectFit: 'cover',
        // borderRadius: '0% 0% 50% 50% / 0% 0% 2% 2%',
        width: '100%',
        margin: '0px auto',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '10px',
        borderRadius: '20px',
        color: 'white',
        fontSize: '2rem',
        letterSpacing: '7px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadow: '2px 1px 2px white',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            width: '100%',
            textAlign: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -49%)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '10px',
        borderRadius: '20px',
        color: '#f5f5f5',
        fontSize: '1.1rem',
        letterSpacing: '4px',
        textAlign: 'center',
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
    whyChoose: {
        borderRadius: '20px',
        margin: '0px',
        flex: 1,
    },
    details: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '1rem',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    },
    relatedImage: {
        width: '300px',
        height: '250px',
        objectFit: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        margin: 'auto',
        borderRadius: "4px"
    },
}));

