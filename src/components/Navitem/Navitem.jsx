import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Button, ListItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.08)",
      "& .MuiButton-startIcon": {
        color: "#f50057",
      },
      "& .menuText": {
        color: "#f50057",
      },
    },
  },
}));

const NavItem = (props) => {
  const classes = useStyles();
  const { href, icon, title, closeHandler, ...others } = props;
  const location = useLocation();
  const active = href === location.pathname;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Link to={href}>
        <Button
          className={classes.icon}
          component="a"
          startIcon={icon}
          disableRipple
          onClick={closeHandler}
          style={{
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 2,
            color: active ? "#f50057" : "#fff",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "#f50057" : "#9e9e9e",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }} className="menuText">
            {title}
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};

export default NavItem;
