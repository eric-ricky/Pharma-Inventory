import React from "react";
import { useSelector } from "react-redux";

import Sumaryinfo from "../../components/SumaryInfo/SumaryInfo";
import Recentactivities from "../../components/RecentActivities/RecentActivities";
import PageHeader from "../../components/UI/PageHeader";
import PageContainer from "../../components/UI/PageContainer";
import Notification from "../../components/UI/Notification";

const Home = () => {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <>
      <PageHeader title="Dashboard" subTitle="ALL products summary" />

      <PageContainer>
        <Notification notification={notification} />
        <Sumaryinfo />

        <Recentactivities />
      </PageContainer>
    </>
  );
};

export default Home;
