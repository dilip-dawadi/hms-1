import * as actionType from '../constants/actionTypes';
import { produce } from 'immer';
const authReducer = (state = { isLoading: false, authData: null }, action) => {
  switch (action.type) {
    case actionType.IS_LOADING:
      return produce(state, (draft) => {
        draft.isLoading = true;
      });
    case actionType.IS_NOT_LOADING:
      return produce(state, (draft) => {
        draft.isLoading = false;
      });
    case actionType.FETCH_USERS:
      return produce(state, (draft) => {
        draft.allUser = action.payload.users;
      });
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return produce(state, (draft) => {
        draft.authData = action?.data;
      }
      );
    case actionType.LOGOUT:
      localStorage.removeItem('profile')
      return { ...state, authData: null, AsingleUser: null };
    case actionType.FETCH_SINGLEUSER:
      return produce(state, (draft) => {
        draft.AsingleUser = { ...action.payload.singleUser };
      });
    case actionType.UPDATE_SINGLE_USER:
      localStorage.setItem('profile', JSON.stringify({ ...action.payload.updateSingleUser }));
      return produce(state, (draft) => {
        draft.AsingleUser = { ...action.payload.updateSingleUser.result }
      });
    default:
      return state;
  }
};

export default authReducer;