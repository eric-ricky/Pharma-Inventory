import React from "react";
import { Box, Divider, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

import { Form, useForm } from "../../hooks/useForm";

import Button from "../UI/Button";
import Loader from "../UI/Loader";
import Select from "../UI/form-controls/Select";
import Input from "../UI/form-controls/Input";

import IMG from "../../image/drug.jpg";

const initialValues = {
  quantity: 0,
  newQuantity: 0,
  reason: "",
};

const editReasons = [
  { id: "1", name: "sold", title: "Sold" },
  { id: "2", name: "restocked", title: "Restocked" },
];

const DrugsEditForm = (props) => {
  const { addOrEdit, record, loading } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("quantity" in fieldValues) {
      temp.quantity = fieldValues.quantity ? "" : "This field is required.";
    }

    if ("reason" in fieldValues)
      temp.reason = fieldValues.reason ? "" : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const finalValues = {
        ...values,
        newQuantity: +record.quantity + +values.quantity,
        sold:
          +values.quantity < 0
            ? Math.abs(+values.quantity) + +record.sold
            : record.sold,
      };
      addOrEdit(finalValues, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Loader />}

      <Box>
        <Box sx={{ display: "flex", gap: 2, marginBottom: "2rem" }}>
          <img
            src={IMG}
            alt="product picture"
            height="75px"
            width="100px"
            style={{ marginRight: "10px" }}
          />

          <div>
            <h2>{record?.name}</h2>
            <p>
              {record?.quantity} units | KES {record?.totalValue}
            </p>
          </div>
        </Box>

        <Divider style={{ marginTop: "2rem", marginBottom: "2.5rem" }} />

        <Box sx={{ display: "flex" }}>
          <IconButton
            onClick={() => {
              setValues({
                ...values,
                quantity: --values.quantity,
                newQuantity: +record.quantity + +values.quantity,
              });
            }}
          >
            <Remove fontSize="small" />
          </IconButton>

          <Input
            type="number"
            name="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleInputChange}
            error={errors.quantity}
          />

          <IconButton
            onClick={() => {
              setValues({
                ...values,
                quantity: ++values.quantity,
                newQuantity: +record.quantity + +values.quantity,
              });
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>

        <Input
          name="newQuantity"
          label="New Quantity"
          value={
            +record.quantity + +values.quantity < 0
              ? "Invalid"
              : +record.quantity + +values.quantity
          }
          disabled={true}
          error=""
        />

        <Select
          name="reason"
          label="Reason(optional)"
          value={values.reason}
          onChange={handleInputChange}
          options={editReasons}
          error={errors.reason}
        />
      </Box>

      <Divider style={{ marginTop: "2rem", marginBottom: "2.5rem" }} />

      <div>
        <Button type="submit" text={loading ? "Updating..." : "Update"} />
        <Button text="Reset" color="default" onClick={resetForm} />
      </div>
    </Form>
  );
};

export default DrugsEditForm;
