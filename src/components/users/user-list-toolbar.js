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
// import { Upload as UploadIcon } from '../../icons/upload';
// import { Download as DownloadIcon } from '../../icons/download';

export const UserListToolbar = ({
  handleOnSearchClick,
  handleOnAddUsersClick,
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
        Users
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained" onClick={handleOnAddUsersClick}>
          Add Users
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
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
              placeholder="Search users"
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
