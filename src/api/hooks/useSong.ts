import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axios';

// Types (adjust as per your backend)
interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url?: string;
  coverUrl?: string;
  playlistId: number;
}

// Fetch songs in a playlist
export const useSongsQuery = (playlistId: number) => {
  return useQuery<Song[]>({
    queryKey: ['songs', playlistId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/playlists/${playlistId}/songs`);
      return data;
    },
    enabled: !!playlistId
  });
};

// Create new song
export const useCreateSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSong: Omit<Song, 'id'>) => {
      const { data } = await axiosInstance.post('/songs', newSong);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['songs', variables.playlistId] });
    }
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
      queryClient.invalidateQueries({ queryKey: ['songs', variables.playlistId] });
    }
  });
};

// Delete song
export const useDeleteSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ songId, playlistId }: { songId: number; playlistId: number }) => {
      await axiosInstance.delete(`/songs/${songId}`);
      return { songId, playlistId };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['songs', variables.playlistId] });
    }
  });
};
