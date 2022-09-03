import React from "react";
import AdminRoomScreen from "./AdminRoomScreen";
import { Grid, Paper } from "@material-ui/core";
import Drawer from "../../Drawer/drawer";
import ClientRoomScreen from "../../../Client/ClientScreens/Rooms/ClientRoomScreen";
// import ClientFoodPage from '../../Client/foodPage/clientFoodPage';
const RoomAdminPage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user?.result?.role) {
    return <ClientRoomScreen />;
  }
  return (
    // <Grow in={true}>
    <Grid
      container
      style={{
        padding: "0px",
        margin: "0px",
      }}
    >
      <div
        style={{
          backgroundImage: "url(/prabandhak.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          height: "100%",
          width: "100%",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          style={{
            padding: "0px",
            marginTop: "0px",
          }}
          spacing={0}
        >
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            style={{
              marginTop: "70px",
            }}
          >
            <Drawer />
          </Grid>
          <Grid item xs={10} sm={10} md={10}>
            <Paper
              style={{
                margin: "0px",
                padding: "0px",
              }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <AdminRoomScreen />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Grid>
    // </Grow>
  );
};

export default RoomAdminPage;
