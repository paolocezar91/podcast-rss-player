import React from "react";

type Props = {
  loaded: number;
  played: number;
  onMouseDown: () => void;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onMouseUp: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};

const InterativeProgressBar = ({
  loaded,
  played,
  onMouseDown,
  onChange,
  onMouseUp,
}: Props) => {
  return (
    <>
      <div className="h-2 w-full bg-black/10">
        <div className="absolute z-1 w-full h-2">
          <div
            className="bg-black/30 h-2"
            style={{ width: `${loaded * 100}%` }}
          ></div>
        </div>
        <div className="absolute z-1 w-full h-2">
          <div
            className="bg-red-900 h-2"
            style={{ width: `${played * 100}%` }}
          ></div>
        </div>
        <input
          className="absolute z-2 w-full h-2 appearance-none bg-transparent outline-none focus:ring-0"
          style={{ accentColor: "red" }}
          id="seek"
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={onMouseDown}
          onChange={onChange}
          onMouseUp={onMouseUp}
        />
      </div>
    </>
  );
};

export default InterativeProgressBar;
