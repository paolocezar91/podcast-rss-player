import React from "react";
import { Cog } from "lucide-react";

type Props = {
  open: boolean;
  onToggle: () => void;
  playbackRate: number;
  onSetPlaybackRate: (rate: number) => void;
};

const Settings = ({
  open,
  onToggle,
  playbackRate,
  onSetPlaybackRate,
}: Props) => {
  return (
    <div className="relative flex items-center">
      <button onClick={onToggle}>
        <Cog color="white" />
      </button>
      {open && (
        <div className="absolute bottom-0 right-0 mb-8 bg-black/80 rounded-lg flex flex-col">
          <div className="text-white text-xs border-b-2 border-solid border-white px-4 py-2">
            Speed
          </div>
          {[1, 1.5, 2].map((speed) => {
            return (
              <button
                className="w-full text-white text-xs hover:bg-gray-500 data-[active=true]:bg-gray-300 data-[active=true]:text-black px-4 py-1"
                type="button"
                onClick={() => onSetPlaybackRate(speed)}
                data-active={playbackRate === speed}
                key={speed}
              >
                {speed}x
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Settings;
