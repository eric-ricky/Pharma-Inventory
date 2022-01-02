import React from "react";
import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

const Notification = (props) => {
  const dispatch = useDispatch();
  const { notification } = props;

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(uiActions.setNotification({ ...notification, isOpen: false }));
  };

  return (
    <Snackbar
      className={classes.root}
      open={notification?.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notification?.status} onClose={handleClose}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
