import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import {
  Message,
  MessageContentType,
} from "../../../supabase/entities/messages";

export interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble(props: MessageBubbleProps) {
  const { message } = props;
  const { type, data } = message.content;

  const theme = useTheme();

  switch (type) {
    case MessageContentType.Text: {
      return (
        <Root
          colors={[
            theme.colors.common.pink.light,
            theme.colors.common.pink.dark,
          ]}
        >
          <MessageText>{data}</MessageText>
        </Root>
      );
    }

    case MessageContentType.Photo: {
      return null;
    }

    default: {
      throw new Error(`Unknown message type: ${message.content.type}`);
    }
  }
}

const Root = styled(LinearGradient)`
  border-radius: 12px;
  padding: 12px;
  margin-top: 24px;
`;

const MessageText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
`;
