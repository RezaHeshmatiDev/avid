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

export const PermissionListToolbar = ({
  handleOnSearchClick,
  handleOnAddPermissionsClick,
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
        Permissions
      </Typography>
      <Box sx={{ m: 1 }}>
        {/* <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Import
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Export
        </Button> */}
        <Button color="primary" variant="contained" onClick={handleOnAddPermissionsClick}>
          Add Permissions
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
              placeholder="Search Permissions"
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
