import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import RolesAndPermissionsModal from "./roles-and-permissions-modal";

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

const statuses = [
  {
    value: "ENABLE",
    label: "Enable",
  },
  {
    value: "DISABLE",
    label: "Disable",
  },
];

export const UserProfileDetails = ({
  user,
  allRoles,
  allPermissions,
  userRoles,
  userPermissions,
  userId,
  editUser,
  editingUser,
  syncingPermissions,
  syncPermissions,
  syncingRoles,
  syncRoles,
  ...props
}) => {
  console.log("Lasdf", userId);
  const [userState, setUserState] = useState(user);
  const [rolesModalIsOpen, setRolesModalIsOpen] = useState(false);
  const [permissonsModalIsOpen, setPermissonsModalIsOpen] = useState(false);

  const onSubmit = () => editUser({ user: userState, id: userId });

  const handleChange = (event) => {
    console.log({ event });
    setUserState({
      ...userState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <RolesAndPermissionsModal
        label="Config Roles"
        show={rolesModalIsOpen}
        handleClose={() => setRolesModalIsOpen(false)}
        fields={allRoles}
        selectedFields={userRoles}
        type="role"
        onSubmit={(selectedItems) => syncRoles({ userId, roles: selectedItems })}
        isSubmiting={syncingRoles}
      />
      <RolesAndPermissionsModal
        label="Config Permissions"
        show={permissonsModalIsOpen}
        handleClose={() => setPermissonsModalIsOpen(false)}
        fields={allPermissions}
        selectedFields={userPermissions}
        type="permission"
        isSubmiting={syncingPermissions}
        onSubmit={(selectedItems) => syncPermissions({ userId, permissions: selectedItems })}
      />

      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
                  label="First name"
                  name="first_name"
                  onChange={handleChange}
                  defaultValue={user.first_name}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  defaultValue={user.last_name}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sex"
                  name="sex"
                  onChange={handleChange}
                  // required
                  select
                  defaultValue={user.sex}
                  variant="standard"
                >
                  {sexes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  onChange={handleChange}
                  type="number"
                  defaultValue={user.mobile}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  defaultValue={user.email}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Referrer Mobile"
                  name="referrer_mobile"
                  onChange={handleChange}
                  defaultValue={user.referrer_mobile}
                  variant="standard"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  // required
                  select
                  // SelectProps={{ native: true }}
                  defaultValue={user.status}
                  variant="standard"
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12} xs={12}>
                <Button md={6} xs={6} onClick={() => setRolesModalIsOpen(true)}>
                  Roles
                </Button>
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
              loading={editingUser}
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
