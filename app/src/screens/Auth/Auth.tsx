import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthRoutes from "./AuthRoutes";
import Onboarding from "./Onboarding";
import Verify from "./Verify";
import Welcome from "./Welcome";

const Stack = createNativeStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name={AuthRoutes.Welcome} component={Welcome} />
      <Stack.Screen name={AuthRoutes.Verify} component={Verify} />
      <Stack.Screen name={AuthRoutes.Onboarding} component={Onboarding} />
    </Stack.Navigator>
  );
}
