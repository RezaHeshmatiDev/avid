import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import KeyIcon from "@mui/icons-material/Key";
import CategoryIcon from "@mui/icons-material/Category";
import { Users as UsersIcon } from "../icons/users";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/users",
    icon: <UsersIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/roles",
    icon: <CategoryIcon fontSize="small" />,
    title: "Roles",
  },
  {
    href: "/permissions",
    icon: <KeyIcon fontSize="small" />,
    title: "Permissions",
  },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ pt: 3, display: "flex", alignItem: "center", justifyContent: "space-around" }}>
            <NextLink href="/" passHref>
              <a>
                <img src="/static/logo.svg" width={35} height={35} />
              </a>
            </NextLink>
            <div>
              <Typography color="neutral.400" variant="body2">
                Admin panel
              </Typography>
            </div>
          </Box>
          {/* <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            ></Box>
          </Box> */}
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        {/* <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink>
        </Box> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
