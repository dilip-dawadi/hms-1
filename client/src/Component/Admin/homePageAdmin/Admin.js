import React from "react";
import HomePageForm from "./HomePageForm/homePageForm.js";
import HomePagePost from "./homePagePost/slider";
import { Grid, Paper } from "@material-ui/core";
import ClientHomePost from "../../Client/homePage/homePost";
import Drawer from "../Drawer/drawer.js";
const AdminPage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [updateHomeCurrentId, setupdateHomeCurrentId] = React.useState(null);
  if (!user?.result?.role) {
    return <ClientHomePost />;
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
          backgroundRepeat: "no-repeat",
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
            marginTop: "70px",
          }}
          spacing={0}
        >
          <Grid item xs={2} sm={2} md={2}>
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
                <HomePageForm
                  updateHomeCurrentId={updateHomeCurrentId}
                  setupdateHomeCurrentId={setupdateHomeCurrentId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <HomePagePost setupdateHomeCurrentId={setupdateHomeCurrentId} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Grid>
    // </Grow>
  );
};

export default AdminPage;
