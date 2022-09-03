import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import Auth from "./Component/Admin/Auth/Auth";
import Verify from "./Component/Admin/Auth/Verify";
import AllUser from "./Component/Admin/Users/allUser/index";
import Spammer from "./Component/Admin/Users/spam/index";
import UserDetail from "./Component/Client/UserDetail/userProfile";
import AddToCart from "./Component/Client/UserDetail/addToCart/addToCart";
import HomePageForm from "./Component/Admin/homePageAdmin/Admin";
import FoodPage from "./Component/Admin/foodPageAdmin/foodAdmin";
import NavBar from "./Component/Extra/navBar/navBar";
import Footer from "./Component/Extra/Footer/footer";
import PageNotFound from "./Component/Extra/pageNotFound";
import UserHistory from "./Component/Client/UserDetail/Paymenthistory/paymentHistory";
import FoodById from "./Component/Client/foodPage/extraFeature/foodbyId/foodById";
import AdminRoomScreen from "./Component/Admin/AdminScreens/Rooms/roomAdmin";
import RoomBook from "./Component/Client/ClientScreens/Rooms/RoomBook";
import RoomBookedList from "./Component/Admin/AdminScreens/Rooms/RoomBookedList";
import RoomBookedDetails from "./Component/Client/ClientScreens/Rooms/RoomBookedDetails";
import RoomDetails from "./Component/Client/ClientScreens/Rooms/RoomDetails";
import "./bootstrap.min.css";
import ContactUs from "./Component/Client/ClientScreens/ContactUs/ContactUsAdmin";
import ContactUsListScreen from "./Component/Admin/AdminScreens/ContactUs/ContactUsAdmin";
import BookingListClient from "./Component/Client/ClientScreens/Rooms/BookingListClient";

import { gapi } from "gapi-script";
import ReviewReply from "./Component/Client/ClientScreens/Rooms/ReviewReply";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  React.useEffect(() => {
    return () => {
      gapi.load("client:auth2", () => {
        gapi.client.getAuthInstance({
          clientId:
            "426614789973-umcv7inmjg49cprhasmtmiu1q1j705s2.apps.googleusercontent.com",
          scope: "profile email",
        });
      });
    };
  }, []);
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Container
          maxWidth="xl"
          style={{
            margin: "0px",
            padding: "0px",
            overflow: "hidden",
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/home" element={<HomePageForm />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/food/:id" element={<FoodById />} />
            <Route path="/" exact element={<Navigate to="/home" />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/users" exact element={<AllUser />} />
            <Route path="/spam" exact element={<Spammer />} />
            <Route path="/profile" element={<UserDetail />} />
            <Route path="/history" element={<UserHistory />} />
            <Route path="/user/:id/verify/:token" exact element={<Verify />} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/payment" element={<AddToCart />} />
            {/* <Route path="/room" element={<AdminRoomScreen />} />
            <Route path="/search/:keyword" element={<AdminRoomScreen />} /> */}
            {/* <Route path="room?sort" element={<AdminRoomScreen />} />
            <Route path={`/:id/book/room`} element={<RoomBook />} />
            <Route path="/list/book/room" element={<RoomBookedList />} />
            <Route
              path="/room/book/:id/details"
              element={<RoomBookedDetails />}
            /> */}
            {/* <Route path="/list/myBooking" element={<BookingListClient />} /> */}
            {/* <Route path="/contact" element={<ContactUs />} />
            <Route path="/contact/list" element={<ContactUsListScreen />} />
            <Route path={`/:id/details/room`} element={<RoomDetails />} />
            <Route
              path={`/reply/review/:roomId/:reviewId`}
              element={<ReviewReply />}
            /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {(user?.result?.role === 1) ? <></> : !user ? <Footer /> : user?.result?.role === 0 && <Footer />}
        </Container>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default App;
