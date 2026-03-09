"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";

const SPEED_OPTIONS = [1, 1.25, 1.5, 2];

export default function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mode, setMode] = useState<"video" | "audio">("video");
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Pause media when modal closes
  useEffect(() => {
    if (!open) {
      videoRef.current?.pause();
      audioRef.current?.pause();
      setPlaying(false);
      setProgress(0);
    }
  }, [open]);

  // Track progress
  useEffect(() => {
    const media = mode === "video" ? videoRef.current : audioRef.current;
    if (!media) return;
    const update = () => {
      if (media.duration) {
        setProgress(media.currentTime / media.duration);
      }
    };
    media.addEventListener("timeupdate", update);
    return () => media.removeEventListener("timeupdate", update);
  }, [mode, open]);

  const togglePlay = () => {
    const media = mode === "video" ? videoRef.current : audioRef.current;
    if (!media) return;
    if (playing) {
      media.pause();
    } else {
      media.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const media = mode === "video" ? videoRef.current : audioRef.current;
    if (!media) return;
    media.muted = !muted;
    setMuted(!muted);
  };

  const cycleSpeed = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(speed);
    const nextSpeed = SPEED_OPTIONS[(currentIndex + 1) % SPEED_OPTIONS.length];
    setSpeed(nextSpeed);
    if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const media = mode === "video" ? videoRef.current : audioRef.current;
    if (!media || !media.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    media.currentTime = ratio * media.duration;
    setProgress(ratio);
  };

  const switchMode = (m: "video" | "audio") => {
    videoRef.current?.pause();
    audioRef.current?.pause();
    setPlaying(false);
    setMode(m);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-lg">{"\u2600\uFE0F"}</span>
                <h3 className="font-bold text-white text-sm">
                  {mode === "video" ? "Dhoop Explained" : "The Dhoop Podcast"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {/* Mode toggle */}
                <div className="flex bg-slate-800 rounded-full p-0.5">
                  <button
                    onClick={() => switchMode("video")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      mode === "video"
                        ? "bg-sun-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Video
                  </button>
                  <button
                    onClick={() => switchMode("audio")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      mode === "audio"
                        ? "bg-sun-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Audio
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              {mode === "video" ? (
                <div className="relative aspect-video bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    onEnded={() => setPlaying(false)}
                  >
                    <source src="/Dhoop__Solar_Yield_Vault.mp4" type="video/mp4" />
                  </video>

                  {/* Play overlay when not playing */}
                  {!playing && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <div className="w-20 h-20 rounded-full bg-sun-500/90 flex items-center justify-center shadow-lg shadow-sun-500/30 hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </button>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center gap-6 p-8">
                  {/* Audio visualizer */}
                  <div className="flex items-end gap-1.5 h-20">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const heights = [
                        [50, 30, 65], [70, 40, 55], [40, 60, 35], [65, 45, 70],
                        [55, 35, 50], [45, 65, 40], [60, 50, 55], [35, 70, 45],
                        [68, 38, 60], [42, 58, 48], [58, 42, 65], [48, 68, 38],
                        [62, 32, 56], [36, 62, 44], [56, 46, 68], [44, 56, 36],
                        [66, 34, 52], [38, 64, 42], [52, 48, 64], [46, 54, 40],
                      ];
                      const h = heights[i];
                      const duration = 0.6 + (i % 7) * 0.08;
                      return (
                        <motion.div
                          key={i}
                          animate={
                            playing
                              ? {
                                  height: [10, h[0], h[1], h[2], 10],
                                }
                              : { height: 8 }
                          }
                          transition={
                            playing
                              ? {
                                  repeat: Infinity,
                                  duration: duration,
                                  ease: "easeInOut",
                                  delay: i * 0.04,
                                }
                              : {}
                          }
                          className="w-2 rounded-full bg-sun-500/60"
                          style={{ height: 8 }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-slate-400 text-sm font-medium">
                    {playing ? "Playing podcast..." : "Listen to The Dhoop Podcast"}
                  </p>
                  <audio
                    ref={audioRef}
                    onEnded={() => setPlaying(false)}
                  >
                    <source src="/Solana_Yield_from_Indian_Rooftop_Solar.m4a" type="audio/mp4" />
                  </audio>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div
              onClick={seek}
              className="h-1.5 bg-slate-800 cursor-pointer group relative"
            >
              <div
                className="h-full bg-sun-500 transition-[width] duration-100"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress * 100}% - 6px)` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-sun-500 hover:bg-sun-600 flex items-center justify-center text-white transition-colors"
                >
                  {playing ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  {muted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>
              <button
                onClick={cycleSpeed}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                {speed}x
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
