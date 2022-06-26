import { useQuery } from "react-query";
import { supabase, Tables } from "../supabase";
import { definitions } from "../types";

export type ChatParticipant = definitions["chat_participants"];

export interface useCurrentChatParticipantOptions {
  chatId: string;
}

export function useCurrentChatParticipant({
  chatId,
}: useCurrentChatParticipantOptions) {
  return useQuery<ChatParticipant | null>(
    ["currentChatParticipant", chatId],
    async () => {
      const user = supabase.auth.user();
      if (!user) return null;

      const { data, error } = await supabase
        .from<ChatParticipant>(Tables.ChatParticipants)
        .select("*")
        .eq("chatId", chatId)
        .eq("userId", user.id)
        .single();

      if (error) throw error;

      return data;
    }
  );
}
