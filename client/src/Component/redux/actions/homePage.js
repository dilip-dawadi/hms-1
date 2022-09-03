import * as api from '../api';
import { FETCH_HOMEPAGE, CREATE_HOMEPAGE, START_HOMEPAGE, END_HOMEPAGE, DELETE_HOMEPAGE, UPDATE_HOMEPAGE } from '../constants/actionTypes';
import { NotifyError, NotifySuccess } from './notify';

export const fetchHomePage = () => async (dispatch) => {
    try {
        dispatch({ type: START_HOMEPAGE });
        const { data } = await api.getHomePage();
        dispatch({ type: FETCH_HOMEPAGE, payload: { homePage: data.homePage } });
        dispatch({ type: END_HOMEPAGE });
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}

export const createHomePage = (formData) => async (dispatch) => {
    try {
        dispatch({ type: START_HOMEPAGE });
        const { data: { savedHomePage, message } } = await api.createHomePage(formData);
        dispatch({ type: CREATE_HOMEPAGE, payload: { savedHomePage } });
        NotifySuccess(message);
        dispatch({ type: END_HOMEPAGE });
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}

export const updateHomePage = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: START_HOMEPAGE });
        const { data: { updateHomePage, message } } = await api.updateHomePage(id, formData);
        dispatch({ type: UPDATE_HOMEPAGE, payload: { updateHomePage } })
        NotifySuccess(message);
        dispatch({ type: END_HOMEPAGE });
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}

export const deleteHome = (id) => async (dispatch) => {
    try {
        const { data: { message } } = await api.deleteHome(id);
        dispatch({ type: DELETE_HOMEPAGE, payload: id })
        NotifySuccess(message);
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}