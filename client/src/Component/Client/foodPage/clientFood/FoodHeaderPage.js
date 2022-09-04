import React from 'react'
import { CardMedia, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import useStyle from './FoodHeaderPageStyle'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchFoodPage } from '../../../redux/actions/foodPageaction';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const FoodHeaderPage = ({ foodLength }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');
    const [sort, setSort] = React.useState('-sold');
    const query = useQuery();
    const searchFood = query.get('title');
    const [tags, setTags] = React.useState('none');
    const foodquery = {
        page: 1,
        limit: 4,
        sort: sort,
        title: search ? search : 'none',
        tags: tags ? tags : 'none'
    }

    const handletitle = async (e) => {
        e.preventDefault();
        setSearch(e.target.value)
        await dispatch(fetchFoodPage({ ...foodquery, title: e.target.value.toLowerCase() }));
    };
    const handleSort = async (e) => {
        e.preventDefault();
        setSort(e.target.value);
        await dispatch(fetchFoodPage({ ...foodquery, sort: e.target.value }));
    };
    const handletags = async (e) => {
        e.preventDefault();
        setTags(e.target.value);
        await dispatch(fetchFoodPage({ ...foodquery, tags: e.target.value }));
    }
    return (
        <>
            <div className={classes.design}>
                <CardMedia className={classes.media} style={{ backgroundImage: 'url(https://visitorlando.widen.net/content/mdw0wxwqjb/jpeg/188815-table2.jpg?position=c&crop=true&color=ffffff&quality=80&w=1920&h=1252)' }} title='Rhinospot and Kalij' />
                <Typography className={classes.title} variant="h5" component="h2">Rhinospot and Kalij Hotel</Typography>
                <Typography className={classes.detail} variant="h5" component="h2">Home - Food</Typography>
            </div>
            <div className={classes.search}>
                <div className={classes.foodResult}>Showing {foodLength} foods</div>
                <TextField
                    id="foodSearch"
                    placeholder="Search in Rhinospot and Kalij Hotel"
                    onChange={handletitle}
                    className={classes.textFieldSearch}
                    focused
                    variant="standard"
                    value={search}
                    name="search"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={tags} onChange={handletags}>
                        <MenuItem value={'none'}>All Foods</MenuItem>
                        <MenuItem value={'dinner'}>dinner</MenuItem>
                        <MenuItem value={'lunch'}>lunch</MenuItem>
                        <MenuItem value={'breakfast'}>BreakFast</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sort} onChange={handleSort}>
                        <MenuItem value={'-sold'}>Best Sales</MenuItem>
                        <MenuItem value={'-price'}>Price: High to Low </MenuItem>
                        <MenuItem value={'price'}>Price: Low to High</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default FoodHeaderPage