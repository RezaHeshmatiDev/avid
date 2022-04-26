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

const PermissionsModal = ({
  show,
  handleClose,
  label,
  isSubmiting,
  onSubmit,
  allPermissions,
  selectedPermissions,
}) => {
  const [selectedItems, setSelectedItems] = React.useState([
    ...selectedPermissions.map((sp) => sp.id),
  ]);
  console.log({ allPermissions });
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
            {allPermissions.map((p) => (
              <FormControlLabel
                key={p.id}
                control={
                  <Checkbox
                    defaultChecked={selectedPermissions.find((sp) => sp.id == p.id)}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedItems([...selectedItems, p.id])
                        : setSelectedItems([...selectedItems.filter((si) => si != p.id)])
                    }
                    name={p.name}
                  />
                }
                label={p.label}
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

export default PermissionsModal;
