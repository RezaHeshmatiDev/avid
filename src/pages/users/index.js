import React from "react";
import Head from "next/head";
import { Box, Container, Modal, TextField, Typography } from "@mui/material";
import { UserListResults } from "../../components/users/user-list-results";
import { UserListToolbar } from "../../components/users/user-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import useGetAllUsers from "../../apiCalls/useGetAllUsers";
import Loading from "src/components/loading";
import AddUserModal from "src/components/users/addUserModal";
import useAddUser from "src/apiCalls/useAddUser";
import Swal from "sweetalert2";

const Users = () => {
  const [showAddUsersModal, setShowAddUsersModal] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [keyword, setKeyword] = React.useState(undefined);
  const [sortData, setSortData] = React.useState({
    field: "firstName",
    type: "asc",
  });

  const {
    data: getAllUsersData,
    isLoading: gettingAllUsers,
    error: getAllUsersError,
    refetch: getAllUsers,
  } = useGetAllUsers({
    limit,
    offset: page * limit,
    keyword,
    sortData,
  });
  const {
    data: addUserData,
    isLoading: addingUser,
    error: addUserError,
    mutate: addUserMutate,
  } = useAddUser();

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

  const addUser = (user) => {
    addUserMutate({
      first_name: user.firstName,
      last_name: user.lastName,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      status: user.status,
      refferer_mobile: user.mobile,
    });
  };

  const users = getAllUsersData?.data?.data?.users;
  const handleOnSearchClick = () => {
    getAllUsers({});
  };

  const handleSorting = (sortData) => {
    setSortData(sortData);
  };

  React.useEffect(() => {
    getAllUsers({});
  }, [limit, page, sortData]);
  React.useEffect(() => {
    setShowAddUsersModal(false);
  }, [addUserData, addUserError]);

  React.useEffect(() => {
    if (addUserError) errorModal(addUserError.response.data.error);
  }, [addUserError]);

  const handleAddUsersModalClose = () => setShowAddUsersModal(false);
  if (gettingAllUsers) return <Loading show={gettingAllUsers} />;
  if (!gettingAllUsers && getAllUsersData)
    return (
      <>
        <Head>
          <title>Users</title>
        </Head>
        <AddUserModal
          show={showAddUsersModal}
          handleClose={handleAddUsersModalClose}
          onSubmit={(data) => addUser(data)}
          isSubmiting={addingUser}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <UserListToolbar
              handleOnAddUsersClick={() => setShowAddUsersModal(true)}
              handleOnSearch={(value) => setKeyword(value)}
              handleOnSearchClick={handleOnSearchClick}
            />
            <Box sx={{ mt: 3 }}>
              <UserListResults
                users={users}
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
  if (getAllUsersError) return <div>somthing went wrong</div>;
  return <></>;
};
Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;
