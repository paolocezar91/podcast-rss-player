// biome-ignore lint/style/useImportType:
import { YoutubePlayerElement, YoutubePlaylistModel } from "@/types/youtube";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const initialState = {
  src: "",
  pip: false,
  playing: false,
  controls: true,
  light: false,
  volume: 1,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  seeking: false,
  loadedSeconds: 0,
  playedSeconds: 0,
};

type PlayerState = Omit<typeof initialState, "src"> & {
  src?: string;
};

const YoutubePlaylistPlayer = ({
  playlist,
  onApiChange,
}: {
  playlist: YoutubePlaylistModel;
  onApiChange?: (api: YT.Player | null) => void;
}) => {
  const playerRef = useRef<YoutubePlayerElement | null>(null);
  const [state, setState] = useState<PlayerState>(initialState);

  useEffect(() => {
    const load = (src?: string) => {
      setState((prevState) => ({
        ...prevState,
        src,
        played: 0,
        loaded: 0,
        pip: false,
        playing: false,
      }));
    };

    load(playlist.url);
  }, [playlist]);

  const handleRateChange = () => {
    const player = playerRef.current;
    if (!player) return;

    setState((prevState) => ({
      ...prevState,
      playbackRate: player.playbackRate,
    }));
  };

  const handlePlay = () => {
    setState((prevState) => ({ ...prevState, playing: true }));
  };

  const handlePause = () => {
    setState((prevState) => ({ ...prevState, playing: false }));
  };

  const handleProgress = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking || !player.buffered?.length) return;

    setState((prevState) => ({
      ...prevState,
      loadedSeconds: player.buffered?.end(player.buffered?.length - 1),
      loaded:
        player.buffered?.end(player.buffered?.length - 1) / player.duration,
    }));
  };

  const handleTimeUpdate = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking) return;

    if (!player.duration) return;

    setState((prevState) => ({
      ...prevState,
      playedSeconds: player.currentTime,
      played: player.currentTime / player.duration,
    }));
  };

  const handleEnded = () => {
    setState((prevState) => ({ ...prevState, playing: prevState.loop }));
  };

  const handleDurationChange = () => {
    const player = playerRef.current;
    if (!player) return;

    setState((prevState) => ({ ...prevState, duration: player.duration }));
  };

  const setPlayerRef = useCallback(
    (player: YoutubePlayerElement) => {
      if (!player) return;
      // widen the type for the ref so we can access `.api`
      const p = player as YoutubePlayerElement;
      playerRef.current = p;

      // If api already present, notify parent
      if (p.api) {
        onApiChange?.(p.api as YT.Player);
      }

      // Listen for the element's loadcomplete event which indicates the
      // internal YouTube API is ready and assigned to `element.api`.
      const onLoadComplete = () => {
        onApiChange?.(p.api as YT.Player);
      };

      p.addEventListener?.("loadcomplete", onLoadComplete as EventListener);

      // store cleanup fn on the element so other code (or next ref) can
      // call it if needed
      (p as any).__onApiCleanup = () => {
        p.removeEventListener?.(
          "loadcomplete",
          onLoadComplete as EventListener
        );
        onApiChange?.(null);
      };
    },
    [onApiChange]
  );

  const {
    src,
    playing,
    controls,
    light,
    volume,
    muted,
    loop,
    playbackRate,
    pip,
  } = state;

  return (
    <div className="flex flex-row w-full">
      <section className="flex-1 w-1/2">
        <div className="player-wrapper relative bg-gray-300 w-full">
          <ReactPlayer
            ref={setPlayerRef}
            className="react-player"
            style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
            src={src}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onLoadStart={() => console.log("onLoadStart")}
            onReady={() => console.log("onReady")}
            onStart={(e) => console.log("onStart", e)}
            onPlay={handlePlay}
            onPause={handlePause}
            onRateChange={handleRateChange}
            onSeeking={(e) => console.log("onSeeking", e)}
            onSeeked={(e) => console.log("onSeeked", e)}
            onEnded={handleEnded}
            onError={(e) => console.log("onError", e)}
            onTimeUpdate={handleTimeUpdate}
            onProgress={handleProgress}
            onDurationChange={handleDurationChange}
          />
          {/* <div className="w-full flex flex-col relative">
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
              <div className="grow" />
              <Settings
                open={openSettings}
                onToggle={handleOpenSettings}
                playbackRate={playbackRate}
                onSetPlaybackRate={handleSetPlaybackRate}
              />
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default YoutubePlaylistPlayer;
