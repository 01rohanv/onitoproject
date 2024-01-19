import React from "react";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Usertable from "./Usertable";

interface FormValues {
  name: string;
  age: number;
  sex: string;
  mobile?: string;
  govtIdType?: string;
  govtId?: string;
  govtIdPan?: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be min 3 character"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Must be positive")
    .integer("Must be integer"),
  sex: yup.string().required("Sex is required"),
  mobile: yup
    .string()
    .matches(/^([9]{1})([234789]{1})([0-9]{8})$/, "enter valid indian number"),
  govtIdType: yup.string(),
  govtId: yup
    .string()
    .matches(
      /^[2-9]\d{11}$/,
      "Enter 12 digit numeric value not starting with 0 and 1"
    ),
  govtIdPan: yup
    .string()
    .matches(/^[a-zA-Z0-9]{10}$/, "Enter 10 character alpha numeric string"),
});

interface Step1FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const Step1Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
  });

  const govtIdType = useWatch({
    control,
    name: "govtIdType",
  });
  return (
    <>
      <h1>Personal Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: "10px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      {...field}
                      fullWidth
                      error={!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Age"
                      {...field}
                      fullWidth
                      error={!errors.age}
                      helperText={errors.age?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl error={!errors.sex} fullWidth>
                  <InputLabel id="sex-label">Sex</InputLabel>
                  <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                      <Select labelId="sex-label" label="Sex" {...field}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.sex?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Mobile"
                      {...field}
                      fullWidth
                      error={!errors.mobile}
                      helperText={errors.mobile?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl error={!errors.govtIdType} fullWidth>
                  <InputLabel id="govtIdType-label">GovtIdType</InputLabel>
                  <Controller
                    name="govtIdType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="govtIdType-label"
                        label="govtIdType"
                        {...field}
                      >
                        <MenuItem value="aadhar">Aadhar</MenuItem>
                        <MenuItem value="pancard">PanCard</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.govtIdType?.message}</FormHelperText>
                </FormControl>
              </Grid>
              {govtIdType === "aadhar" ? (
                <Grid item xs={4}>
                  <Controller
                    name="govtId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label=""
                        {...field}
                        fullWidth
                        error={!errors.govtId}
                        helperText={errors.govtId?.message}
                      />
                    )}
                  />
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Controller
                    name="govtIdPan"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label=""
                        {...field}
                        fullWidth
                        error={!errors.govtIdPan}
                        helperText={errors.govtIdPan?.message}
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
          <Button
            type="submit"
            sx={{
              display: "block",
              margin: "auto",
              border: "1px solid blue",
              marginTop: "2rem",
            }}
          >
            Next
          </Button>
        </Box>
      </form>
      <Box sx={{ marginTop: "2rem" }}>
        <h1>Data Table</h1>
        <Usertable />
      </Box>
    </>
  );
};

export default Step1Form;
