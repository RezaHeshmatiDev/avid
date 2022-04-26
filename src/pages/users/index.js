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
  const usersLength = getAllUsersData?.data?.counted_users;
  const {
    data: addUserData,
    isLoading: addingUser,
    error: addUserError,
    mutate: addUserMutate,
  } = useAddUser();

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
      sex: user.sex,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      password_confirmation: user.confirmPassword,
      referrer_mobile: user.refferal,
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
    if (addUserData) getAllUsers();
  }, [addUserData]);

  React.useEffect(() => {
    getAllUsers({});
  }, [limit, page, sortData]);
  React.useEffect(() => {
    setShowAddUsersModal(false);
  }, [addUserData, addUserError]);

  React.useEffect(() => {
    if (addUserError) errorModal(addUserError?.response?.data?.error);
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
                usersLength={usersLength}
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
