import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

export const RoleListToolbar = ({
  handleOnSearchClick,
  handleOnAddRolesClick,
  handleOnSearch,
  ...props
}) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Roles
      </Typography>
      <Box sx={{ m: 1 }}>
        {/* <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Import
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Export
        </Button> */}
        <Button color="primary" variant="contained" onClick={handleOnAddRolesClick}>
          Add Roles
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500, display: "flex" }}>
            <TextField
              fullWidth
              onChange={(e) => handleOnSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search roles"
              variant="outlined"
            />
            <Button onClick={handleOnSearchClick} variant="outlined" sx={{ m: 1 }}>
              search
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
