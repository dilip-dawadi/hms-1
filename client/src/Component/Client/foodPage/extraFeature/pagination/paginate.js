/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getKal } from "../../../../../redux/actions/kalijs";
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    ul: {
        justifyContent: 'space-around',
    },
}));

export const PaginateFood = ({ page, limit, sort }) => {
    const { numberOfPages } = useSelector((state) => state.Kalijs);
    const dispatch = useDispatch();
    const foodquery = {
        page: page,
        limit: limit,
        sort: sort,
    };
    useEffect(() => {
        dispatch(getKal(foodquery));
    }, [dispatch, page, limit, sort]);

    return (
        <Pagination
            classes={{ ul: ul }}
            className={classes.pagination}
            count={numberOfPages}
            page={Number(page)}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/food/all?page=${item.page}&limit=${item.limit}&sort=${item.sort}`}
                />
            )}
        />
    );
};
