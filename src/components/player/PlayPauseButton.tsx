import React from "react";
import { Pause, Play } from "lucide-react";
import { twMerge as cn } from "tailwind-merge";

type Props = {
  playing: boolean;
  onToggle: () => void;
  iconSize?: number;
  className?: string;
};

const PlayPauseButton = ({
  playing,
  onToggle,
  iconSize,
  className = "",
}: Props) => {
  return (
    <button
      className={cn("bg-black/10 hover:bg-black/20 p-2 rounded-2xl", className)}
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
