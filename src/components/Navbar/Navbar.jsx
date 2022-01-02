import React, { useContext } from "react";
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
import { Mail, MenuRounded, Notifications } from "@material-ui/icons";
import { useStyles, MainNavbar } from "./NavbarStyles";
import { AuthContext } from "../../context/auth-context";

import { Link, useHistory } from "react-router-dom";

const Navbar = (props) => {
  const { user } = useContext(AuthContext);

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
            <MenuRounded
              className={classes.menuBtn}
              fontSize="small"
              sx={{ bgColor: "secondary" }}
            />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div" color="textSecondary">
          PHARMA
        </Typography>

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
                  // display: "flex",
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
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <Mail color="#000" />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
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
                <Avatar alt="Eric ricky" src="" />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </MainNavbar>
  );
};

export default Navbar;
