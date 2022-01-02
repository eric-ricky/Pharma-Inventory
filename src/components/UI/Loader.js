import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "rgba(255,255,255,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "500",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
