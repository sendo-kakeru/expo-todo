import "~/global.css";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Amplify } from "aws-amplify";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AuthNav from "~/components/auth/AuthNav";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

if (
  !process.env.EXPO_PUBLIC_USER_POOL_ID ||
  !process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID
) {
  throw new Error(
    "EXPO_PUBLIC_USER_POOL_ID and EXPO_PUBLIC_USER_POOL_CLIENT_ID are not set",
  );
}

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID,
      userPoolClientId: process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID,
      identityPoolId: "",
      allowGuestAccess: true,
    },
  },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Authenticator.Provider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <GuardedStacks />
        <PortalHost />
      </ThemeProvider>
    </Authenticator.Provider>
  );
}

function GuardedStacks() {
  const { authStatus } = useAuthenticator();

  return (
    <>
      <Stack
        screenOptions={{
          headerRight: () => <AuthNav />,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Protected guard={authStatus === "authenticated"}>
          <Stack.Screen name="task" />
        </Stack.Protected>
        <Stack.Protected guard={authStatus !== "authenticated"}>
          <Stack.Screen
            name="login"
            options={{
              title: "login",
            }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}
