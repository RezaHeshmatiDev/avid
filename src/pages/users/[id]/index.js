import { Box, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { UserProfileDetails } from "src/components/users/user-profile-details";
import { UserProfile } from "src/components/users/user-profile";

export default function UserDetailPage() {
  const router = useRouter();
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    if (router?.query?.id) setUser(router.query);
  }, [router.query]);
  console.log({ user });
  return (
    <>
      <Head>
        <title>User Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            User Details
          </Typography>
          {user && (
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <UserProfile user={user} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <UserProfileDetails user={user} />
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}

UserDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
