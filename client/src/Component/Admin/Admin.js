import React from "react";
import HomePageForm from "./homePageAdmin/HomePageForm/homePageForm.js";
import HomePagePost from "./homePageAdmin/homePagePost/slider";
import { Grow, Grid, Paper } from "@material-ui/core";
import ClientHomePost from "../Client/homePage/homePost";
import Drawer from "./Drawer/drawer.js";

const AdminPage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user?.result.role) {
    return <ClientHomePost />;
  }
  return (
    <Grow in={true}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        style={{
          backgroundImage: "linear-gradient(to right, #fdfbfb, #ebedee)",
          padding: "0px",
          margin: "0px",
        }}
        spacing={0}
      >
        <Grid item xs={2} sm={2} md={3}>
          <Drawer />
        </Grid>
        <Grid item xs={10} sm={10} md={9}>
          <Paper
            style={{
              margin: "0px",
              padding: "0px",
            }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <HomePageForm />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <HomePagePost />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default AdminPage;
