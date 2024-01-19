import React from "react";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
  address?: string;
  state?: string;
  city?: string;
  country: string;
  pincode: string;
}

const schema = yup.object().shape({
  country: yup.string().required("Country is required"),

  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d+$/, "Pincode must be numeric"),
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
});

interface Step1FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const Step2Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
  });
  return (
    <>
      <h1>Address Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: "10px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Address"
                      {...field}
                      fullWidth
                      error={!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="State"
                      {...field}
                      fullWidth
                      error={!errors.state}
                      helperText={errors.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="City"
                      {...field}
                      fullWidth
                      error={!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Country"
                      {...field}
                      fullWidth
                      error={!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="pincode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Pincode"
                      {...field}
                      fullWidth
                      error={!errors.pincode}
                      helperText={errors.pincode?.message}
                    />
                  )}
                />
              </Grid>
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
            Submit
          </Button>
        </Box>
      </form>
      <Usertable />
    </>
  );
};

export default Step2Form;
