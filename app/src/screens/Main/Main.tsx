import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import HivesIcon from "../../../assets/images/icons/hives.svg";
import HomeIcon from "../../../assets/images/icons/home.svg";
import DiscoverTab from "./DiscoverTab";
import HivesTab from "./HivesTab";
import HomeTab from "./HomeTab";
import MainRoutes from "./MainRoutes";
import MainTabBar from "./MainTabBar";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={MainTabBar}>
      <Tab.Screen
        name={MainRoutes.HomeTab}
        component={HomeTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon fill={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.DiscoverTab}
        component={DiscoverTab}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <HivesIcon fill={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.HivesTab}
        component={HivesTab}
        options={{
          tabBarLabel: "Hives",
          tabBarIcon: ({ color, size }) => (
            <HivesIcon fill={color} width={size} height={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
