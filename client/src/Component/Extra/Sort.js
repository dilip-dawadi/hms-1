import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { listRooms } from "../redux/actions/room";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useStyles from "../Admin/Auth/styleAuth";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SortBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sort, setSort] = useState("-price");

  const classes = useStyles();

  const handleSort = async e => {
    e.preventDefault();
    setSort(e.target.value);
    navigate(`/room?sort=${e.target.value}`);
    await dispatch(listRooms("", e.target.value));
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label" style={{ marginTop: "20px" }}>
        Sort by
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        onChange={handleSort}
        style={{ padding: "1px 3rem", marginTop: "5px" }}
      >
        <MenuItem value={"price"}>Price: Low to High</MenuItem>
        <MenuItem value={"-price"}>Price: High to Low</MenuItem>
        <MenuItem value={"capacity"}>Capacity: Low to High</MenuItem>
        <MenuItem value={"-capacity"}>Capcity: High to Low</MenuItem>
        <MenuItem value={"noofbeds"}>No of Beds: Low to High</MenuItem>
        <MenuItem value={"-noofbeds"}>No of Beds: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBox;
