import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import HomeRoutes, { HomeRoutesParamList } from "../HomeRoutes";
import Stack from "../../../components/Stack";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import Avatar from "../../../components/Avatar";
import TextInput from "../../../components/TextInput";
import SearchIcon from "../../../../assets/images/icons/search.svg";
import { User, useUsersFromContacts } from "../../../supabase/entities/users";
import Button from "../../../components/Button";
import {
  useCheckChatExists,
  useCreateChat,
} from "../../../supabase/entities/chats";

type FriendsProps = NativeStackScreenProps<
  HomeRoutesParamList,
  HomeRoutes.Friends
>;

export default function Friends(props: FriendsProps) {
  const { data: users, refetch, isLoading } = useUsersFromContacts();

  const [selectedUser, setSelectedUser] = useState<User>();
  const { data: chatWithSelectedUser } = useCheckChatExists(selectedUser);
  const { mutateAsync: createChat } = useCreateChat();

  const [searchQuery, setSearchQuery] = useState("");

  const parsedUsers = useMemo(() => {
    if (!users) return users;

    const query = searchQuery.toLowerCase();

    return users
      .filter((user) => {
        if (!query) return true;

        const name = `${user.firstName} ${user.lastName}`;
        return name.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const aName = `${a.firstName} ${a.lastName}`;
        const bName = `${b.firstName} ${b.lastName}`;

        if (aName < bName) return -1;
        if (aName > bName) return 1;
        return 0;
      });
  }, [users, searchQuery]);

  useEffect(() => {
    (async () => {
      console.log(1234343, selectedUser);
      if (!selectedUser) return;

      let chatId: string;

      if (chatWithSelectedUser) {
        chatId = chatWithSelectedUser.id;
      } else {
        const chat = await createChat({ users: [selectedUser] });
        chatId = chat.id;
      }

      props.navigation.navigate(HomeRoutes.Chat, { chatId });
    })();
  }, [chatWithSelectedUser, selectedUser]);

  return (
    <Root>
      {/* TODO: make pretty 🥰 */}
      {parsedUsers?.length === 0 && (
        <>
          <Text>
            None of your contacts are on Honeycomb, ask them the join!
          </Text>
          <Button loading={isLoading} onPress={() => refetch()}>
            Check again
          </Button>
        </>
      )}

      {parsedUsers && parsedUsers.length > 0 && (
        <>
          <TextInput
            icon={<SearchIcon />}
            placeholder="Search by name"
            returnKeyType="search"
            clearButtonMode="while-editing"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ marginHorizontal: 24, marginBottom: 24 }}
          />
          <ScrollView>
            <Stack gap={8}>
              {parsedUsers.map((user) => (
                <View key={user.id}>
                  <TouchableWithoutFeedback
                    onPress={() => setSelectedUser(user)}
                  >
                    <View>
                      <ContactsItem flexDirection="row" gap={8}>
                        <Avatar size={42} uri={null} />
                        <ContactsItemName>{`${user.firstName} ${user.lastName}`}</ContactsItemName>
                      </ContactsItem>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </Stack>
          </ScrollView>
        </>
      )}
    </Root>
  );
}

const Root = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.default};
`;

const ContactsItem = styled(Stack)`
  background-color: red;
  align-items: center;
  padding: 8px 24px;
  margin: 0 24px;
  border-radius: ${({ theme }) => theme.borderRadius.medium.px};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const ContactsItemName = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.heavy};
`;
