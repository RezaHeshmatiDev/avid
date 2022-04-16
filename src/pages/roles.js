import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { roles } from "../__mocks__/roles";
import { RoleListToolbar } from "../components/role/role-list-toolbar";
import { RoleCard } from "../components/role/role-card";
import { DashboardLayout } from "../components/dashboard-layout";

const Roles = () => (
  <>
    <Head>
      <title>Roles</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <RoleListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {roles.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <RoleCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

Roles.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Roles;
