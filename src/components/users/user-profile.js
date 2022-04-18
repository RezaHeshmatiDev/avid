import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const UserProfile = ({ user, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          p: "1rem",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" variant="h5">
          {user.first_name + " " + user.last_name}
        </Typography>
        <Typography color="textSecondary" variant="body2" gutterBottom sx={{ mb: ".5rem" }}>
          {user.reference_code}
        </Typography>
        <Typography color="textPrimary" variant="body2">
          {user.sex}
        </Typography>
        <Typography color={user.status == "ENABLE" ? "green" : "red"} variant="body2">
          {user.status}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      {/* <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button> */}
    </CardActions>
  </Card>
);
