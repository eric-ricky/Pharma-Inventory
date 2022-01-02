import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  activity: {
    borderBottom: "2px solid #ccc",
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));

const Activity = (props) => {
  const { activity, date, ...other } = props;
  const classes = useStyles();

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "2px solid #ccc",
      }}
      className={classes.activity}
    >
      <Typography variant="body2" style={{ width: mdDown ? "75%" : "90%" }}>
        {activity}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="body2" style={{ fontWeight: 700 }}>
        <Moment fromNow>{date}</Moment>
      </Typography>
    </Box>
  );
};

export default Activity;
