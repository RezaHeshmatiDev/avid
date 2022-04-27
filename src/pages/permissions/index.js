import React from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { PermissionListResults } from "../../components/permissions/permission-list-results";
import { PermissionListToolbar } from "../../components/permissions/permission-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import useGetAllPermissions from "../../apiCalls/useGetAllPermissions";
import Loading from "src/components/loading";
import AddPermissionModal from "src/components/permissions/addPermissionModal";
import useAddPermission from "src/apiCalls/useAddPermission";
import Swal from "sweetalert2";
import { errorModal } from "src/utils/globalModal";

const Permissions = () => {
  const [showAddPermissionsModal, setShowAddPermissionsModal] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [keyword, setKeyword] = React.useState(undefined);
  const [sortData, setSortData] = React.useState({
    field: "name",
    type: "asc",
  });

  const {
    data: getAllPermissionsData,
    isLoading: gettingAllPermissions,
    error: getAllPermissionsError,
    refetch: getAllPermissions,
  } = useGetAllPermissions({
    limit,
    offset: page * limit,
    keyword,
    sortData,
  });
  const {
    data: addPermissionData,
    isLoading: addingPermission,
    error: addPermissionError,
    mutate: addPermissionMutate,
  } = useAddPermission();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const addPermission = (permission) => {
    addPermissionMutate({
      name: permission.name,
      label: permission.label,
    });
  };

  const permissions = getAllPermissionsData?.data?.data?.permissions;
  const permissionsLength = getAllPermissionsData?.data?.counted_permissions;
  console.log({ permissionsLength });
  const handleOnSearchClick = () => {
    getAllPermissions({});
  };

  const handleSorting = (sortData) => {
    setSortData(sortData);
  };

  React.useEffect(() => {
    getAllPermissions({});
  }, [limit, page, sortData]);
  React.useEffect(() => {
    setShowAddPermissionsModal(false);
  }, [addPermissionData, addPermissionError]);

  React.useEffect(() => {
    if (addPermissionData) getAllPermissions();
  }, [addPermissionData]);

  React.useEffect(() => {
    if (addPermissionError) errorModal(addPermissionError.response.data.error);
  }, [addPermissionError]);

  const handleAddPermissionsModalClose = () => setShowAddPermissionsModal(false);

  if (gettingAllPermissions) return <Loading show={gettingAllPermissions} />;
  if (!gettingAllPermissions && getAllPermissionsData)
    return (
      <>
        <Head>
          <title>Permissions</title>
        </Head>
        <AddPermissionModal
          show={showAddPermissionsModal}
          handleClose={handleAddPermissionsModalClose}
          onSubmit={(data) => addPermission(data)}
          isSubmiting={addingPermission}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <PermissionListToolbar
              handleOnAddPermissionsClick={() => setShowAddPermissionsModal(true)}
              handleOnSearch={(value) => setKeyword(value)}
              handleOnSearchClick={handleOnSearchClick}
            />
            <Box sx={{ mt: 3 }}>
              <PermissionListResults
                permissions={permissions}
                handlePageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
                page={page}
                limit={limit}
                onRequestSort={handleSorting}
                sortData={sortData}
                permissionsLength={permissionsLength}
              />
            </Box>
          </Container>
        </Box>
      </>
    );
  if (getAllPermissionsError) return <div>somthing went wrong</div>;
  return <></>;
};
Permissions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Permissions;
