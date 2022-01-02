import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Activity from "../Activity/Activity";

const Recentactivities = () => {
  const theme = useTheme();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "activities");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => documents.push({ ...doc.data(), id: doc.id }));

      if (documents.length > 5) {
        documents = documents.slice(0, 5);
      }

      setActivities(documents);
      setLoading(false);
    });

    return unsub;
  }, []);
  return (
    <Box
      component="div"
      sx={{ marginBottom: theme.spacing(10), marginTop: theme.spacing(5) }}
    >
      <Typography variant="p" gutterBottom>
        Recent Activities
      </Typography>

      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {activities &&
          activities.map((activity) => (
            <Activity
              activity={activity.message}
              date={activity.createdAt.toDate()}
              key={activity.id}
            />
          ))}
      </Paper>

      <Typography align="center" mt={5}>
        <Link to="/activities">View all activities</Link>
      </Typography>
    </Box>
  );
};

export default Recentactivities;
