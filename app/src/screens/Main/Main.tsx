import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeTab from "./HomeTab";
import MainRoutes from "./MainRoutes";
import Settings from "./Settings";
import Plan from "./Plan";
import CreatePlan from "./CreatePlan";
import CreateHive from "./CreateHive";
import Hive from "./Hive";

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={MainRoutes.HomeTab}
          component={HomeTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MainRoutes.Plan}
          component={Plan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MainRoutes.CreatePlan}
          component={CreatePlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MainRoutes.Hive}
          component={Hive}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MainRoutes.CreateHive}
          component={CreateHive}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MainRoutes.Settings}
          component={Settings}
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Navigator>
    </>
  );
}
