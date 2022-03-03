import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { MenuRounded, Notifications, LocalLibrary } from "@material-ui/icons";
import { useStyles, MainNavbar } from "./NavbarStyles";

import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

const Navbar = (props) => {
  const [user] = useAuthState(auth);

  const history = useHistory();

  const { openHandler } = props;

  const classes = useStyles();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <MainNavbar
      sx={{
        paddingLeft: "100px",
        left: {
          lg: 280,
        },
        width: {
          lg: "calc(100vw - 280px)",
        },
      }}
    >
      <Toolbar
        disableGutters
        className={classes.toolbar}
        sx={{
          minHeight: 64,
          left: 0,
          px: 4,
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {!lgUp && (
          <IconButton
            onClick={openHandler}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              ml: 2,
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuRounded className={classes.menuBtn} fontSize="large" />
          </IconButton>
        )}

        {lgUp && (
          <Box
            style={{
              paddingLeft: "1.675rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocalLibrary />
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="textSecondary"
              style={{ fontSize: "18px", fontWeight: "700" }}
            >
              Goodlife Pharmacy
            </Typography>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "flex", md: "flex" } }}>
          {!user && (
            <>
              <Box
                disableGutters
                sx={{
                  display: "flex",
                  mb: 0.5,
                  py: 0,
                  px: 2,
                  color: "#123456",
                }}
              >
                <Link to="/sign-up">
                  <Box sx={{ flexGrow: 0 }} className="menuText">
                    Sign Up
                  </Box>
                </Link>
              </Box>

              <Box
                disableGutters
                sx={{
                  mb: 0.5,
                  py: 0,
                  px: 2,
                  color: "#123456",
                }}
              >
                <Link to="/login">
                  <Box sx={{ flexGrow: 1 }} className="menuText">
                    Login
                  </Box>
                </Link>
              </Box>
            </>
          )}

          {user && (
            <>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={1} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={() => history.replace("/account")}
              >
                <Avatar
                  alt="Eric ricky"
                  src="https://images.unsplash.com/photo-1634896941598-b6b500a502a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=456&q=80"
                />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </MainNavbar>
  );
};

export default Navbar;
