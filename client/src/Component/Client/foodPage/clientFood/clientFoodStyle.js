import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '0.5rem 1rem',
        marginBottom: '1rem',
    },
    media: {
        width: '100%',
        height: '250px',
        ObjectFit: 'contain',
        ObjectPosition: 'center',
        borderRadius: '0px 0px 4px 4px',
        [theme.breakpoints.down('sm')]: {
            height: '300px',
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
    },
    details: {
        display: 'flex',
        padding: '5px 17px 5px 17px',
    },
    title: {
        color: 'gray',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '16px 15px 4px 15px',
        textTransform: 'capitalize'
    },
    cartTitle: {
        padding: '5px 17px 15px 17px',
        fontSize: '15px',
        color: '#A2816C'
    },
    cardActionsI: {
        display: 'grid',
        margin: '10px',
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial',
    },
    btn: {
        textTransform: 'capitalize',
        padding: '0.4rem 0.7rem',
        letterSpacing: '1px',
        fontSize: '14px',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        backgroundColor: 'rgb(0, 67, 77)',
        '&:hover': {
            backgroundColor: 'rgb(0, 67, 77)',
        },
        // disable
        '&:disabled': {
            color: 'white',
            backgroundColor: 'rgb(0, 67, 77)',
        }
    },
}));

