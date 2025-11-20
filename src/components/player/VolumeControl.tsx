import React from "react";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";

type Props = {
  volume: number;
  muted: boolean;
  onToggleMuted: () => void;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};

const VolumeControl = ({ volume, muted, onToggleMuted, onChange }: Props) => {
  return (
    <div className="div flex items-center gap-2 bg-black/10 hover:bg-black/20 p-2 rounded-2xl">
      <button onClick={onToggleMuted}>
        {muted ? (
          <VolumeX fill="white" color="white" />
        ) : volume === 0 ? (
          <Volume fill="white" color="white" />
        ) : volume <= 0.5 ? (
          <Volume1 fill="white" color="white" />
        ) : (
          <Volume2 fill="white" color="white" />
        )}
      </button>
      <input
        className="w-22"
        style={{ accentColor: "white" }}
        id="volume"
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={onChange}
      />
    </div>
  );
};

export default VolumeControl;
