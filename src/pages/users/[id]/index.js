import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { UserProfileDetails } from "src/components/users/user-profile-details";
import { UserProfile } from "src/components/users/user-profile";
import useGetOneUser from "src/apiCalls/useGetOneUser";
import Loading from "src/components/loading";
import useGetRoles from "src/apiCalls/useGetAllRoles";
import useGetPermissions from "src/apiCalls/useGetPermissons";

export default function UserDetailPage() {
  const router = useRouter();
  const userId = router?.query?.id;
  const { data: userData, isLoading: gettingUser, error: getUserError } = useGetOneUser(userId);
  const { data: allRoles, isLoading: gettingRoles, error: getRolesError } = useGetRoles();
  const {
    data: allPermissions,
    isLoading: gettingPermmission,
    error: getPermissionsError,
  } = useGetPermissions();

  console.log({ allRoles, allPermissions });

  const user = userData?.data?.data?.user;
  const userRoles = userData?.data?.data?.roles;
  const userPermissions = userData?.data?.data?.permissions;
  if (gettingUser || gettingRoles || gettingPermmission) return <Loading show={true} />;
  return (
    <>
      <Head>
        <title>User Details/Edit</title>
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
            User Details/Edit
          </Typography>
          {userData ? (
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <UserProfile user={user} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <UserProfileDetails user={user} roles={userRoles} permissions={userPermissions} />
              </Grid>
            </Grid>
          ) : (
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: "3rem",
              }}
            >
              <CircularProgress color="inherit" />
            </Container>
          )}
        </Container>
      </Box>
    </>
  );
}

UserDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
