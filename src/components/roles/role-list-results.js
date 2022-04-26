import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import NextLink from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";

export const RoleListResults = ({
  roles,
  handleLimitChange,
  handlePageChange,
  limit,
  page,
  onRequestSort,
  sortData,
  rolesLength,
  ...rest
}) => {
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
                  checked={selectedUserIds.length === roles.length}
                  color="primary"
                  indeterminate={
                    selectedUserIds.length > 0
                    && selectedUserIds.length < roles.length
                  }
                  onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  <TableSortLabel
                    active={sortData.field == "id"}
                    direction={sortData.type}
                    onClick={createSortHandler({
                      field: "id",
                      type:
                        sortData.field == "name" ? "desc" : sortData.type == "asc" ? "desc" : "asc",
                    })}
                  >
                    Id
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortData.field == "name"}
                    direction={sortData.type}
                    onClick={createSortHandler({
                      field: "name",
                      type:
                        sortData.field == "id" ? "desc" : sortData.type == "asc" ? "desc" : "asc",
                    })}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Users count</TableCell>
                <TableCell>Permissions count</TableCell>

                <TableCell style={{ textAlign: "center" }}>Config</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.slice(0, limit).map((role) => (
                <TableRow hover key={role.id}>
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
                    {role.id}
                  </TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.users_count}</TableCell>
                  <TableCell>{role.permissions_count}</TableCell>

                  <TableCell style={{ cursor: "pointer", textAlign: "center" }}>
                    <NextLink
                      href={{
                        pathname: "/roles/" + role.id,
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
        count={rolesLength}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      {/* <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
          {roles.map((product) => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
            <RoleCard product={product} />
            </Grid>
            ))}
            </Grid>
            </Box>
            <Box
            sx={{
              display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
          >
          <Pagination color="primary" count={3} size="small" />
        </Box> */}
    </Card>
  );
};
