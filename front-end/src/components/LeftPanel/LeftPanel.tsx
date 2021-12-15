import React from "react";
import { createStyles, Theme, makeStyles } from "@mui/styles";
import ElementList from "./ElementList/ElementList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftPanel: {
      backgroundColor: "#d6d6d6",
      width: "20vh",
      marginRight: "20px",
      overflowY: "auto",
      // boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgb(0 0 0 / 0%)",
      textAlign: "center",
      height: "fit-content",
      paddingBottom: "20px",
    },
  })
);
const LeftPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.leftPanel}>
      <h4>Elements</h4>
      <ElementList />
    </div>
  );
};

export default LeftPanel;
