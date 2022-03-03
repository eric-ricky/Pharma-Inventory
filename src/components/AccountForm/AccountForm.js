import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import { Form, useForm } from "../../hooks/useForm";
import Input from "../UI/form-controls/Input";
import Button from "../UI/Button";
import Loader from "../UI/Loader";
import Notification from "../UI/Notification";

let tempValues = { firstName: "", lastName: "", email: "", phoneNumber: "" };

const AccountForm = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const [dataChanged, setDataChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required";

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";

    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required.";

    if ("phoneNumber" in fieldValues)
      temp.phoneNumber = fieldValues.phoneNumber
        ? ""
        : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const unsub = onSnapshot(docRef, (doc) => {
      const data = {
        firstName: doc.data()?.firstName,
        lastName: doc.data()?.lastName,
        email: doc.data()?.email,
        phoneNumber: "",
      };
      setInitialValues(data);
    });

    return unsub;
  }, []);

  useEffect(() => {
    tempValues = initialValues;
  }, [initialValues]);

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    tempValues,
    true,
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const docRef = doc(db, "users", auth.currentUser.uid);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };

    try {
      await updateDoc(docRef, payload);

      setLoading(false);
      dispatch(
        uiActions.setNotification({
          isOpen: true,
          message: "Updated successfully",
          status: "success",
        })
      );
      console.log("updated successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} onChange={() => setDataChanged(true)}>
      {loading && <Loader />}
      <Notification notification={notification} />

      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Input
                fullWidth
                label="First name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                variant="outlined"
                error={errors.firstName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                fullWidth
                label="Last name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                variant="outlined"
                error={errors.lastName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                error={errors.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                fullWidth
                label="Phone number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleInputChange}
                variant="outlined"
                error={errors.phoneNumber}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="default" onClick={resetForm} text="Reset" />
          <Button disabled={!dataChanged} type="submit" text="Save details" />
        </Box>
      </Card>
    </Form>
  );
};

export default AccountForm;
