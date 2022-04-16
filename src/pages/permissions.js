import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { PermissionsProfile } from "../components/permission/permission-profile";
import { PermissionsProfileDetails } from "../components/permission/permission-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";

const Permissions = () => (
  <>
    <Head>
      <title>Permissions</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Permissions
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <PermissionsProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <PermissionsProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Permissions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Permissions;