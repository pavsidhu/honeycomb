import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Chat from "./Chat/Chat";
import ChatList from "./ChatList/ChatList";
import ChatListHeader from "./ChatList/ChatListHeader";
import ChatHeader from "./Chat/ChatHeader";
import HomeRoutes from "./HomeRoutes";
import Friends from "./Friends";
import FriendsHeader from "./Friends/FriendsHeader";
import Settings from "./Settings/Settings";
import SettingsHeader from "./Settings/SettingsHeader";

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeRoutes.ChatList}
        component={ChatList}
        options={{ header: ChatListHeader }}
      />
      <Stack.Screen
        name={HomeRoutes.Chat}
        component={Chat}
        options={{ header: ChatHeader }}
      />
      <Stack.Screen
        name={HomeRoutes.Friends}
        component={Friends}
        options={{ presentation: "modal", header: FriendsHeader }}
      />
      <Stack.Screen
        name={HomeRoutes.Settings}
        component={Settings}
        options={{ presentation: "modal", header: SettingsHeader }}
      />
    </Stack.Navigator>
  );
}
