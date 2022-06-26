import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled, { useTheme } from "styled-components/native";
import Avatar from "../../../components/Avatar/Avatar";
import { Chat } from "../../../supabase/entities/chats";
import {
  Message,
  MessageContentType,
} from "../../../supabase/entities/messages";

function getMessagePreviewText(message?: Message) {
  if (!message) return "";

  switch (message.content.type) {
    case MessageContentType.Text: {
      return message.content.data;
    }

    case MessageContentType.Photo: {
      // TODO: add name
      return "sent a photo";
    }

    default: {
      throw new Error(`Unknown message type: ${message.content.type}`);
    }
  }
}

export interface ChatListItemProps {
  chat: Chat;
  lastMessage?: Message;
  onPress: () => void;
}

export default function ChatListItem(props: ChatListItemProps) {
  const { chat, lastMessage, onPress } = props;

  const theme = useTheme();

  const messagePreviewText = getMessagePreviewText(lastMessage);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Avatar
          uri="https://miro.medium.com/fit/c/176/176/2*QAgoJK39qU2gHYhDD16OUQ.jpeg"
          active={true}
        />

        <Details>
          <DetailsHeader>
            <Name>{chat.name}</Name>
            <LastMessageTime>19:30</LastMessageTime>
          </DetailsHeader>

          <DetailsContent>
            <MessageText>{messagePreviewText}</MessageText>

            <UnreadIndicator
              colors={[
                theme.colors.common.blue.light,
                theme.colors.common.blue.dark,
              ]}
            />
          </DetailsContent>
        </Details>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 0 24px 24px;
`;

const Details = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const DetailsHeader = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.heavy};
`;

const LastMessageTime = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DetailsContent = styled.View`
  flex: 1;
  flex-direction: row;
`;

const MessageText = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 22px;
`;

const UnreadIndicator = styled(LinearGradient)`
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  margin-left: 24px;
  margin-top: 8px;
`;
