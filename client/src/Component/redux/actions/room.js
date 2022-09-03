import {
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
  ROOM_CREATE_REVIEW_REQUEST,
  ROOM_CREATE_REVIEW_SUCCESS,
  ROOM_CREATE_REVIEW_FAIL,
  ROOM_REPLY_REVIEW_REQUEST,
  ROOM_REPLY_REVIEW_SUCCESS,
  ROOM_REPLY_REVIEW_FAIL,
} from "../constants/actionTypes";
import axios from "axios";
import * as api from "../api";

export const listRooms =
  (keyword = "", sort = "") =>
  async dispatch => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/rooms?keyword=${keyword}&sort=${sort}`
      );
      dispatch({ type: ROOM_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ROOM_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const detailRoom = id => async dispatch => {
  try {
    dispatch({ type: ROOM_DETAILS_REQUEST });
    const { data } = await api.singleRoomDetails(id);
    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createRoom = formData => async dispatch => {
  try {
    dispatch({ type: ROOM_CREATE_REQUEST });
    const { data } = await api.createRoom(formData);
    dispatch({ type: ROOM_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createRoomReview = (roomId, review) => async dispatch => {
  try {
    dispatch({ type: ROOM_CREATE_REVIEW_REQUEST });
    await api.createRoomReview(roomId, review);
    dispatch({ type: ROOM_CREATE_REVIEW_SUCCESS });
  } catch (err) {
    dispatch({
      type: ROOM_CREATE_REVIEW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const replyRoomReview = (roomId, reviewId, reply) => async dispatch => {
  try {
    dispatch({ type: ROOM_REPLY_REVIEW_REQUEST });
    const { data } = await api.replyRoomReview(roomId, reviewId, reply);
    dispatch({ type: ROOM_REPLY_REVIEW_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_REPLY_REVIEW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateRoom = (id, formData) => async dispatch => {
  try {
    dispatch({ type: ROOM_UPDATE_REQUEST });

    const { data } = await api.updateSingleRoom(id, formData);
    dispatch({ type: ROOM_UPDATE_SUCCESS, payload: id });
    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteRoom = id => async dispatch => {
  if (window.confirm("Are you sure you want to delete room?")) {
    try {
      dispatch({ type: ROOM_DELETE_REQUEST });
      await api.deleteRoom(id);
      dispatch({ type: ROOM_DELETE_SUCCESS });
    } catch (err) {
      dispatch({
        type: ROOM_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};
