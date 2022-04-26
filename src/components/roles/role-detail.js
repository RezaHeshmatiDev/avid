import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PermissionsModal from "./permission-modal";

const RoleDetail = ({
  role,
  roleId,
  editRole,
  editingRole,
  allPermissions,
  rolePermissions,
  syncPermissions,
  syncingPermissions,
  ...props
}) => {
  const [roleState, setRoleState] = React.useState(role);
  const onSubmit = () => editRole({ role: roleState, id: roleId });
  const [permissonsModalIsOpen, setPermissonsModalIsOpen] = React.useState(false);

  const handleChange = (event) => {
    setRoleState({
      ...roleState,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <PermissionsModal
        show={permissonsModalIsOpen}
        handleClose={() => setPermissonsModalIsOpen(false)}
        allPermissions={allPermissions}
        selectedPermissions={rolePermissions}
        isSubmiting={syncingPermissions}
        onSubmit={(selectedItems) => syncPermissions({ roleId, permissions: selectedItems })}
      />
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader subheader="The information can be edited" title="Role" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  defaultValue={role.name}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Label"
                  name="label"
                  onChange={handleChange}
                  defaultValue={role.label}
                  variant="standard"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <Button md={6} xs={6} onClick={() => setPermissonsModalIsOpen(true)}>
                  Permissions
                </Button>
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
            <LoadingButton
              color="primary"
              variant="contained"
              loading={editingRole}
              onClick={onSubmit}
            >
              Save details
            </LoadingButton>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default RoleDetail;
