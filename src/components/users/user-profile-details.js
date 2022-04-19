import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import RolesAndPermissionsModal from "./roles-and-permissions-modal";

const sexes = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
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

export const UserProfileDetails = ({ user, roles, permissions, ...props }) => {
  const [userState, setUserState] = useState(user);
  const [rolesModalIsOpen, setRolesModalIsOpen] = useState(false);
  const [permissonsModalIsOpen, setPermissonsModalIsOpen] = useState(false);

  const handleChange = (event) => {
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
        fields={roles}
      />
      <RolesAndPermissionsModal
        label="Config Permissions"
        show={permissonsModalIsOpen}
        handleClose={() => setPermissonsModalIsOpen(false)}
        fields={permissions}
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
                  name="firstName"
                  onChange={handleChange}
                  value={user.first_name}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={user.last_name}
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
                  SelectProps={{ native: true }}
                  value={user.sex}
                  variant="standard"
                >
                  {sexes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
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
                  value={user.mobile}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Referrer Mobile"
                  name="referrer-mobile"
                  onChange={handleChange}
                  value={user.referrer_mobile}
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
                  SelectProps={{ native: true }}
                  value={user.status}
                  variant="standard"
                >
                  {statuses.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12} xs={12} onClick={() => console.log("click")}>
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
            <Button color="primary" variant="contained">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};
