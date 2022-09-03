import { FETCH_PAYMENT_FOOD, FETCH_PAYMENT_CLIENT_FOOD, FETCH_PAYMENT_DELETE, START_PAYMENT, END_PAYMENT } from "../constants/actionTypes";
const Payment = (state = { isLoading: true, PaymentData: [] }, action) => {
    switch (action.type) {
        case START_PAYMENT:
            return {
                ...state,
                isLoading: true
            };
        case END_PAYMENT:
            return {
                ...state,
                isLoading: false
            };
        case FETCH_PAYMENT_FOOD:
            return {
                ...state,
                PaymentData: action.payload.payment
            };
        case FETCH_PAYMENT_CLIENT_FOOD:
            return {
                ...state,
                PaymentData: action.payload.payment
            };
        // not in use
        case FETCH_PAYMENT_DELETE:
            return {
                ...state,
                PaymentData: state.PaymentData.filter((payment) => payment._id !== action.payload)
            };
        default:
            return state;
    }
}

export default Payment;