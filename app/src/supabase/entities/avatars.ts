import { useMutation, useQuery, useQueryClient } from "react-query";
import { decode } from "base64-arraybuffer";
import { Buckets, supabase } from "../supabase";

export interface Avatar {
  uri: string;
}

const AVATAR_FILENAME = "avatar.jpg";

export function useCurrentUserAvatar() {
  return useQuery<Avatar | null>("currentUserAvatar", async () => {
    const user = supabase.auth.user();

    if (!user) return null;

    const path = `${user.id}/${AVATAR_FILENAME}`;

    const { data, error } = supabase.storage
      .from(Buckets.Avatars)
      .getPublicUrl(path);

    if (error) throw error;
    if (!data) throw new Error("Data not defined");

    return { uri: data.publicURL };
  });
}

export interface useAvatarOptions {
  userId: string;
}

export function useAvatar({ userId }: useAvatarOptions) {
  return useQuery<Avatar | null>(["avatar", userId], async () => {
    const path = `${userId}/${AVATAR_FILENAME}`;

    const { data, error } = supabase.storage
      .from(Buckets.Avatars)
      .getPublicUrl(path);

    if (error) throw error;
    if (!data) throw new Error("Data not defined");

    return { uri: data.publicURL };
  });
}

// export function useChat({ userId }: useAvatarOptions) {
//   return useQuery<Avatar | null>(["avatar", userId], async () => {
//     const path = `${userId}/${AVATAR_FILENAME}`;

//     const { data, error } = supabase.storage
//       .from(Buckets.Avatars)
//       .getPublicUrl(path);

//     if (error) throw error;
//     if (!data) throw new Error("Data not defined");

//     return { uri: data.publicURL };
//   });
// }

export interface CreateAvatar {
  base64: string;
}

// TODO: move this to a function that generates different sizes
export function useCreateAvatar() {
  const queryClient = useQueryClient();

  return useMutation(
    async (avatar: CreateAvatar) => {
      const user = supabase.auth.user();

      if (!user) throw new Error("Cannot create avatar if not authenticated");

      const path = `${user.id}/${AVATAR_FILENAME}`;
      const arrayBuffer = decode(avatar.base64);

      const { data, error } = await supabase.storage
        .from(Buckets.Avatars)
        .upload(path, arrayBuffer);

      if (error) throw error;
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("currentUserAvatar", data);
      },
    }
  );
}
