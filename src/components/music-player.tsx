import { cn } from "@/lib/utils";
import { NowPlaying } from "./now-playing";
import { MusicControl } from "./music-control";
import { VolumeControl } from "./volume-control";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";

export const MusicPlayer = () => {
  const { songId, setSongId } = useMusicPlayerStore();

  return (
    !!songId && (
      <div
        className={cn(
          "relative flex items-center justify-between border-t px-6 py-4"
        )}
        onDoubleClick={() => setSongId(0)}
      >
        <NowPlaying songId={songId} />
        <MusicControl />
        <VolumeControl />
      </div>
    )
  );
};
