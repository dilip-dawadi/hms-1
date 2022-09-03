import {
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_CREATE_RESET,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
  ROOM_UPDATE_RESET,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
  ROOM_CREATE_REVIEW_REQUEST,
  ROOM_CREATE_REVIEW_SUCCESS,
  ROOM_CREATE_REVIEW_FAIL,
  ROOM_CREATE_REVIEW_RESET,
  ROOM_REPLY_REVIEW_REQUEST,
  ROOM_REPLY_REVIEW_SUCCESS,
  ROOM_REPLY_REVIEW_FAIL,
  ROOM_REPLY_REVIEW_RESET,
} from "../constants/actionTypes";

const initialState = {
  loading: true,
  room: null,
  rooms: [],
  success: false,
  error: null,
};

function roomList(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case ROOM_LIST_SUCCESS: {
      return { ...state, loading: false, success: true, rooms: payload };
    }
    case ROOM_LIST_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
}

function roomCreate(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_CREATE_REQUEST: {
      return { ...state, loading: true, success: false };
    }
    case ROOM_CREATE_SUCCESS: {
      return { ...state, loading: false, success: true, room: payload };
    }
    case ROOM_CREATE_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case ROOM_CREATE_RESET: {
      return {};
    }
    default:
      return state;
  }
}

function roomDetails(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_DETAILS_REQUEST: {
      return { ...state, loading: true };
    }
    case ROOM_DETAILS_SUCCESS: {
      return { ...state, loading: false, success: true, room: payload };
    }
    case ROOM_DETAILS_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
}

function roomUpdate(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_UPDATE_REQUEST: {
      return { ...state, loading: true, success: false };
    }
    case ROOM_UPDATE_SUCCESS: {
      // return { ...state, loading: false, success: true, room: payload };
      return {
        ...state,
        rooms: state.rooms.map(roomData =>
          roomData._id === payload._id ? payload : roomData
        ),
        success: true,
        loading: false,
      };
    }
    case ROOM_UPDATE_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case ROOM_UPDATE_RESET: {
      return {};
    }
    default:
      return state;
  }
}

function roomDelete(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_DELETE_REQUEST: {
      return { ...state, loading: true, success: false };
    }
    case ROOM_DELETE_SUCCESS: {
      return { ...state, loading: false, success: true };
    }
    case ROOM_DELETE_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
}

function roomReviewCreate(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_CREATE_REVIEW_REQUEST: {
      return { ...state, loading: true, success: false };
    }
    case ROOM_CREATE_REVIEW_SUCCESS: {
      return { ...state, loading: false, success: true };
    }
    case ROOM_CREATE_REVIEW_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case ROOM_CREATE_REVIEW_RESET: {
      return {};
    }
    default:
      return state;
  }
}

function roomReviewReply(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOM_REPLY_REVIEW_REQUEST: {
      return { ...state, loading: true, success: false };
    }
    case ROOM_REPLY_REVIEW_SUCCESS: {
      return { ...state, loading: false, success: true, room: payload };
    }
    case ROOM_REPLY_REVIEW_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case ROOM_REPLY_REVIEW_RESET: {
      return {};
    }
    default:
      return state;
  }
}

export {
  roomList,
  roomCreate,
  roomUpdate,
  roomDetails,
  roomDelete,
  roomReviewCreate,
  roomReviewReply,
};
