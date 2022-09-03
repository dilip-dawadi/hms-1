import {
  ROOM_BOOK_REQUEST,
  ROOM_BOOK_SUCCESS,
  ROOM_BOOK_FAIL,
  ROOM_BOOKED_LIST_REQUEST,
  ROOM_BOOKED_LIST_SUCCESS,
  ROOM_BOOKED_LIST_FAIL,
  ROOM_MY_BOOKED_LIST_REQUEST,
  ROOM_MY_BOOKED_LIST_SUCCESS,
  ROOM_MY_BOOKED_LIST_FAIL,
  ROOM_BOOKED_DELETE_REQUEST,
  ROOM_BOOKED_DELETE_SUCCESS,
  ROOM_BOOKED_DELETE_FAIL,
  ROOM_BOOKED_APPROVE_REQUEST,
  ROOM_BOOKED_APPROVE_SUCCESS,
  ROOM_BOOKED_APPROVE_FAIL,
  ROOM_BOOKED_DETAILS_REQUEST,
  ROOM_BOOKED_DETAILS_SUCCESS,
  ROOM_BOOKED_DETAILS_FAIL,
  ROOM_BOOKED_PAYMENT_REQUEST,
  ROOM_BOOKED_PAYMENT_SUCCESS,
  ROOM_BOOKED_PAYMENT_FAIL,
} from "../constants/actionTypes";

import * as api from "../api";

export const bookRoom = (formData, id) => async dispatch => {
  try {
    dispatch({ type: ROOM_BOOK_REQUEST });
    const { data } = await api.bookRoom(formData, id);
    dispatch({ type: ROOM_BOOK_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_BOOK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const bookRoomDetails = id => async dispatch => {
  try {
    dispatch({ type: ROOM_BOOKED_DETAILS_REQUEST });
    const { data } = await api.roomBookedDetails(id);
    dispatch({ type: ROOM_BOOKED_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_BOOKED_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const bookRoomList = () => async dispatch => {
  try {
    dispatch({ type: ROOM_BOOKED_LIST_REQUEST });
    const { data } = await api.allBookedRooms();
    dispatch({ type: ROOM_BOOKED_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_BOOKED_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const myBookedRoomList = () => async dispatch => {
  try {
    dispatch({ type: ROOM_MY_BOOKED_LIST_REQUEST });
    const { data } = await api.myBookedRooms();
    dispatch({ type: ROOM_MY_BOOKED_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_MY_BOOKED_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const approveBookedRoom = id => async dispatch => {
  try {
    dispatch({ type: ROOM_BOOKED_APPROVE_REQUEST });
    const { data } = await api.roomBookedApprove(id);
    dispatch({ type: ROOM_BOOKED_APPROVE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_BOOKED_APPROVE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payBookedRoom = id => async dispatch => {
  try {
    dispatch({ type: ROOM_BOOKED_PAYMENT_REQUEST });
    const { data } = await api.roomBookedPayment(id);
    dispatch({ type: ROOM_BOOKED_PAYMENT_SUCCESS });
    dispatch({ type: ROOM_BOOKED_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROOM_BOOKED_PAYMENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteBookedRoom = id => async dispatch => {
  try {
    dispatch({ type: ROOM_BOOKED_DELETE_REQUEST });
    await api.deleteBookedRooms(id);
    dispatch({ type: ROOM_BOOKED_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: ROOM_BOOKED_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
