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
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import SettingsIcon from "@mui/icons-material/Settings";

export const UserListResults = ({ users, ...rest }) => {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell style={{ textAlign: "center" }}>Config</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow hover key={user.id} selected={selectedUserIds.indexOf(user.id) !== -1}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {/* <Avatar src={user.avatarUrl} sx={{ mr: 2 }}> */}
                      {getInitials(user.name)}
                      {/* </Avatar> */}
                      <Typography color="textPrimary" variant="body1">
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell style={{ cursor: "pointer", textAlign: "center" }}>
                    <SettingsIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
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
