// biome-ignore lint/style/useImportType:
import { PodcastFeedItem } from "@/types/rss-feed";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import ProgressBar from "./ProgressBar";
import Settings from "./Settings";

const initialState = {
  src: "",
  pip: false,
  playing: false,
  controls: false,
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

export type PlayerState = Omit<typeof initialState, "src"> & {
  src?: string;
};

const AudioPlayer = ({ podcast }: { podcast?: PodcastFeedItem }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<PlayerState>(initialState);
  const [lastSetVolume, setLastSetVolume] = useState<number>(1);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  useEffect(() => {
    const url = podcast?.enclosure?.url || podcast?.enclosure?._url;
    if (!url) return;

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

    load(url);
  }, [podcast]);

  const handlePlayPause = () => {
    setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };

  const handleVolumeChange = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const inputTarget = event.target as HTMLInputElement;
    setLastSetVolume(Number.parseFloat(inputTarget.value));

    setState((prevState) => ({
      ...prevState,
      muted: false,
      volume: Number.parseFloat(inputTarget.value),
    }));
  };

  const handleToggleMuted = () => {
    setState((prevState) => ({
      ...prevState,
      muted: !prevState.muted,
      volume: prevState.muted ? lastSetVolume : 0,
    }));
  };

  const handleSetPlaybackRate = (playbackRate: number) => {
    setState((prevState) => ({
      ...prevState,
      playbackRate,
    }));
  };

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

  const handleSeekMouseDown = () => {
    setState((prevState) => ({ ...prevState, seeking: true }));
  };

  const handleSeekChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const inputTarget = event.target as HTMLInputElement;
    setState((prevState) => ({
      ...prevState,
      played: Number.parseFloat(inputTarget.value),
    }));
  };

  const handleSeekMouseUp = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const inputTarget = event.target as HTMLInputElement;
    setState((prevState) => ({ ...prevState, seeking: false }));
    if (playerRef.current) {
      playerRef.current.currentTime =
        Number.parseFloat(inputTarget.value) * playerRef.current.duration;
    }
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

  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    playerRef.current = player;
  }, []);

  const handleOpenSettings = () => {
    setOpenSettings((prev) => !prev);
  };

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
        <div className="player-wrapper relative bg-gray-800 w-full">
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
          <ProgressBar
            playerState={state}
            handlePlayPause={handlePlayPause}
            handleSeekChange={handleSeekChange}
            handleSeekMouseDown={handleSeekMouseDown}
            handleSeekMouseUp={handleSeekMouseUp}
            handleToggleMuted={handleToggleMuted}
            handleVolumeChange={handleVolumeChange}
            settings={
              <Settings
                open={openSettings}
                onToggle={handleOpenSettings}
                playbackRate={playbackRate}
                onSetPlaybackRate={handleSetPlaybackRate}
              />
            }
          >
            <span
              title={`Now Playing: ${podcast?.title}`}
              className="text-white flex gap-1 w-64 p-2"
            >
              Now Playing: <strong>{podcast?.title}</strong>
            </span>
          </ProgressBar>
        </div>
      </section>
    </div>
  );
};

export default AudioPlayer;
