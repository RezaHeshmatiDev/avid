import React from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { RoleListResults } from "../../components/roles/role-list-results";
import { RoleListToolbar } from "../../components/roles/role-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import useGetAllRoles from "../../apiCalls/useGetAllRoles";
import Loading from "src/components/loading";
import AddRoleModal from "src/components/roles/addRoleModal";
import useAddRole from "src/apiCalls/useAddRole";
import Swal from "sweetalert2";

const Roles = () => {
  const [showAddRolesModal, setShowAddRolesModal] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [keyword, setKeyword] = React.useState(undefined);
  const [sortData, setSortData] = React.useState({
    field: "name",
    type: "asc",
  });

  const {
    data: getAllRolesData,
    isLoading: gettingAllRoles,
    error: getAllRolesError,
    refetch: getAllRoles,
  } = useGetAllRoles({
    limit,
    offset: page * limit,
    keyword,
    sortData,
  });
  const {
    data: addRoleData,
    isLoading: addingRole,
    error: addRoleError,
    mutate: addRoleMutate,
  } = useAddRole();

  React.useEffect(() => {
    if (addRoleData) getAllRoles();
  }, [addRoleData]);

  const errorModal = (error) => {
    Swal.fire({
      title: error.code,
      html: ` <p>${error.message}</p>
        <hr/>
          <br/>

      ${Object.values(error.fields).join("<br/>")}
      `,
      icon: "error",
      confirmButtonText: "ok",
    });
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const addRole = (role) => {
    addRoleMutate({
      name: role.name,
      label: role.label,
      type: role.type,
    });
  };

  const roles = getAllRolesData?.data?.data?.roles;
  const handleOnSearchClick = () => {
    getAllRoles({});
  };

  const handleSorting = (sortData) => {
    setSortData(sortData);
  };

  React.useEffect(() => {
    getAllRoles({});
  }, [limit, page, sortData]);
  React.useEffect(() => {
    setShowAddRolesModal(false);
  }, [addRoleData, addRoleError]);

  React.useEffect(() => {
    if (addRoleError) errorModal(addRoleError.response.data.error);
  }, [addRoleError]);

  const handleAddRolesModalClose = () => setShowAddRolesModal(false);

  if (gettingAllRoles) return <Loading show={gettingAllRoles} />;
  if (!gettingAllRoles && getAllRolesData)
    return (
      <>
        <Head>
          <title>Roles</title>
        </Head>
        <AddRoleModal
          show={showAddRolesModal}
          handleClose={handleAddRolesModalClose}
          onSubmit={(data) => addRole(data)}
          isSubmiting={addingRole}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <RoleListToolbar
              handleOnAddRolesClick={() => setShowAddRolesModal(true)}
              handleOnSearch={(value) => setKeyword(value)}
              handleOnSearchClick={handleOnSearchClick}
            />
            <Box sx={{ mt: 3 }}>
              <RoleListResults
                roles={roles}
                handlePageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
                page={page}
                limit={limit}
                onRequestSort={handleSorting}
                sortData={sortData}
              />
            </Box>
          </Container>
        </Box>
      </>
    );
  if (getAllRolesError) return <div>somthing went wrong</div>;
  return <></>;
};
Roles.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Roles;
