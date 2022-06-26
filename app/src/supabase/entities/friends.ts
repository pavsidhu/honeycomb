import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase, Tables } from "../supabase";
import { definitions } from "../types";
import { User } from "./users";

export type Friend = definitions[Tables.Friends];

export function useCurrentUsersFriends() {
  return useQuery<Friend[]>("currentUserFriends", async () => {
    const user = supabase.auth.user();
    if (!user) throw new Error("User is not signed in");

    const { data, error } = await supabase
      .from<Friend>(Tables.Friends)
      .select()
      .or(`firstUser.eq.${user.id},secondUser.eq.${user.id}`);

    if (error) throw error;

    return data ?? [];
  });
}

export interface AddFriend {
  phoneNumbers: string[];
}

export function useAddFriends() {
  const queryClient = useQueryClient();

  return useMutation<Friend[], unknown, AddFriend>(
    async ({ phoneNumbers }) => {
      const user = supabase.auth.user();
      if (!user) throw new Error("User is not signed in");

      const { data: userIds, error: userIdsErrors } = await supabase
        .from<User>(Tables.Users)
        .select("id")
        .in("phoneNumber", phoneNumbers);

      if (!userIds) return [];
      if (userIdsErrors) throw userIdsErrors;

      const { data: friends, error: friendsErrors } = await supabase
        .from<Friend>(Tables.Friends)
        .insert(
          userIds.map((friend) => ({
            firstUser: user.id,
            secondUser: friend.id,
          }))
        );

      if (friendsErrors) throw friendsErrors;

      return friends ?? [];
    },
    {
      onSuccess: (friends) => {
        queryClient.setQueryData(["friends"], friends);
      },
    }
  );
}
