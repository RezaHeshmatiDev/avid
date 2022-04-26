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

const PermissionDetail = ({
  permission,
  permissionId,
  editPermission,
  editingPermission,
  ...props
}) => {
  const [permissionState, setPermissionState] = React.useState(permission);
  const onSubmit = () => editPermission({ permission: permissionState, id: permissionId });

  const handleChange = (event) => {
    setPermissionState({
      ...permissionState,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Permission" />
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
                defaultValue={permission.name}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Label"
                name="label"
                onChange={handleChange}
                defaultValue={permission.label}
                variant="standard"
              />
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
            loading={editingPermission}
            onClick={onSubmit}
          >
            Save details
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};

export default PermissionDetail;
