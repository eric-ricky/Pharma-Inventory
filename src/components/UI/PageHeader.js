import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    display: "flex",
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(12),
    [theme.breakpoints.up("lg")]: {
      marginLeft: "20%",
      marginRight: "5%",
    },
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

const PageHeader = (props) => {
  const classes = useStyles();
  const { title, subTitle } = props;

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <div className={classes.pageTitle}>
          <Typography variant="h4" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
