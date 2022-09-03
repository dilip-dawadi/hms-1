import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  container: {
    padding: "0.5rem 1rem",
  },
  media: {
    width: "100%",
    height: "250px",
    ObjectFit: "contain",
    ObjectPosition: "center",
    borderRadius: "0px 0px 4px 4px",
    ["@media (max-width:350px)"]: {
      height: "220px",
    },
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: "20px",
    marginTop: "20px",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    padding: "5px 17px 15px 17px",
  },
  title: {
    color: "gray",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "16px 15px 4px 15px",
  },
  cartTitle: {
    padding: "5px 17px 15px 17px",
    fontSize: "15px",
    color: "#A2816C",
  },
  cardActionsI: {
    display: "grid",
    margin: "10px",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  btn: {
    textTransform: "capitalize",
    padding: "0.4rem 0.7rem",
    letterSpacing: "1px",
    fontSize: "14px",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    backgroundColor: "#595775",
    "&:hover": {
      backgroundColor: "#595775",
    },
  },
}));
