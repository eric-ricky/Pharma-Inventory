import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    paddingTop: theme.spacing(10),
    backgroundColor: "#111827",
    padding: theme.spacing(7),
  },
  logo: {
    color: "#fff",
    fontWeight: 900,
  },
  close: {
    color: "#fff",
  },
  listItem: {
    color: "#fff",
    borderRadius: "10px",
    "&:hover": {
      background: "#404652",
      color: "#f50057 !important",
    },
  },
  active: {
    background: "#404652",
    color: "#f50057",
  },
  icon: {
    color: "#9e9e9e",
    "&:hover": {
      color: "#f50057",
    },
  },
  menutext: {
    "&:hover": {
      color: "#f50057",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));
