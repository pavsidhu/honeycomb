import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import BackIcon from "../../../../assets/images/icons/back.svg";
import Avatar from "../../../components/Avatar/Avatar";
import IconButton from "../../../components/IconButton";
import { useChat } from "../../../supabase/entities/chats";

export default function ChatHeader(props: NativeStackHeaderProps) {
  const { chatId } = props.route.params;
  const { data: chat } = useChat({ id: chatId });

  return (
    <Root>
      <SafeAreaView>
        <Contents>
          <IconButton
            onPress={props.navigation.goBack}
            variant="icon-only"
            style={{ marginRight: 16 }}
          >
            <BackIcon />
          </IconButton>

          <Avatar uri={null} size={32} />
          <Name>{chat?.name}</Name>
        </Contents>
      </SafeAreaView>
    </Root>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.default};
`;

const Contents = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

const Name = styled.Text`
  flex: 1;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
