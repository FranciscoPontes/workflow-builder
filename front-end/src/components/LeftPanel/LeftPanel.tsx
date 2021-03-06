import React from "react";
import ElementList from "./ElementList/ElementList";
import { Box, Typography } from "@mui/material";

const useStyles = {
  leftPanel: {
    bgcolor: "background.paper",
    width: "10vw",
    mr: 2,
    overflow: "auto",
    pb: 20,
    pt: 2,
  },
};

const LeftPanel = () => {
  const classes = useStyles;

  return (
    <Box sx={{ ...classes.leftPanel }}>
      <Typography variant="h6" align="center" sx={{ color: "text.primary" }}>
        Elements
      </Typography>
      <ElementList />
    </Box>
  );
};

export default LeftPanel;
