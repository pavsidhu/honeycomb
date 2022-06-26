import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export const supabase = createClient(
  Constants.manifest.extra?.supabaseUrl,
  Constants.manifest.extra?.supabaseAnonKey,
  {
    localStorage: AsyncStorage,
    detectSessionInUrl: false,
  }
);

export enum Tables {
  Users = "users",
  Friends = "friends",
  Chats = "chats",
  ChatParticipants = "chat_participants",
  Messages = "messages",
}

export enum Buckets {
  Avatars = "avatars",
}
