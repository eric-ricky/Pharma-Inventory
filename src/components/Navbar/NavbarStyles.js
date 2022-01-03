import { AppBar, makeStyles, styled } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: theme.shadows[0],
  },
  menuBtn: {
    color: "#B39DDB",
  },
  toolbar: {
    padding: "0 2rem 0 20rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 2rem",
    },
  },
}));

export const MainNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[0],
  color: "#673AB7",
}));
