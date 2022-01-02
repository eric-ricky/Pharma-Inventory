import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const Login = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
    loading: false,
    success: null,
    error: null,
  });
  const { email, password, loading, success, error } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setData({ ...data, loading: true });

    // input validation
    if (!email || !password) {
      setData({ ...data, error: "All fields are needed" });
      return;
    }

    try {
      // loging in user
      await signInWithEmailAndPassword(auth, email, password);

      setData({
        email: "",
        password: "",
        loading: false,
        success: "Login Successfully",
        error: null,
      });

      dispatch(
        uiActions.setNotification({
          isOpen: true,
          message: "Login successfully",
          status: "success",
        })
      );

      // redirecting to home
      history.replace("/");
    } catch (error) {
      setData({ ...data, loading: false, error: error.message });
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        paddingX: lgUp ? 0 : theme.spacing(0.5),
      }}
    >
      <form onSubmit={submitHandler}>
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography color="textPrimary" variant="h4">
            Sign in
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Sign in on the internal platform
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          name="email"
          value={email}
          onChange={changeHandler}
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          value={password}
          onChange={changeHandler}
          type="password"
          variant="outlined"
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" variant="body2">
            {success}
          </Typography>
        )}

        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {loading ? "Signing..." : "Sign In Now"}
          </Button>
        </Box>
        <Typography
          style={{ textAlign: "center" }}
          color="textSecondary"
          variant="body2"
        >
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
