import { styled } from '@mui/material/styles';
import { TextField } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';

export const CssGridToolbarQuickFilter = styled(GridToolbarQuickFilter)({
    '& label.Mui-focused:after': {
        borderColor: '#00434d',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#00434d',
        },
        '&:hover fieldset': {
            borderColor: '#00434d',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#00434d',
        },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        color: '#00434d',
        margin: '0px',
    },
    width: '50%',
    display: 'inline-block',
});
export const StyleDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-sortIcon': {
        color: 'white !important',
    },
    '& .css-ptiqhd-MuiSvgIcon-root': {
        color: 'white !important',
    },
    '& .css-zylse7-MuiButtonBase-root-MuiIconButton-root': {
        color: 'white !important',
        backgroundColor: '#53bd9b !important',
        margin: '0px 10px',
        '&:hover': {
            color: 'white !important',
            backgroundColor: '#00434d !important',
        },
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#00434d',
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        color: "white",
        fontSize: 14,
        letterSpacing: '1px',
        fontWeight: 'bold',
    },
    "& .MuiDataGrid-columnHeaderTitleContainerContent": {
        margin: 'auto',
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
        "& .MuiDataGrid-row": {
            backgroundColor: '#beedde',
            "&:nth-child(even)": { backgroundColor: '#90D0BC' },
        },
        "& .MuiDataGrid-row:hover": {
            backgroundColor: "#b2e5d5",
            borderColor: "#b2e5d5",
        },
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid lightgray`
    },
    '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.css-ptiqhd-MuiSvgIcon-root': {
        color: 'white',
    },
    width: '100%',
    height: '100%',
    margin: 'auto',
    borderRadius: 6,
    border: '1px solid #fff !important',
});

export const StyleChipInput = styled(ChipInput)({
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

export const StyleTextField = styled(TextField)({
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