import {
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAIL,
  CONTACT_US_LIST_REQUEST,
  CONTACT_US_LIST_SUCCESS,
  CONTACT_US_LIST_FAIL,
  CONTACT_US_DELETE_FAIL,
  CONTACT_US_DELETE_REQUEST,
  CONTACT_US_DELETE_SUCCESS,
  CONTACT_US_RESOLVE_REQUEST,
  CONTACT_US_RESOLVE_SUCCESS,
  CONTACT_US_RESOLVE_FAIL,
} from "../constants/actionTypes";

import * as api from "../api";

export const contactUs = formData => async dispatch => {
  try {
    dispatch({ type: CONTACT_US_REQUEST });
    const { data } = await api.contactUs(formData);
    dispatch({ type: CONTACT_US_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CONTACT_US_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const resolveContactUs = id => async dispatch => {
  try {
    dispatch({ type: CONTACT_US_RESOLVE_REQUEST });
    const { data } = await api.contactUsResolve(id);
    dispatch({ type: CONTACT_US_RESOLVE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CONTACT_US_RESOLVE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listContactUs = formData => async dispatch => {
  try {
    dispatch({ type: CONTACT_US_LIST_REQUEST });
    const { data } = await api.listContactUs(formData);
    dispatch({ type: CONTACT_US_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CONTACT_US_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteContactUs = id => async dispatch => {
  try {
    dispatch({ type: CONTACT_US_DELETE_REQUEST });
    await api.deleteContactUs(id);
    dispatch({ type: CONTACT_US_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: CONTACT_US_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
