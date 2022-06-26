import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { InputAccessoryView, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import TextInput from "../../../components/TextInput";
import { useCurrentChatParticipant } from "../../../supabase/entities/chatParticipants";
import {
  MessageContentType,
  useChatMessages,
  useSendChatMessage,
} from "../../../supabase/entities/messages";
import HomeRoutes, { HomeRoutesParamList } from "../HomeRoutes";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export type ChatProps = NativeStackScreenProps<
  HomeRoutesParamList,
  HomeRoutes.Chat
>;

export default function Chat(props: ChatProps) {
  const { chatId } = props.route.params;

  const { data: messages } = useChatMessages({ chatId });
  const { data: currentChatParticipant } = useCurrentChatParticipant({
    chatId,
  });

  const { mutate: sendMessage } = useSendChatMessage({
    chatId,
    chatParticipantId: currentChatParticipant?.id,
  });

  return (
    <Root>
      <KeyboardAvoidingView behavior="padding">
        <MessageList messages={messages} />

        <MessageInput
          onSubmit={(text) =>
            sendMessage({
              data: text,
              type: MessageContentType.Text,
            })
          }
        />
      </KeyboardAvoidingView>
    </Root>
  );
}

const Root = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.default};
`;
