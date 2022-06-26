import { useMutation, useQuery } from "react-query";
import { useSetupQueryClient } from "../../queryClient";
import { supabase, Tables } from "../supabase";
import { definitions } from "../types";
import { ChatParticipant } from "./chatParticipants";
import { UnparsedJsonMessage } from "./messages";
import { User } from "./users";

export type Chat = definitions[Tables.Chats];

export interface useChatsOptions {
  includeLastMessage?: boolean;
}

export interface MessageWithChat extends UnparsedJsonMessage {
  chat: Chat;
}

export function useChats({ includeLastMessage = false }: useChatsOptions) {
  return useQuery<Chat[] | null>(Tables.Chats, async () => {
    const user = supabase.auth.user();
    if (!user) throw new Error("User not logged in");

    if (includeLastMessage) {
      const { data, error } = await supabase
        .from(Tables.Chats)
        .select(
          `
          max(cp.messages.createdAt), 
          cp:chat_participants_chatId_fkey(
            *,
            messages: messages(*)
          )
        `,
          {}
        )
        .eq(`cp.userId`, user.id);

      if (error) throw error;

      return data;
    }

    const { data, error } = await supabase.from<Chat>(Tables.Chats).select("*");
    if (error) throw error;
    return data;
  });
}

export interface useChatOptions {
  id: string;
}

export function useChat({ id }: useChatOptions) {
  return useQuery<Chat | null>([Tables.Chats, id], async () => {
    const user = supabase.auth.user();
    if (!user) throw new Error("User not logged in");

    const { data, error } = await supabase
      .from<Chat>(Tables.Chats)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  });
}

export interface CreateChat {
  users: User[];
}

export function useCreateChat() {
  const queryClient = useSetupQueryClient();

  return useMutation<Chat, unknown, CreateChat>(async ({ users }) => {
    const user = supabase.auth.user();
    if (!user) throw new Error("User not logged in");

    const { data: chat, error: chatError } = await supabase
      .from<Chat>(Tables.Chats)
      .insert([{}])
      .single();

    if (chatError) throw chatError;

    queryClient.setQueryData([Tables.Chats, chat.id], chat);

    const { data: chatParticipants, error: chatParticipantsError } =
      await supabase
        .from<ChatParticipant>(Tables.ChatParticipants)
        .insert([
          { chatId: chat?.id, userId: user.id },
          ...users.map((it) => ({ chatId: chat?.id, userId: it.id })),
        ]);

    if (chatParticipantsError) throw chatParticipantsError;

    chatParticipants.forEach((it) =>
      queryClient.setQueryData(
        [Tables.ChatParticipants, it.id],
        chatParticipants
      )
    );

    return chat;
  });
}

export function useCheckChatExists(otherUser?: User) {
  return useQuery<Chat | null>(
    "checkChatExists",
    async () => {
      if (!otherUser) throw new Error("otherUser is required");

      const user = supabase.auth.user();
      if (!user || !user.phone) return null;

      const phoneNumbers = [user.phone, otherUser.phoneNumber];

      const { data, error } = await supabase
        .from<Chat>(Tables.Chats)
        .select(
          `
          cp1:chat_participants {
            user {
              phoneNumber
            }
          }
          cp2:chat_participants {
            user {
              phoneNumber
            }
          }
        `
        )
        // @ts-ignore
        .in("cp1.user.phoneNumber", phoneNumbers)
        // @ts-ignore
        .in("cp2.user.phoneNumber", phoneNumbers)
        .eq("isGroup", false)
        .single();
      console.log(data);
      if (error) throw error;

      return data;
    },
    { enabled: otherUser !== undefined }
  );
}
