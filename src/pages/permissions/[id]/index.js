import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import Loading from "src/components/loading";

import { LoadingButton } from "@mui/lab";
import useGetOnePermission from "src/apiCalls/useGetOnePermission";
import useDeletePermission from "src/apiCalls/useDeletePermission";
import useEditPermission from "src/apiCalls/useEditPermission";
import PermissionDetail from "src/components/permissions/permission-detail";
import Swal from "sweetalert2";

export default function PermissionDetailPage() {
  const router = useRouter();
  const permissionId = router?.query?.id;

  const {
    data: permissionData,
    isLoading: gettingPermission,
    error: getPermissionError,
    refetch,
  } = useGetOnePermission(permissionId);

  const {
    data: deletePermissionData,
    isLoading: deletingPermission,
    error: deletePermissionError,
    mutate: deletePermission,
  } = useDeletePermission();

  const {
    data: editPermissionData,
    isLoading: editingPermission,
    error: editPermissionError,
    mutate: editPermission,
  } = useEditPermission();

  React.useEffect(() => {
    if (deletePermissionData) router.replace("/permissions");
  }, [deletePermissionData]);

  React.useEffect(() => {
    if (deletePermissionError) errorModal(deletePermissionError?.response?.data?.error);
  }, [deletePermissionError]);

  React.useEffect(() => {
    if (editPermissionError) errorModal(editPermissionError?.response?.data?.error);
  }, [editPermissionError]);

  React.useEffect(() => {
    if (permissionData) refetch();
  }, [editPermissionData]);

  const permission = permissionData?.data?.data?.permission;

  const errorModal = (error) => {
    Swal.fire({
      title: error?.code || 500,
      html: `${
        error
          ? `<p>${error?.message}</p>
        <hr/>
          <br/>

      ${Object.values(error.fields).join("<br/>")}

      `
          : `somthing went wrong`
      }
      `,
      icon: "error",
      confirmButtonText: "ok",
    });
  };

  if (gettingPermission) return <Loading show={true} />;
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
            Permission Details/Edit
          </Typography>
          {permissionData ? (
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <PermissionDetail
                  permission={permission}
                  permissionId={permissionId}
                  editPermission={editPermission}
                  editingPermission={editingPermission}
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <LoadingButton
                  onClick={() => deletePermission({ id: permissionId })}
                  color="error"
                  size="small"
                  loading={deletingPermission}
                >
                  delete permission!
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

PermissionDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
