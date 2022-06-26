import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Contacts from "expo-contacts";
import { supabase, Tables } from "../supabase";
import { definitions } from "../types";
import getLocalPhoneNumbers from "../../utils/getLocalPhoneNumbers";

export type User = definitions[Tables.Users];

export function useCurrentUser() {
  return useQuery<User | null>("currentUser", async () => {
    const user = supabase.auth.user();
    if (!user) return null;

    const { data, error } = await supabase
      .from<User>(Tables.Users)
      .select()
      .eq("id", user.id)
      .single();

    if (error) throw error;

    return data;
  });
}

export type CreateUser = Omit<User, "createdAt">;

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<User | null, unknown, CreateUser>(
    async (user) => {
      const { data, error } = await supabase
        .from<User>(Tables.Users)
        .insert([user])
        .single();

      if (error) throw error;

      return data;
    },
    {
      onSuccess: (user) => {
        queryClient.setQueryData(["currentUser"], user);
      },
    }
  );
}

export function useUsersFromContacts() {
  return useQuery<User[] | null>("usersFromContacts", async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== Contacts.PermissionStatus.GRANTED) {
      throw new Error("Permission denied");
    }

    const phoneNumbers = await getLocalPhoneNumbers();

    const { data, error } = await supabase
      .from<User>(Tables.Users)
      .select()
      .in("phoneNumber", phoneNumbers);

    if (error) throw error;

    return data;
  });
}
