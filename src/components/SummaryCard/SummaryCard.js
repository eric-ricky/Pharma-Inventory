import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    padding: theme.spacing(0.5),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cardContent: {
    justifySelf: "center",
    height: "100%",
    width: "100%",
  },
  gridContainer: {
    justifyContent: "space-between",
  },
  avatar: {
    background: (props) => props.color,
  },
}));

const SummaryCard = (props) => {
  const classes = useStyles(props);
  const { title, value, icon } = props;
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {value}
            </Typography>
          </Grid>

          <Grid item>
            <Avatar
              className={classes.avatar}
              sx={{
                backgroundColor: "#123efc",
                height: 56,
                width: 56,
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
