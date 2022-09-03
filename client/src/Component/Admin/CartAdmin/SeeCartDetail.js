import React from "react";
import ClientCart from "../../Client/UserDetail/addToCart/addToCart";
import AdminCartDetail from "./payment";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Drawered from "../Drawer/drawer";
const SeeCartDetail = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user?.result?.role) {
    return <ClientCart />;
  }

  return (
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
            marginTop: "70px",
          }}
          spacing={0}
        >
          <Grid item xs={2} sm={2} md={2}>
            <Drawered />
          </Grid>
          <Grid item xs={10} sm={10} md={10}>
            <AdminCartDetail />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default SeeCartDetail;
