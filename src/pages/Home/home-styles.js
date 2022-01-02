import { Box, makeStyles, styled } from "@material-ui/core";

export const HomeContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    marginLeft: "20%",
    marginRight: "5%",
  },
}));

export const useHomeStyles = makeStyles((theme) => ({
  pageHeader: {
    paddingLeft: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
      marginLeft: "20%",
      marginRight: "5%",
    },
  },
}));
