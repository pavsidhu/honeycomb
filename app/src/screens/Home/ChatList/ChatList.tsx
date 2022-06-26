import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { useChats } from "../../../supabase/entities/chats";
import HomeRoutes, { HomeRoutesParamList } from "../HomeRoutes";
import ChatListItem from "./ChatListItem";
import SearchIcon from "../../../../assets/images/icons/search.svg";
import TextInput from "../../../components/TextInput";

export type ChatListProps = NativeStackScreenProps<
  HomeRoutesParamList,
  HomeRoutes.ChatList
>;

export default function ChatList(props: ChatListProps) {
  const { data: chats } = useChats({ includeLastMessage: true });

  const goToChat = (chatId: string) =>
    props.navigation.push(HomeRoutes.Chat, { chatId });

  return (
    <Root>
      <ScrollView keyboardDismissMode="on-drag">
        <TextInput
          icon={<SearchIcon />}
          placeholder="Search for chats and messages"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />

        {chats?.map((chat) => (
          <ChatListItem
            chat={chat}
            onPress={() => goToChat(chat.id)}
            key={chat.id}
          />
        ))}
      </ScrollView>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.default};
  padding: 0 24px;
`;
