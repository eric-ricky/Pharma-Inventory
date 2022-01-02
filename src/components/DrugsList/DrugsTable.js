import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";

import MaterialTable from "material-table";
import { Box } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import DrugsEditForm from "../DrugsEditForm/DrugsEditForm";
import Notification from "../UI/Notification";
import Loader from "../UI/Loader";
import Popup from "../UI/Popup";

const DrugsTable = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [tableData, setTableData] = useState([]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
    { title: "Quantity", field: "quantity" },
    { title: "Price", field: "price" },
    { title: "Total Value", field: "totalValue" },
  ];

  const [curUser, setCurUser] = useState();

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      setCurUser(docSnap.data());
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "drugs");
    const unsub = onSnapshot(colRef, (snap) => {
      let temp = [];
      let documents = [];
      snap.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));

      temp.forEach((doc) =>
        documents.push({
          name: doc.drugName,
          description: doc.description,
          quantity: +doc.quantity,
          price: doc.price,
          totalValue: doc.totalValue,
          id: doc.id,
          sold: doc.sold,
        })
      );

      setTableData(documents);
      setLoading(false);
    });

    return unsub;
  }, []);

  const addOrEdit = async (values, resetForm) => {
    setFormLoading(true);

    const id = selectedData.id;
    const docRef = doc(db, "drugs", id);
    const activityRef = collection(db, "activities");

    try {
      const payload = {
        quantity: values.newQuantity,
        sold: values.sold,
      };

      await updateDoc(docRef, payload);
      await addDoc(activityRef, {
        message: `${curUser.firstName} ${
          values.quantity < 0 ? "decreased" : "increased"
        } ${selectedData.name} by ${Math.abs(values.quantity)}`,
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: auth.currentUser.uid,
      });

      console.log(
        `${curUser.firstName} ${
          values.quantity < 0 ? "decreased" : "increased"
        } ${selectedData.name} by ${values.quantity}`
      );

      setFormLoading(false);
      resetForm();
      setOpenPopup(false);
      dispatch(
        uiActions.setNotification({
          isOpen: true,
          message: "Updated successfully",
          status: "success",
        })
      );

      console.log("updated successfully");
    } catch (error) {
      setFormLoading(false);
      setOpenPopup(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Notification notification={notification} />

      <MaterialTable
        title="Drugs Table"
        columns={columns}
        data={tableData}
        actions={[
          {
            icon: () => (
              <Box>
                <Edit />
              </Box>
            ),
            tooltip: "Edit Quantity",
            onClick: (e, data) => {
              console.log(data);
              setOpenPopup(true);
              setSelectedData(data);
            },
          },
        ]}
        options={{
          sorting: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: true,
          exportAllData: true,
          actionsColumnIndex: -1,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#757ce8", color: "#fff" },
        }}
      />

      <Popup
        title="Update Quantity"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {selectedData && (
          <>
            <DrugsEditForm
              record={selectedData}
              addOrEdit={addOrEdit}
              loading={formLoading}
            />
          </>
        )}
      </Popup>
    </>
  );
};

export default DrugsTable;
