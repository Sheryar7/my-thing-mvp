"use client";

import React, { useState, useEffect } from "react";
import { 
  FiPlay, 
  FiPause, 
  FiVolume2, 
  FiVolumeX, 
  FiRotateCcw, 
  FiRotateCw 
} from "react-icons/fi";

interface MediaPreviewProps {
  durationInSeconds?: number;
  audioUrl?: string;
}

export function MediaPreview({ durationInSeconds = 45, audioUrl }: MediaPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Helper to format seconds into mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Playback timer simulation (Replace or sync with an <audio> element ref)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationInSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationInSeconds]);

  const progressPercent = (currentTime / durationInSeconds) * 100;
  const currentVolumePercent = isMuted ? 0 : volume * 100;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.min(Math.max(0, prev + seconds), durationInSeconds));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
        Preview
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl w-full shadow-sm">
        {/* Controls Container */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Skip Back 5s */}
          <button
            type="button"
            onClick={() => handleSkip(-5)}
            title="Rewind 5s"
            className="p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-200/60 active:scale-95"
          >
            <FiRotateCcw className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-11 h-11 bg-[#5D5FEF] hover:bg-[#4B4DDC] text-white rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-indigo-100"
          >
            {isPlaying ? (
              <FiPause className="w-5 h-5 fill-current" />
            ) : (
              <FiPlay className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Skip Forward 5s */}
          <button
            type="button"
            onClick={() => handleSkip(5)}
            title="Forward 5s"
            className="p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-200/60 active:scale-95"
          >
            <FiRotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Timestamp */}
        <div className="text-xs font-semibold text-slate-500 font-mono shrink-0 min-w-[70px]">
          {formatTime(currentTime)} / {formatTime(durationInSeconds)}
        </div>

        {/* Audio Track Progress Slider */}
        <div className="flex-1 flex items-center w-full">
          <input
            type="range"
            min={0}
            max={durationInSeconds}
            value={currentTime}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #5D5FEF ${progressPercent}%, #E2E8F0 ${progressPercent}%)`,
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none player-slider"
          />
        </div>

        {/* Volume Controls */}
        <div className="hidden md:flex items-center gap-2 shrink-0 border-l border-slate-200 pl-4 ml-1">
          <button
            type="button"
            onClick={toggleMute}
            className="text-slate-500 hover:text-slate-800 transition-colors p-1"
          >
            {isMuted || volume === 0 ? (
              <FiVolumeX className="w-4 h-4" />
            ) : (
              <FiVolume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            style={{
              background: `linear-gradient(to right, #5D5FEF ${currentVolumePercent}%, #E2E8F0 ${currentVolumePercent}%)`,
            }}
            className="w-20 h-1.5 rounded-lg appearance-none cursor-pointer outline-none player-slider"
          />
        </div>
      </div>

      {/* Embedded Styles matching your custom slider styling */}
      <style jsx>{`
        .player-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #5d5fef;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: transform 0.1s ease;
        }
        .player-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .player-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #5d5fef;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}