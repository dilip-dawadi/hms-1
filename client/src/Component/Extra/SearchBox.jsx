import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/room");
    }
  };
  return (
    <Form
      onSubmit={submitHandler}
      inline
      style={{ display: "flex", height: "80%" }}
      className="my-2"
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Rooms..."
        className="mr-sm-2 ml-sm-5"
        id="roomSearch"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2"
        id="roomSearchBtn"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
