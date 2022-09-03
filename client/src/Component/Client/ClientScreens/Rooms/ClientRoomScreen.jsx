import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminRoomScreen from "../../../Admin/AdminScreens/Rooms/AdminRoomScreen";
import ClientRoomView from "./ClientRoom";
import { listRooms } from "../../../redux/actions/room";

const ClientRoomScreen = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;

  useEffect(() => {
    dispatch(listRooms(keyword));
  }, [dispatch, keyword]);

  if (user?.result.role) {
    return <AdminRoomScreen />;
  }

  return <ClientRoomView />;
};

export default ClientRoomScreen;
