import { PlayerState } from "./AudioPlayer";
import ElapsedDuration from "./ElapsedDuration";
import InterativeProgressBar from "./InterativeProgressBar";
import PlayPauseButton from "./PlayPauseButton";
import VolumeControl from "./VolumeControl";

interface ProgressBarProps {
  children: React.ReactElement;
  playerState: PlayerState;
  settings?: React.ReactElement;
  handleToggleMuted: () => void;
  handlePlayPause: () => void;
  handleSeekMouseDown: () => void;
  handleSeekChange: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void;
  handleSeekMouseUp: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void;
  handleVolumeChange: (
    e: React.SyntheticEvent<HTMLInputElement, Event>
  ) => void;
}

export default function ProgressBar({
  children,
  playerState,
  settings,
  handleToggleMuted,
  handlePlayPause,
  handleSeekMouseDown,
  handleSeekChange,
  handleSeekMouseUp,
  handleVolumeChange,
}: ProgressBarProps) {
  const { playing, volume, muted, played, loaded, duration } = playerState;

  return (
    <div className="w-full flex flex-col relative">
      <InterativeProgressBar
        loaded={loaded}
        played={played}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
      <div className="flex items-center gap-2 p-2 bg-black/20">
        <PlayPauseButton playing={playing} onToggle={handlePlayPause} />
        <VolumeControl
          volume={volume}
          muted={muted}
          onToggleMuted={handleToggleMuted}
          onChange={handleVolumeChange}
        />
        <ElapsedDuration duration={duration} played={played} />
        <div className="overflow-hidden flex bg-black/10 hover:bg-black/20 rounded-2xl">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {children}
          </div>
          <div className="grow"></div>
        </div>
        <div className="grow" />
        {settings}
      </div>
    </div>
  );
}
