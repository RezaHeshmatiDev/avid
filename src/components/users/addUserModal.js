import React from "react";
import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

const sexes = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export default function AddUserModal({ show, handleClose, onSubmit, isSubmiting }) {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const inputsStyles = {
    margin: ".4rem",
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          padding: "1rem 4rem",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add User
        </Typography>
        <FormControl>
          <TextField
            sx={inputsStyles}
            id="filled-basic"
            label="First Name"
            variant="filled"
            {...register("firstName")}
          />
          <TextField
            {...register("lastName")}
            sx={inputsStyles}
            id="filled-basic"
            label="Last Name"
            variant="filled"
          />
          <TextField
            id="filled-basic"
            label="Sex"
            sx={inputsStyles}
            {...register("sex")}
            // required
            select
            variant="filled"
          >
            {sexes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register("mobile")}
            sx={inputsStyles}
            id="filled-basic"
            label="Mobile"
            variant="filled"
          />
          <TextField
            {...register("email")}
            sx={inputsStyles}
            id="filled-basic"
            label="Email"
            variant="filled"
          />
          <TextField
            {...register("refferal")}
            sx={inputsStyles}
            id="filled-basic"
            label="Refferal"
            variant="filled"
          />
          <TextField
            {...register("password")}
            sx={inputsStyles}
            id="filled-basic"
            label="Password"
            variant="filled"
          />
          <TextField
            {...register("confirmPassword")}
            sx={inputsStyles}
            id="filled-basic"
            label="Confirm password"
            variant="filled"
          />
          <LoadingButton
            loading={isSubmiting}
            sx={inputsStyles}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            save
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose}>
            cancel
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}
