import { useSongQuery } from "@/api/hooks/useSong";

interface NowPlayingProps {
  songId: number;
}

export const NowPlaying = ({ songId }: NowPlayingProps) => {
  const { data: song } = useSongQuery(songId);

  return (
    <div className="flex items-center space-x-4 h-14">
      <div className="h-12 w-12 rounded-md bg-gray-200">
        {song?.coverUrl && (
          <img
            src={song.coverUrl}
            alt={`${song.title} album cover`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium">{song?.title || "Loading..."}</h3>
        {song && <p className="text-xs text-gray-500">{song.artist}</p>}
      </div>
    </div>
  );
};
