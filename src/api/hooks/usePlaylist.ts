import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { Playlist, Song } from "@/types";

// Fetch all playlists
export const usePlaylistsQuery = () => {
  return useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/playlists");
      return data;
    },
  });
};

// Fetch single playlist with songs
export const usePlaylistQuery = (playlistId: number) => {
  return useQuery<Playlist>({
    queryKey: ["playlist", playlistId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/playlists/${playlistId}`);
      return data;
    },
    enabled: !!playlistId,
  });
};

// Shuffle playlist songs
export const useShufflePlaylist = (playlistId: number) => {
  const query = useQueryClient();
  return () => {
    let songs: Song[] = [];
    query.setQueryData(["playlist", playlistId], (oldPlaylist: Playlist) => {
      songs = oldPlaylist.songs.sort(() => Math.random() - 0.5);
      return {
        ...oldPlaylist,
        songs,
      };
    });
    return songs;
  };
};

// Create new playlist
export const useCreatePlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPlaylist: Omit<Playlist, "id">) => {
      const { data } = await axiosInstance.post("/playlists", newPlaylist);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};

// Update playlist
export const useUpdatePlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updatedPlaylist }: Playlist) => {
      const { data } = await axiosInstance.put(
        `/playlists/${id}`,
        updatedPlaylist
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist", variables.id] });
    },
  });
};

// Delete playlist
export const useDeletePlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playlistId: number) => {
      await axiosInstance.delete(`/playlists/${playlistId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};
