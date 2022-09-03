import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use(req => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// fetch auth
export const signIn = formData => API.post(`/user/signin`, formData);

export const signUp = formData => API.post(`/user/signup`, formData);

export const singleUser = id => API.get(`/user/singleuser/${id}`);

export const updateSingleUser = (id, formData) =>
  API.patch(`/user/updatesingleuser/${id}`, formData);

export const deleteUser = id => API.delete(`/user/deleteuser/${id}`);

export const addCart = formData => API.patch(`/user/addcart`, formData);

export const deleteaCart = (id, cart) => API.patch(`/user/dltcart/${id}`, cart);

export const incrementaCart = (id, data) =>
  API.patch(`/user/increment/${id}`, data);

export const VerifyUser = (id, token) => API.get(`/user/${id}/verify/${token}`);

export const reportData = (userId, reportData) =>
  API.post(`/user/report/${userId}`, reportData);

export const getUsers = () => API.get(`/user/users`);

// fetch homePage
export const getHomePage = () => API.get(`/homepage`);
export const createHomePage = formData => API.post(`/homepage`, formData);
export const deleteHome = id => API.delete(`/homepage/deletehome/${id}`);
export const updateHomePage = (id, formData) =>
  API.patch(`/homepage/${id}`, formData);
// fetch foodPage
export const getFoodPage = foodquery =>
  API.get(
    `/foodpage?page=${foodquery.page}&limit=${foodquery.limit}&sort=${foodquery.sort}&tags=${foodquery.tags}&title[regex]=${foodquery.title}`
  );
export const getFoodBySearch = ({ search, tags }) =>
  API.get(
    `/foodpage/search?searchFood=${search || "none"}&tags=${tags || "none"}`
  );
export const createFoodPage = formData => API.post(`/foodpage`, formData);
export const deleteFood = id => API.delete(`/foodpage/deletefood/${id}`);
export const updateFoodPage = (id, formData) =>
  API.patch(`/foodpage/${id}`, formData);
export const getFoodById = id => API.get(`/foodpage/${id}`);
export const commentFood = (id, formData, updated) =>
  API.patch(`/foodpage/comment/${id}`, formData, updated);
export const deleteCommentFood = (id, cmtuserId) =>
  API.delete(`/foodpage/comment/${id}/${cmtuserId}`);

// fetch roomPage
export const createRoom = formData => API.post("/api/rooms", formData);
export const updateSingleRoom = (id, formData) =>
  API.put(`/api/rooms/${id}`, formData);
export const singleRoomDetails = id => API.get(`/api/rooms/${id}`);
export const deleteRoom = id => API.delete(`/api/rooms/${id}`);
export const createRoomReview = (roomId, review) =>
  API.post(`/api/rooms/${roomId}/reviews`, review);
export const replyRoomReview = (roomId, reviewId, reply) =>
  API.put(`/api/rooms/${roomId}/${reviewId}/reply`, { reply });

// Book room
export const bookRoom = (formData, id) =>
  API.post(`/api/booked/rooms/${id}`, formData);
export const allBookedRooms = () => API.get("/api/booked/rooms");
export const myBookedRooms = () => API.get("/api/booked/rooms/my/own");
export const roomBookedDetails = id => API.get(`/api/booked/rooms/${id}`);
export const roomBookedApprove = id =>
  API.put(`/api/booked/rooms/${id}/approve`);
export const roomBookedPayment = id =>
  API.put(`/api/booked/rooms/${id}/payment`);
export const deleteBookedRooms = id => API.delete(`/api/booked/rooms/${id}`);

// Contact Us Page
export const contactUs = formData => API.post("/api/contact", formData);
export const listContactUs = () => API.get("/api/contact");
export const contactUsResolve = id => API.put(`/api/contact/${id}/resolve`);
export const deleteContactUs = id => API.delete(`/api/contact/${id}`);

// fetch Payment
export const getPayment = () => API.get(`/payment`);
export const getPaymentClient = () => API.get(`/payment/client`);
export const createPayment = formData => API.post(`/payment`, formData);
export const StatusPayment = id => API.patch(`/payment/${id}`);
export const deletePaymentByUser = id => API.delete(`/payment/${id}`);
