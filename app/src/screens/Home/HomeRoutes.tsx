enum HomeRoutes {
  ChatList = "Chat List",
  Chat = "Chat",
  Friends = "Friends",
  Settings = "Settings",
}

export type HomeRoutesParamList = {
  [HomeRoutes.ChatList]: undefined;
  [HomeRoutes.Chat]: { chatId: string };
  [HomeRoutes.Friends]: undefined;
  [HomeRoutes.Settings]: undefined;
};

export default HomeRoutes;
