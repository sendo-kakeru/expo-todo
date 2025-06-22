import "~/global.css";

import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="signup"
        // Todo: Icon
        options={{
          title: "Sign Up",
        }}
      />
      <Tabs.Screen
        name="signin"
        // Todo: Icon
        options={{
          title: "Sign In",
        }}
      />
    </Tabs>
  );
}
