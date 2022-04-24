import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const inputsStyles = {
  margin: ".4rem",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const RolesAndPermissionsModal = ({
  show,
  handleClose,
  label,
  isSubmiting,
  onSubmit,
  fields,
  selectedFields,
  type,
}) => {
  // const initialItems =
  //   type == "role"
  //     ? [...selectedFields.map((sf) => sf.id)]
  //     : [...selectedFields.filter((sf) => sf.pivot).map((sf) => sf.id)];
  const [selectedItems, setSelectedItems] = React.useState(
    type == "role"
      ? [...selectedFields.map((sf) => sf.id)]
      : [...selectedFields.filter((sf) => sf.pivot).map((sf) => sf.id)]
  );

  return (
    <Modal
      keepMounted
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={style}>
        <FormControl sx={{ width: "100%" }}>
          <Typography>{label}</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {fields.map((f) => (
              <FormControlLabel
                key={f.id}
                control={
                  <Checkbox
                    defaultChecked={selectedFields.find((sf) => sf.id == f.id)}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedItems([...selectedItems, f.id])
                        : setSelectedItems([...selectedItems.filter((si) => si != f.id)])
                    }
                    name={f.name}
                    disabled={
                      type == "role"
                        ? false
                        : !selectedFields.find((sf) => sf.id == f.id)?.pivot &&
                          selectedFields.find((sf) => sf.id == f.id)
                    }
                  />
                }
                label={f.label}
              />
            ))}
          </div>
        </FormControl>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            cancel
          </Button>
          <LoadingButton
            loading={isSubmiting}
            sx={inputsStyles}
            variant="contained"
            onClick={() => onSubmit(selectedItems)}
          >
            save
          </LoadingButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RolesAndPermissionsModal;
