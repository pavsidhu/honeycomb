import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateHive from "../CreateHive";
import CreatePlan from "../CreatePlan";
import Hive from "../Hive/Hive";
import HivesFeed from "../HivesFeed";
import Home from "../HomeFeed/HomeFeed";
import MainRoutes from "../MainRoutes";
import Plan from "../Plan";
import Settings from "../Settings";

const Stack = createNativeStackNavigator();

export default function HivesTab() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={MainRoutes.HivesFeed}
          component={HivesFeed}
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
