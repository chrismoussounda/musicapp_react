import { Volume2 } from "lucide-react";
import { Slider } from "./ui/slider";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";

const VolumeControl = () => {
  const { setVolume, volume } = useMusicPlayerStore();
  return (
    <div className="flex items-center space-x-2">
      <Volume2 className="h-4 w-4" />
      <Slider
        className="w-[100px]"
        defaultValue={[volume]}
        max={100}
        step={1}
        onValueChange={(value) => setVolume(value[0])}
      />
    </div>
  );
};

export default VolumeControl;
