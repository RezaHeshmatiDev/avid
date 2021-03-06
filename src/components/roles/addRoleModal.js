import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

const types = [
  {
    value: "CLIENT",
    label: "Client",
  },
  {
    value: "EMPLOYEE",
    label: "Employee",
  },
];

export default function AddRoleModal({ show, handleClose, onSubmit, isSubmiting }) {
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
          Add Role
        </Typography>
        <FormControl>
          <TextField
            sx={inputsStyles}
            id="filled-basic"
            label="Name"
            variant="filled"
            {...register("name")}
          />
          <TextField
            {...register("label")}
            sx={inputsStyles}
            id="filled-basic"
            label="Label"
            variant="filled"
          />
          <TextField
            {...register("type")}
            sx={inputsStyles}
            id="filled-basic"
            label="Type"
            select
            SelectProps={{ native: true }}
            variant="standard"
          >
            {types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

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
