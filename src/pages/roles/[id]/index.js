import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import Loading from "src/components/loading";
import useGetPermissions from "src/apiCalls/useGetAllPermissions";
import { LoadingButton } from "@mui/lab";
import useGetOneRole from "src/apiCalls/useGetOneRole";
import useDeleteRole from "../../../apiCalls/useDeleteRole";
import RoleDetail from "src/components/roles/role-detail";
import useEditRole from "src/apiCalls/useEditRole";
import useSyncPermissionsToRole from "src/apiCalls/useSyncPermissionsToRole";
import { confirmModal, errorModal } from "src/utils/globalModal";
export default function RoleDetailPage() {
  const router = useRouter();
  const roleId = router?.query?.id;
  const {
    data: roleData,
    isLoading: gettingRole,
    error: getRoleError,
    refetch,
  } = useGetOneRole(roleId);
  const {
    data: allPermissions,
    isLoading: gettingPermissions,
    error: getPermissionsError,
  } = useGetPermissions({
    limit: 1000,
    offset: 0,
  });

  console.log({ allPermissions });

  const {
    data: deleteRoleData,
    isLoading: deletingRole,
    error: deleteRoleError,
    mutate: deleteRole,
  } = useDeleteRole();

  const {
    data: editRoleData,
    isLoading: editingRole,
    error: editRoleError,
    mutate: editRole,
  } = useEditRole();

  const {
    data: syncPermissionsToRoleData,
    isLoading: syncingPermissionsToRole,
    error: syncPermissionsToRoleError,
    mutate: syncPermissionsToRole,
  } = useSyncPermissionsToRole();

  React.useEffect(() => {
    if (deleteRoleData) router.replace("/roles");
  }, [deleteRoleData]);

  React.useEffect(() => {
    if (deleteRoleError) errorModal(deleteRoleError?.response?.data?.error);
  }, [deleteRoleError]);

  React.useEffect(() => {
    if (editRoleError) errorModal(editRoleError?.response?.data?.error);
  }, [editRoleError]);

  React.useEffect(() => {
    if (syncPermissionsToRoleError) errorModal(syncPermissionsToRoleError?.response?.data?.error);
  }, [syncPermissionsToRoleError]);

  React.useEffect(() => {
    if (roleData) refetch();
  }, [editRoleData]);

  const role = roleData?.data?.data?.role;
  const permissions = allPermissions?.data?.data?.permissions;

  if (gettingRole || gettingPermissions) return <Loading show={true} />;
  return (
    <>
      <Head>
        <title>Role Details/Edit</title>
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
            Role Details/Edit
          </Typography>
          {roleData && allPermissions ? (
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <RoleDetail
                  role={role}
                  roleId={roleId}
                  editRole={editRole}
                  editingRole={editingRole}
                  allPermissions={permissions}
                  rolePermissions={role.permissions}
                  syncPermissions={syncPermissionsToRole}
                  syncingPermissions={syncingPermissionsToRole}
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <LoadingButton
                  onClick={() => confirmModal(() => deleteRole({ roleId }))}
                  color="error"
                  size="small"
                  loading={deletingRole}
                >
                  delete role!
                </LoadingButton>
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

RoleDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
