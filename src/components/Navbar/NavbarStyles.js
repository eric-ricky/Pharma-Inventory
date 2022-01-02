import { AppBar, makeStyles, styled } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: theme.shadows[2],
  },
  menuBtn: {
    color: "black",
  },
  toolbar: {
    padding: "0 2rem 0 20rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 2rem",
    },
  },
  email: {
    fontSize: "14px",
    color: "#fec1cd",
    marginLeft: theme.spacing(1),
  },
}));

export const MainNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  color: "#000",
}));
