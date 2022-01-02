import { useEffect, useState } from "react";
import PageContainer from "../../components/UI/PageContainer";
import PageHeader from "../../components/UI/PageHeader";
import Loader from "../../components/UI/Loader";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Activity from "../../components/Activity/Activity";
import { Paper, Typography } from "@material-ui/core";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "activities");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => documents.push({ ...doc.data(), id: doc.id }));
      setActivities(documents);
      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <>
      <PageHeader title="Activity history" subTitle="Latest Transactions" />
      <PageContainer>
        {loading && <Loader />}

        <Typography variant="p" gutterBottom>
          All Activities
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
          {activities &&
            activities.map((activity) => (
              <Activity
                activity={activity.message}
                date={activity.createdAt.toDate()}
                key={activity.id}
              />
            ))}
        </Paper>
      </PageContainer>
    </>
  );
};

export default Activities;
