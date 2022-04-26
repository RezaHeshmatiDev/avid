import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NextLink from "next/link";

export const UserListResults = ({
  users,
  handleLimitChange,
  handlePageChange,
  limit,
  page,
  onRequestSort,
  sortData,
  usersLength,
  ...rest
}) => {
  // const handleSelectAll = (event) => {
  //   let newSelectedUserIds;

  //   if (event.target.checked) {
  //     newSelectedUserIds = users.map((user) => user.id);
  //   } else {
  //     newSelectedUserIds = [];
  //   }

  //   setSelectedUserIds(newSelectedUserIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedUserIds.indexOf(id);
  //   let newSelectedUserIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
  //   } else if (selectedIndex === selectedUserIds.length - 1) {
  //     newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedUserIds = newSelectedUserIds.concat(
  //       selectedUserIds.slice(0, selectedIndex),
  //       selectedUserIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedUserIds(newSelectedUserIds);
  // };

  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0
                      && selectedUserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  <TableSortLabel
                    active={sortData.field == "firstName"}
                    direction={sortData.type}
                    onClick={createSortHandler({
                      field: "firstName",
                      type:
                        sortData.field == "lastName"
                          ? "desc"
                          : sortData.type == "asc"
                          ? "desc"
                          : "asc",
                    })}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortData.field == "lastName"}
                    direction={sortData.type}
                    onClick={createSortHandler({
                      field: "lastName",
                      type:
                        sortData.field == "firstName"
                          ? "desc"
                          : sortData.type == "asc"
                          ? "desc"
                          : "asc",
                    })}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell style={{ textAlign: "center" }}>Config</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow hover key={user.id}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    {/* <Avatar src={user.avatarUrl} sx={{ mr: 2 }}> */}
                    {/* {getInitials(user.first_name + user.last_name)} */}
                    {/* </Avatar> */}
                    {user.first_name}
                  </TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell style={{ cursor: "pointer", textAlign: "center" }}>
                    <NextLink
                      href={{
                        pathname: "/users/" + user.id,
                      }}
                    >
                      <SettingsIcon />
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={usersLength}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
};
