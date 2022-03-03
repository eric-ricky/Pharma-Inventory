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
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@material-ui/core";
import { auth, provider } from "../../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Google as GoogleIcon } from "../../icons/google";
import { Facebook as FacebookIcon } from "../../icons/facebook";

const Login = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
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

      history.replace("/");
    } catch (error) {
      setData({ ...data, loading: false, error: error.message });
    }
  };

  const signIn = async () => {
    console.log("started...");
    try {
      console.log("Logging...");
      const result = await signInWithPopup(auth, provider);
      console.log("Loged in:", result);
    } catch (error) {
      console.log("error---:", error);
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
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography color="textPrimary" variant="h4">
          Sign in
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Sign in to use the platform
        </Typography>
      </Box>

      <form onSubmit={submitHandler}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Button
            fullWidth
            color="#e57373"
            style={{ background: "#e57373", color: "#fff" }}
            startIcon={<GoogleIcon />}
            onClick={signIn}
            size="large"
            variant="contained"
          >
            Login with Google
          </Button>
          <Button
            fullWidth
            color="#e57373"
            style={{ background: "#64b5f6", marginTop: "1rem", color: "#fff" }}
            startIcon={<FacebookIcon />}
            onClick={signIn}
            size="large"
            variant="contained"
          >
            Login with Facebook
          </Button>
        </Box>

        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography align="center" color="textSecondary" variant="body1">
            or login with email address
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
        <OutlinedInput
          fullWidth
          margin="normal"
          name="password"
          value={password}
          onChange={changeHandler}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((val) => !val)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
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
