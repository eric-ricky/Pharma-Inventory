import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import DrugsForm from "../../components/DrugsForm/DrugsForm";
import PageContainer from "../../components/UI/PageContainer";
import PageHeader from "../../components/UI/PageHeader";
import Popup from "../../components/UI/Popup";
import Button from "../../components/UI/Button";
import Notification from "../../components/UI/Notification";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";

import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import DrugsTable from "../../components/DrugsList/DrugsTable";

const Drugs = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [curUser, setCurUser] = useState();

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      setCurUser(docSnap.data());
    });
  }, []);

  const addOrEdit = async (values, resetForm) => {
    setLoading(true);
    const recordsRef = collection(db, "drugs");
    const activityRef = collection(db, "activities");

    try {
      await addDoc(recordsRef, values);
      await addDoc(activityRef, {
        message: `${curUser.firstName} added a drug (${values.drugName})`,
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: auth.currentUser.uid,
      });

      setLoading(false);
      resetForm();
      setOpenPopup(false);
      dispatch(
        uiActions.setNotification({
          isOpen: true,
          message: "Submitted successfully",
          status: "success",
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Drugs" subTitle="" />
      <PageContainer>
        <Box sx={{ display: "flex", mb: 2 }}>
          <Box sx={{ flexGrow: 1 }} />

          <Button text="Add New" onClick={() => setOpenPopup(true)} />
        </Box>

        <Notification notification={notification} />

        <DrugsTable />

        <Popup
          title="Drugs Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <DrugsForm addOrEdit={addOrEdit} loading={loading} />
        </Popup>
      </PageContainer>
    </>
  );
};

export default Drugs;
