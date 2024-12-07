import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { Song } from "@/types";

// Fetch all songs
export const useSongsQuery = () => {
  return useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/songs`);
      return data;
    },
  });
};

// Fetch a single song
export const useSongQuery = (songId: number) => {
  const query = useQueryClient();
  const lastPlayedSongId = query.getQueryData(["last-played-song"]) as number;
  if (lastPlayedSongId !== songId) {
    query.setQueryData(["last-played-song"], songId);
  }
  return useQuery<Song>({
    queryKey: ["songs", songId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/songs/${songId}`);
      return data;
    },
    enabled: !!songId,
  });
};

// Create new song
export const useCreateSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSong: Omit<Song, "id">) => {
      const { data } = await axiosInstance.post("/songs", newSong);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["songs", variables.playlistId],
      });
    },
  });
};

// Update song
export const useUpdateSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updatedSong }: Song) => {
      const { data } = await axiosInstance.put(`/songs/${id}`, updatedSong);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["songs", variables.playlistId],
      });
    },
  });
};

// Delete song
export const useDeleteSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      songId,
      playlistId,
    }: {
      songId: number;
      playlistId: number;
    }) => {
      await axiosInstance.delete(`/songs/${songId}`);
      return { songId, playlistId };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["songs", variables.playlistId],
      });
    },
  });
};
