import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";

const inputsStyles = {
  margin: ".4rem",
};

const RolesAndPermissionsModal = ({ show, handleClose, label, isSubmiting, onSubmit, fields }) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          padding: "1rem 2rem",
          width: "55%",
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          <Typography>{label}</Typography>
          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            {fields.map((f) => (
              <FormControlLabel
                key={f.id}
                control={
                  <Checkbox checked={true} onChange={(e) => console.log({ e })} name={f.name} />
                }
                label={f.label}
              />
            ))}
          </div>
          <Grid
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "1rem" }}
          >
            <Button variant="outlined" onClick={handleClose}>
              cancel
            </Button>
            <LoadingButton
              loading={isSubmiting}
              sx={inputsStyles}
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              save
            </LoadingButton>
          </Grid>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default RolesAndPermissionsModal;
