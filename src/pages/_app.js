import Head from "next/head";
import React from "react";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import Loading from "../components/loading";
import instance from "src/apiCalls/instance";
const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();

export const UserContext = React.createContext(undefined);

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [permissions, setPermissions] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);

  const getLayout = Component.getLayout ?? ((page) => page);

  React.useEffect(() => {
    setIsLoading(true);
    instance
      .get("user")
      .then((res) => {
        if (res.status != 202) {
          window.location.assign("https://auth.agah.me");
          return {};
        } else {
          const permissions = res?.data?.data?.permissions;
          const user = res?.data?.data?.user;
          return { permissions, user };
        }
      })
      .then(({ user, permisisons }) => {
        setPermissions(permisisons);
        setUser(user);
      })
      .catch((err) => {
        window.location.assign("https://auth.agah.me");
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    if (permissions && !permissions.find((p) => p.name == "panel_admin"))
      window.location.assign("https://auth.agah.me");
  }, [permissions]);

  if (isLoading) return <Loading show={isLoading} />;

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>wikiweb admin panel</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
