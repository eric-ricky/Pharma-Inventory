import React from "react";
import { Box, Grid, InputAdornment } from "@material-ui/core";
import { Form, useForm } from "../../hooks/useForm";
import Input from "../UI/form-controls/Input";
import Button from "../UI/Button";
import Loader from "../UI/Loader";

const initialValues = {
  drugName: "",
  description: "",
  quantity: 0,
  minLevel: 0,
  price: 0,
};

const DrugsForm = (props) => {
  const { addOrEdit, loading } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("drugName" in fieldValues)
      temp.drugName = fieldValues.drugName ? "" : "This field is required";
    if ("quantity" in fieldValues)
      temp.quantity = fieldValues.quantity ? "" : "This field is required.";

    if ("minLevel" in fieldValues)
      temp.minLevel = fieldValues.minLevel ? "" : "This field is required.";

    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is required.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const finalValues = {
        ...values,
        totalValue: values.quantity * values.price,
        sold: 0,
      };
      addOrEdit(finalValues, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Loader />}

      <Grid container>
        <Grid item sm={6}>
          <Input
            name="drugName"
            label="Drug Name"
            value={values.drugName}
            onChange={handleInputChange}
            error={errors.drugName}
          />
          <Input
            name="description"
            label="Description(optional)"
            value={values.description}
            multiline={true}
            rows={4}
            onChange={handleInputChange}
            error=""
          />
        </Grid>

        <Grid item sm={6}>
          <Box sx={{ display: "flex" }}>
            <Input
              type="number"
              name="quantity"
              label="Quantity"
              value={values.quantity}
              onChange={handleInputChange}
              error={errors.quantity}
            />
            <Input
              type="number"
              name="minLevel"
              label="MinLevel"
              value={values.minLevel}
              onChange={handleInputChange}
              error={errors.minLevel}
            />
          </Box>

          <Box sx={{ display: "flex" }}>
            <Input
              type="number"
              name="price"
              label="Price"
              value={values.price}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">KES</InputAdornment>
              }
              error={errors.price}
            />
            <Input
              name="minLevel"
              label="Total Value"
              value={`KES ${values.quantity * values.price}`}
              disabled={true}
              error=""
            />
          </Box>

          <div>
            <Button type="submit" text={loading ? "Loading..." : "Submit"} />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default DrugsForm;
