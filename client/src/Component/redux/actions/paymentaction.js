import * as api from '../api';
import { NotifyError, NotifySuccess } from './notify';
import { FETCH_PAYMENT_FOOD, FETCH_PAYMENT_CLIENT_FOOD, FETCH_PAYMENT_DELETE, START_PAYMENT, END_PAYMENT } from '../constants/actionTypes';

// payment
export const fetchPayment = () => async (dispatch) => {
    try {
        dispatch({ type: START_PAYMENT });
        const { data } = await api.getPayment();
        dispatch({ type: FETCH_PAYMENT_FOOD, payload: { payment: data.payments } });
        dispatch({ type: END_PAYMENT });
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}
export const fetchPaymentClient = () => async (dispatch) => {
    try {
        dispatch({ type: START_PAYMENT });
        const { data } = await api.getPaymentClient();
        dispatch({ type: FETCH_PAYMENT_CLIENT_FOOD, payload: { payment: data.payment } });
        dispatch({ type: END_PAYMENT });
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}
export const deletePaymentByUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePaymentByUser(id);
        dispatch({ type: FETCH_PAYMENT_DELETE, payload: id });
        NotifySuccess(data.message);
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}
export const StatusPayment = (id) => async () => {
    try {
        const { data } = await api.StatusPayment(id);
        NotifySuccess(data.message);
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}
export const createPayment = (cart, paymentID, address) => async () => {
    try {
        const { data } = await api.createPayment({ cart, paymentID, address });
        NotifySuccess(data.message);
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyError(error.response.data.message);
        } else {
            NotifyError(error.message);
        }
    }
}