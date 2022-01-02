import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
      marginLeft: "20%",
      marginRight: "5%",
    },
  },
}));

const PageContainer = (props) => {
  const classes = useStyles();
  const { children } = props;
  return <Box className={classes.root}>{children}</Box>;
};

export default PageContainer;
