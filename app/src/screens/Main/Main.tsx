import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeTab from "./HomeTab";
import HivesTab from "./HivesTab";
import MainTabBar from "./MainTabBar";
import MainRoutes from "./MainRoutes";
import HomeIcon from "../../../assets/images/icons/home.svg";
import HivesIcon from "../../../assets/images/icons/hives.svg";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={MainTabBar}>
      <Tab.Screen
        name={MainRoutes.HomeTab}
        component={HomeTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon fill={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.HivesTab}
        component={HivesTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HivesIcon fill={color} width={size} height={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
