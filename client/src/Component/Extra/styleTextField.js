import { styled } from '@mui/material/styles';
import { TextField } from '@material-ui/core';

const CssTextField = styled(TextField)({
    '& label.Mui-focused:after': {
        borderColor: 'rgb(0, 67, 77)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(0, 67, 77)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(0, 67, 77)',
            borderWidth: '1px',
        },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        color: 'rgb(0, 67, 77) !important',
        margin: '2px 0px',
    }
});

export default CssTextField;