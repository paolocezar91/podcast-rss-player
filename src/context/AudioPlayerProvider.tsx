// AudioPlayerContext.tsx
import { PlayerState } from "@/components/player/AudioPlayer";
import ProgressBar from "@/components/player/ProgressBar";
import { PodcastFeedItem } from "@/types/rss-feed";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Settings from "@/components/player/Settings";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { WordpressPost } from "@/types/wp";
import { MediaItem } from "@/types/media";

interface AudioPlayerState {
  src: string;
  playing: boolean;
  volume: number;
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
  loadedSeconds: number;
  playedSeconds: number;
  currentMedia?: MediaItem;
}

interface AudioPlayerContextType {
  state: AudioPlayerState;
  play: (media?: MediaItem) => void;
  pause: () => void;
  togglePlay: (media?: MediaItem) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  seekTo: (seconds: number) => void;
  seekByPercentage: (percentage: number) => void;
  isCurrentPost: (item: WordpressPost) => boolean;
  isCurrentPodcast: (item: PodcastFeedItem) => boolean;
  toggleShow: (value?: boolean) => void;
}

const initialState: AudioPlayerState = {
  src: "",
  playing: false,
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
  currentMedia: undefined,
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>(initialState);
  const [lastSetVolume, setLastSetVolume] = useState<number>(1);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // This effect runs whenever the location (including hash) changes
    const player = playerRef.current;
    const timestamp = location.hash.split("#timestamp=")[1];
    if (player && !isNaN(player.duration) && timestamp) {
      const seconds = timeStringToSeconds(timestamp);
      player.currentTime = seconds;
      setState((prevState) => ({
        ...prevState,
        played: seconds,
        playing: true,
      }));
    }
  }, [location]);

  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    playerRef.current = player;
  }, []);

  const play = useCallback((mediaItem?: MediaItem) => {
    if (mediaItem) {
      const url = mediaItem?.link;
      if (url) {
        setState((prev) => ({
          ...prev,
          src: url,
          currentMedia: mediaItem,
          playing: true,
          played: 0,
        }));
        return;
      }
    }

    setState((prev) => ({ ...prev, playing: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, playing: false }));
  }, []);

  const togglePlay = useCallback(
    (media?: MediaItem) => {
      if (!media) {
        setState((prev) => ({ ...prev, playing: !prev.playing }));
        return;
      }

      // It's a MediaItem
      const isSameMedia = state.currentMedia?.id === media.id;

      if (isSameMedia) {
        setState((prev) => ({ ...prev, playing: !prev.playing }));
      } else if (media.src) {
        setState((prev) => ({
          ...prev,
          src: media.src!,
          currentMedia: media,
          playing: true,
          played: 0,
        }));
      }
    },
    [state.currentMedia]
  );

  const setVolume = useCallback((volume: number) => {
    setLastSetVolume(volume);
    setState((prev) => ({
      ...prev,
      muted: false,
      volume,
    }));
  }, []);

  const setMuted = useCallback(
    (muted: boolean) => {
      setState((prev) => ({
        ...prev,
        muted,
        volume: muted ? 0 : lastSetVolume,
      }));
    },
    [lastSetVolume]
  );

  const setPlaybackRate = useCallback((playbackRate: number) => {
    setState((prev) => ({ ...prev, playbackRate }));
  }, []);

  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = seconds;
      setState((prev) => ({
        ...prev,
        playedSeconds: seconds,
        played: seconds / prev.duration,
      }));
    }
  }, []);

  const seekByPercentage = useCallback((percentage: number) => {
    if (playerRef.current && playerRef.current.duration) {
      const seconds = percentage * playerRef.current.duration;
      playerRef.current.currentTime = seconds;
      setState((prev) => ({
        ...prev,
        played: percentage,
        playedSeconds: seconds,
      }));
    }
  }, []);

  const isCurrentPost = useCallback(
    (item: WordpressPost) => {
      return state.currentMedia?.title === item.title;
    },
    [state.currentMedia]
  );

  const isCurrentPodcast = useCallback(
    (item: PodcastFeedItem) => {
      return state.currentMedia?.title === item.title;
    },
    [state.currentMedia]
  );

  // Player event handlers
  const handlePlay = useCallback(() => {
    setState((prev) => ({ ...prev, playing: true }));
  }, []);

  const handlePause = useCallback(() => {
    setState((prev) => ({ ...prev, playing: false }));
  }, []);

  const handleProgress = useCallback(() => {
    const player = playerRef.current;
    if (!player || state.seeking || !player.buffered?.length) return;

    setState((prev) => ({
      ...prev,
      loadedSeconds: player.buffered?.end(player.buffered?.length - 1),
      loaded:
        player.buffered?.end(player.buffered?.length - 1) / player.duration,
    }));
  }, [state.seeking]);

  const handleTimeUpdate = useCallback(() => {
    const player = playerRef.current;
    if (!player || state.seeking) return;
    if (!player.duration) return;

    setState((prev) => ({
      ...prev,
      playedSeconds: player.currentTime,
      played: player.currentTime / player.duration,
    }));
  }, [state.seeking]);

  const handleDurationChange = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    setState((prev) => ({ ...prev, duration: player.duration }));
  }, []);

  const handleEnded = useCallback(() => {
    setState((prev) => ({ ...prev, playing: prev.loop }));
  }, []);

  const handleRateChange = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    setState((prev) => ({ ...prev, playbackRate: player.playbackRate }));
  }, []);

  // ProgressBar event handlers
  const handleSeekMouseDown = useCallback(() => {
    setState((prev) => ({ ...prev, seeking: true }));
  }, []);

  const handleSeekChange = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const inputTarget = event.target as HTMLInputElement;
      setState((prev) => ({
        ...prev,
        played: Number.parseFloat(inputTarget.value),
      }));
    },
    []
  );

  const handleSeekMouseUp = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const inputTarget = event.target as HTMLInputElement;
      setState((prev) => ({ ...prev, seeking: false }));
      if (playerRef.current) {
        playerRef.current.currentTime =
          Number.parseFloat(inputTarget.value) * playerRef.current.duration;
      }
    },
    []
  );

  const handleToggleMuted = useCallback(() => {
    setMuted(!state.muted);
  }, [state.muted, setMuted]);

  const handleVolumeChange = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const inputTarget = event.target as HTMLInputElement;
      setVolume(Number.parseFloat(inputTarget.value));
    },
    [setVolume]
  );

  const handleOpenSettings = useCallback(() => {
    setOpenSettings((prev) => !prev);
  }, []);

  const handleSetPlaybackRate = useCallback(
    (playbackRate: number) => {
      setPlaybackRate(playbackRate);
    },
    [setPlaybackRate]
  );

  const toggleShow = useCallback(
    (value?: boolean) => {
      setShow((prev) => value ?? !prev);
      pause();
    },
    [setShow, pause]
  );

  const contextValue: AudioPlayerContextType = {
    state,
    play,
    pause,
    togglePlay,
    setVolume,
    setMuted,
    setPlaybackRate,
    seekTo,
    seekByPercentage,
    isCurrentPodcast,
    isCurrentPost,
    toggleShow,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
      {/* Global Audio Player */}
      {
        <div
          className={`flex flex-row w-full fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${
            !show ? "hidden" : ""
          }`}
        >
          <div className="player-wrapper relative bg-gray-300 w-full">
            {state.src && (
              <ReactPlayer
                ref={setPlayerRef}
                className="react-player"
                style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                src={state.src}
                playing={state.playing}
                volume={state.volume}
                muted={state.muted}
                playbackRate={state.playbackRate}
                loop={state.loop}
                onPlay={handlePlay}
                onPause={handlePause}
                onProgress={handleProgress}
                onDurationChange={handleDurationChange}
                onEnded={handleEnded}
                onRateChange={handleRateChange}
                onTimeUpdate={handleTimeUpdate}
              />
            )}
            <ProgressBar
              playerState={state as PlayerState}
              handlePlayPause={() => togglePlay()}
              handleSeekChange={handleSeekChange}
              handleSeekMouseDown={handleSeekMouseDown}
              handleSeekMouseUp={handleSeekMouseUp}
              handleToggleMuted={handleToggleMuted}
              handleVolumeChange={handleVolumeChange}
              settings={
                <Settings
                  open={openSettings}
                  onToggle={handleOpenSettings}
                  playbackRate={state.playbackRate}
                  onSetPlaybackRate={handleSetPlaybackRate}
                />
              }
            >
              <span
                title={`Now Playing: ${state.currentMedia?.title}`}
                className="text-white flex gap-1 w-64 p-2"
              >
                Now Playing:{" "}
                {state.currentMedia ? (
                  <strong>{state.currentMedia?.title}</strong>
                ) : (
                  " - "
                )}
              </span>
            </ProgressBar>
          </div>
        </div>
      }
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
};

function timeStringToSeconds(timeString: string): number {
  // Split the time string into parts
  const parts = timeString.split(":");

  // Handle different formats (HH:MM:SS, MM:SS, SS)
  let hours = 0,
    minutes = 0,
    seconds = 0;

  if (parts.length === 3) {
    // Format: HH:MM:SS
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
    seconds = parseInt(parts[2], 10);
  } else if (parts.length === 2) {
    // Format: MM:SS
    minutes = parseInt(parts[0], 10);
    seconds = parseInt(parts[1], 10);
  } else if (parts.length === 1) {
    // Format: SS
    seconds = parseInt(parts[0], 10);
  } else {
    throw new Error("Invalid time format. Expected HH:MM:SS, MM:SS, or SS");
  }

  // Validate the numbers
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error("Time components must be valid numbers");
  }

  if (minutes >= 60 || seconds >= 60) {
    throw new Error("Minutes and seconds must be less than 60");
  }

  // Calculate total seconds
  return hours * 3600 + minutes * 60 + seconds;
}
