import { combineReducers } from "redux";
import Auth from "./Auth";
import homePage from "./homePage";
import foodPage from "./foodPageReducer";
import payment from "./PaymentReducer";
import {
  roomList,
  roomCreate,
  roomUpdate,
  roomDetails,
  roomDelete,
  roomReviewCreate,
  roomReviewReply,
} from "./room";
import {
  roomBook,
  roomBookList,
  roomBookDetails,
  roomBookPayment,
  roomMyBookList,
  roomBookApprove,
  roomBookDelete,
} from "./roomBook";
import {
  contactUs,
  contactUsList,
  contactUsResolve,
  contactUsDelete,
} from "./contactUs";
export const reducers = combineReducers({
  Auth,
  homePage,
  foodPage,
  payment,
  roomCreate,
  roomList,
  roomUpdate,
  roomDetails,
  roomReviewCreate,
  roomReviewReply,
  roomBookApprove,
  roomDelete,
  roomBook,
  roomBookList,
  roomBookDetails,
  roomBookPayment,
  roomMyBookList,
  roomBookDelete,
  contactUs,
  contactUsList,
  contactUsResolve,
  contactUsDelete,
});
