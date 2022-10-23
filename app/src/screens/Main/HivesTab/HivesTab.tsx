import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountSettings from "../AccountSettings";
import CreateHive from "../CreateHive";
import CreatePlan from "../CreatePlan";
import Hive from "../Hive/Hive";
import HivesFeed from "../HivesFeed";
import MainRoutes from "../MainRoutes";
import Plan from "../Plan";
import Settings from "../Settings";

const Stack = createNativeStackNavigator();

export default function HivesTab() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={MainRoutes.HivesFeed} component={HivesFeed} />
        <Stack.Screen name={MainRoutes.Plan} component={Plan} />
        <Stack.Screen name={MainRoutes.CreatePlan} component={CreatePlan} />
        <Stack.Screen name={MainRoutes.Hive} component={Hive} />
        <Stack.Screen name={MainRoutes.CreateHive} component={CreateHive} />
        <Stack.Screen
          name={MainRoutes.Settings}
          component={Settings}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name={MainRoutes.AccountSettings}
          component={AccountSettings}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </>
  );
}
