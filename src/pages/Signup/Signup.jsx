import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Checkbox,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { db, auth, provider } from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Google as GoogleIcon } from "../../icons/google";
import { Facebook as FacebookIcon } from "../../icons/facebook";

const Signup = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: null,
    sucess: null,
    loading: false,
  });
  const { firstName, lastName, email, password, error, success, loading } =
    data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setData({ ...data, error: null, loading: true });

    // Validating input
    if (!firstName || !lastName || !email || !password) {
      setData({ ...data, error: "All fields are required" });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      });

      // saving user info in firestore
      const docRef = doc(db, "users", result.user.uid);
      const payload = {
        uid: result.user.uid,
        firstName,
        lastName,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await setDoc(docRef, payload);

      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: null,
        success: "You've signed up successfully",
        loading: false,
      });

      // redirecting to home
      history.replace("/");
    } catch (error) {
      setData({ ...data, error: error.message });
      console.log(error);
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
      {/* <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          // flexGrow: 1,
          minHeight: "100%",
        }}
      > */}
      <form onSubmit={submitHandler}>
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography color="textPrimary" variant="h4">
            Sign Up
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Create a new account
          </Typography>
        </Box>

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
            style={{
              background: "#64b5f6",
              marginTop: "1rem",
              color: "#fff",
            }}
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
            or use your email to create a new account
          </Typography>
        </Box>
        <TextField
          fullWidth
          onChange={changeHandler}
          label="First Name"
          margin="normal"
          variant="outlined"
          name="firstName"
          value={firstName}
        />
        <TextField
          fullWidth
          onChange={changeHandler}
          label="Last Name"
          margin="normal"
          variant="outlined"
          name="lastName"
          value={lastName}
        />
        <TextField
          fullWidth
          onChange={changeHandler}
          label="Email Address"
          margin="normal"
          type="email"
          variant="outlined"
          name="email"
          value={email}
        />
        <OutlinedInput
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          value={password}
          onChange={changeHandler}
          type={showPassword ? "text" : "password"}
          variant="outlined"
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
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: -1,
          }}
        >
          <Checkbox name="policy" />
          <Typography color="textSecondary" variant="body2">
            I have read the <Link to="/">Terms and Conditions</Link>
          </Typography>
        </Box>

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
            {loading ? "Loading.." : "Sign Up Now"}
          </Button>
        </Box>
        <Typography color="textSecondary" variant="body2">
          Have an account? <Link to="/login">Sign In</Link>
        </Typography>
      </form>
    </Box>
    // </Box>
  );
};

export default Signup;
