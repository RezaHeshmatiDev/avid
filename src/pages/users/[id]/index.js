import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { UserProfileDetails } from "src/components/users/user-profile-details";
import { UserProfile } from "src/components/users/user-profile";
import useGetOneUser from "src/apiCalls/useGetOneUser";
import Loading from "src/components/loading";
import useGetRoles from "src/apiCalls/useGetAllRoles";
import useGetPermissions from "src/apiCalls/useGetAllPermissions";
import useEditUser from "src/apiCalls/useEditUser";
import useSyncPermissions from "src/apiCalls/useSyncPermissions";
import useSyncRoles from "src/apiCalls/useSyncRoles";
import useDeleteUser from "src/apiCalls/useDeleteUser";
import { LoadingButton } from "@mui/lab";
import { confirmModal, errorModal } from "src/utils/globalModal";
export default function UserDetailPage() {
  const router = useRouter();
  const userId = router?.query?.id;
  console.log({ userId });
  const {
    data: userData,
    isLoading: gettingUser,
    error: getUserError,
    refetch,
  } = useGetOneUser(userId);
  const {
    data: allRoles,
    isLoading: gettingRoles,
    error: getRolesError,
  } = useGetRoles({
    limit: 1000,
    offset: 0,
  });
  const {
    data: allPermissions,
    isLoading: gettingPermmission,
    error: getPermissionsError,
  } = useGetPermissions({
    limit: 1000,
    offset: 0,
  });
  const {
    data: editUserData,
    isLoading: editingUser,
    error: editUserError,
    mutate: editUser,
  } = useEditUser();
  const {
    data: syncPermissionsData,
    isLoading: syncingPermissions,
    error: syncingPermissionsError,
    mutate: syncPermissions,
  } = useSyncPermissions();

  const {
    data: syncRolesData,
    isLoading: syncingRoles,
    error: syncingRolesError,
    mutate: syncRoles,
  } = useSyncRoles();

  const {
    data: deleteUserData,
    isLoading: deletingUser,
    error: deleteUserError,
    mutate: deleteUser,
  } = useDeleteUser();

  const user = userData?.data?.data?.user;
  const userRoles = userData?.data?.data?.roles;
  const userPermissions = userData?.data?.data?.permissions;
  const roles = allRoles?.data?.data?.roles;
  const permissions = allPermissions?.data?.data?.permissions;

  React.useEffect(() => {
    if (deleteUserData) router.replace("/users");
  }, [deleteUserData]);

  React.useEffect(() => {
    if (deleteUserError) errorModal(deleteUserError?.response?.data?.error);
  }, [deleteUserError]);

  React.useEffect(() => {
    if (editUserError) errorModal(editUserError?.response?.data?.error);
  }, [editUserError]);

  React.useEffect(() => {
    if (userData) refetch();
  }, [editUserData]);
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
          {userData && allRoles && allPermissions ? (
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <UserProfile user={user} />
                <LoadingButton
                  onClick={() => confirmModal(() => deleteUser({ id: userId }))}
                  color="error"
                  size="small"
                  loading={deletingUser}
                >
                  delete user!
                </LoadingButton>
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <UserProfileDetails
                  user={user}
                  userRoles={userRoles}
                  userPermissions={userPermissions}
                  allRoles={roles}
                  allPermissions={permissions}
                  userId={userId}
                  editUser={editUser}
                  editingUser={editingUser}
                  syncingPermissions={syncingPermissions}
                  syncPermissions={syncPermissions}
                  syncingRoles={syncingRoles}
                  syncRoles={syncRoles}
                />
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
