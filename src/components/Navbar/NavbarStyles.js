import { AppBar, makeStyles, styled } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: theme.shadows[0],
    background: "#FFF",
  },
  menuBtn: {
    color: "#B39DDB",
  },
  toolbar: {
    padding: "0 2rem 0 20rem",
    // boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",

    [theme.breakpoints.down("md")]: {
      padding: "0 2rem",
    },
  },
}));

export const MainNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundColor: "#111227",
  boxShadow: theme.shadows[1],
  color: "#673AB7",
  color: "#fff",
}));
