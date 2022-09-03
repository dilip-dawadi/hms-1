import {
  ROOM_BOOK_REQUEST,
  ROOM_BOOK_SUCCESS,
  ROOM_BOOK_FAIL,
  ROOM_BOOK_RESET,
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

const initialState = {
  loading: true,
  roomBookingData: {},
  roomBookingItems: [],
  success: false,
  error: null,
};

function roomBook(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_BOOK_REQUEST:
      return { ...state, loading: true, success: false };
    case ROOM_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        roomBookingData: payload,
        success: true,
      };
    case ROOM_BOOK_FAIL:
      return { ...state, loading: false, error: payload };
    case ROOM_BOOK_RESET:
      return {};
    default:
      return state;
  }
}

function roomBookList(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_BOOKED_LIST_REQUEST:
      return { ...state, loading: true, success: false };
    case ROOM_BOOKED_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        roomBookingItems: payload,
        success: true,
      };
    case ROOM_BOOKED_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

function roomBookDetails(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_BOOKED_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ROOM_BOOKED_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        roomBookingData: payload,
        success: true,
      };
    case ROOM_BOOKED_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

function roomMyBookList(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_MY_BOOKED_LIST_REQUEST:
      return { ...state, loading: true, success: false };
    case ROOM_MY_BOOKED_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        roomBookingItems: payload,
        success: true,
      };
    case ROOM_MY_BOOKED_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

function roomBookApprove(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_BOOKED_APPROVE_REQUEST:
      return { ...state, loading: true, success: false };
    case ROOM_BOOKED_APPROVE_SUCCESS:
      return {
        ...state,
        loading: false,
        roomBookingData: payload,
        success: true,
      };
    case ROOM_BOOKED_APPROVE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

function roomBookPayment(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_BOOKED_PAYMENT_REQUEST:
      return { ...state, loading: true, success: false };
    case ROOM_BOOKED_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        roomBookingData: payload,
        success: true,
      };
    case ROOM_BOOKED_PAYMENT_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

function roomBookDelete(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_BOOKED_DELETE_REQUEST:
      return { ...state, loading: true, success: false };
    case ROOM_BOOKED_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ROOM_BOOKED_DELETE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export {
  roomBook,
  roomBookList,
  roomMyBookList,
  roomBookApprove,
  roomBookPayment,
  roomBookDetails,
  roomBookDelete,
};
