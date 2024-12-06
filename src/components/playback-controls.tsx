import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react";
import { Slider } from "./ui/slider";
import { calculateSliderValue, cn, formatTime } from "@/lib/utils";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { Button } from "./ui/button";

const PlaybackControls = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    seekTo,
    playPause,
    nextSong,
    prevSong,
  } = useMusicPlayer();
  const totalDuration = currentSong?.duration || 0;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-4">
        <Button onClick={() => console.log("Shuffle")} disabled>
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button onClick={prevSong}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button onClick={playPause} isPlay>
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button onClick={nextSong}>
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button onClick={() => console.log("Skip forward")} disabled>
          <Repeat className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={cn(
          "flex items-center space-x-2 px-7 w-[100%]",
          currentSong && "w-[121%] px-0"
        )}
      >
        {currentSong && (
          <span className="text-xs w-12 text-right">
            {formatTime(currentTime)}
          </span>
        )}
        <Slider
          className="flex-1"
          value={[calculateSliderValue(currentTime, totalDuration)]}
          onValueChange={(value) => seekTo((value[0] * totalDuration) / 100)}
          max={100}
          step={1}
        />
        {currentSong && (
          <span className="text-xs w-12">{formatTime(totalDuration)}</span>
        )}
      </div>
    </div>
  );
};

export default PlaybackControls;
