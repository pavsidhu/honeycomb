import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuid } from "uuid";
import { supabase, Tables } from "../supabase";
import { definitions } from "../types";

export type UnparsedJsonMessage = definitions[Tables.Messages];

export type Message = Omit<UnparsedJsonMessage, "content"> & {
  content: MessageContent;
};

export interface MessageContent {
  data: string;
  type: MessageContentType;
}

export enum MessageContentType {
  Text,
  Photo,
}

const parseMessage = (message: UnparsedJsonMessage) => ({
  ...message,
  content: JSON.parse(message.content),
});

export interface useChatMessagesOptions {
  chatId: string;
}

export function useChatMessages({ chatId }: useChatMessagesOptions) {
  return useQuery<Message[]>([Tables.Messages, chatId], async () => {
    const { data, error } = await supabase
      .from<UnparsedJsonMessage>(Tables.Messages)
      .select("*")
      .eq("chatId", chatId)
      .order("created_at");

    if (error) throw error;

    const parsedData = data?.map(parseMessage);

    return parsedData ?? [];
  });
}

export interface useSendChatMessagesOptions {
  chatId: string;
  chatParticipantId?: string;
}

export function useSendChatMessage({
  chatId,
  chatParticipantId,
}: useSendChatMessagesOptions) {
  const queryClient = useQueryClient();

  return useMutation<Message | null, unknown, MessageContent>(
    async (messageContent) => {
      const user = supabase.auth.user();

      if (!user) throw new Error("Cannot create avatar if not authenticated");

      const { data, error } = await supabase
        .from<UnparsedJsonMessage>(Tables.Messages)
        .insert([
          {
            chatId,
            chatParticipantId,
            content: JSON.stringify(messageContent),
          },
        ])
        .single();

      if (error) throw error;

      return data ? parseMessage(data) : data;
    },
    {
      onMutate: (messageContent) => {
        queryClient.setQueryData<Message[]>(
          [Tables.Messages, chatId],
          (messages) => {
            if (!chatParticipantId) {
              throw new Error("chatParticipantId is not defined");
            }
            const message: Message = {
              id: uuid(),
              chatId,
              chatParticipantId,
              content: messageContent,
              created_at: new Date().toISOString(),
            };

            if (!messages) return [message];

            return [...messages, message];
          }
        );
      },
    }
  );
}
