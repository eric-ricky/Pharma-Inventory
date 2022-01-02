import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  Box,
  Divider,
  List,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  Close,
  AccountCircle,
  ExitToApp,
  History,
  Home,
  Storefront,
  PersonAdd,
  LockOutlined,
} from "@material-ui/icons";
import { useStyles } from "./SidebarStyles";
import NavItem from "../Navitem/Navitem";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../context/auth-context";

const items = [
  {
    href: "/",
    icon: <Home fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/drugs",
    icon: <Storefront fontSize="small" />,
    title: "Drugs",
  },
  {
    href: "/activities",
    icon: <History fontSize="small" />,
    title: "Activity History",
  },
  {
    href: "/account",
    icon: <AccountCircle fontSize="small" />,
    title: "Account",
  },
];

const Sidebar = (props) => {
  const { user } = useContext(AuthContext);

  const { isOpen, closeHandler } = props;
  const classes = useStyles();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const history = useHistory();

  const logoutHandler = async () => {
    alert("Are you sure you want to log out?");
    try {
      await signOut(auth);
      console.log("signed out");
      history.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const content = (
    <Box
      sx={{
        px: 2,
        bgcolor: "neutral.900",
        width: "100%",
        height: "100%",
      }}
      className={classes.container}
    >
      <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          className={classes.logo}
          variant="h5"
          noWrap
          color="neutral.500"
        >
          PHARMA
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {!lgUp && (
          <IconButton onClick={closeHandler} className={classes.close}>
            <Close fontSize="large" />
          </IconButton>
        )}
      </Box>

      <Divider
        style={{
          marginTop: "16px",
          marginBottom: "32px",
          background: "#404652",
        }}
      />

      <List>
        {user &&
          items.map((item) => (
            <NavItem
              key={item.title}
              title={item.title}
              href={item.href}
              icon={item.icon}
              closeHandler={closeHandler}
            />
          ))}

        {user && (
          <Button
            className={classes.icon}
            component="a"
            startIcon={<ExitToApp fontSize="small" />}
            disableRipple
            onClick={logoutHandler}
            style={{
              backgroundColor: "rgba(255,255,255, 0.0)",
              borderRadius: 2,
              color: "#fff",
              fontWeight: "fontWeightBold",
              justifyContent: "flex-start",
              px: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: "#f50057",
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }} className="menuText">
              Logout
            </Box>
          </Button>
        )}

        {!user && (
          <>
            <NavItem
              title="Sign Up"
              href="/sign-up"
              icon={<PersonAdd fontSize="small" />}
              closeHandler={closeHandler}
            />
            <NavItem
              title="Login"
              href="/login"
              icon={<LockOutlined fontSize="small" />}
              closeHandler={closeHandler}
            />
          </>
        )}
      </List>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        paperProps={{
          sx: {
            backgroundColor: "#111827",
            color: "#fff",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={closeHandler}
      open={isOpen}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: 500 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
