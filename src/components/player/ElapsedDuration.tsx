import React from "react";
import Duration from "./Duration";

type Props = {
  duration: number;
  played: number;
};

const ElapsedDuration = ({ duration, played }: Props) => {
  return (
    <div className="flex items-center gap-1 bg-black/10 hover:bg-black/20 p-2 rounded-2xl text-white">
      <strong id="elapsed">
        <Duration seconds={duration * played} />
      </strong>
      <strong>/</strong>
      <strong id="duration">
        <Duration seconds={duration} />
      </strong>
    </div>
  );
};

export default ElapsedDuration;
