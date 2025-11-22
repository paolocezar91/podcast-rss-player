import React from "react";
import { Pause, Play } from "lucide-react";

type Props = {
  playing: boolean;
  onToggle: () => void;
  iconSize?: number;
};

const PlayPauseButton = ({ playing, onToggle, iconSize }: Props) => {
  return (
    <button
      className="bg-black/10 hover:bg-black/20 p-2 rounded-2xl"
      type="button"
      onClick={onToggle}
    >
      {playing ? (
        <Pause size={iconSize} fill="white" color="white" />
      ) : (
        <Play size={iconSize} fill="white" color="white" />
      )}
    </button>
  );
};

export default PlayPauseButton;
