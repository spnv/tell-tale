"use client";

import { useRef, useState } from "react";

const sounds = [
  { id: "blizzard", label: "Blizzard", file: "/sounds/blizzard.mp3", emoji: "🌨️" },
  { id: "panic", label: "Panic", file: "/sounds/panic.mp3", emoji: "😱" },
  { id: "snow-step", label: "Snow Step", file: "/sounds/snow-step.mp3", emoji: "👣" },
  { id: "thinking", label: "Thinking", file: "/sounds/thinking.mp3", emoji: "🤔" },
  { id: "trying", label: "Trying", file: "/sounds/trying.mp3", emoji: "💪" },
  { id: "forest", label: "Forest", file: "/sounds/forest.mp3", emoji: "🌲" },
  { id: "morning-bird", label: "Morning Bird", file: "/sounds/morning-bird.mp3", emoji: "🐦" },
  { id: "morning-bird-2", label: "Morning Bird 2", file: "/sounds/morning-bird-2.mp3", emoji: "🐤" },
  { id: "snoring", label: "Snoring", file: "/sounds/snoring.mp3", emoji: "😴" },
];

export default function Soundboard() {
  const [playing, setPlaying] = useState(new Set());
  const audioRefs = useRef({});

  function stop(id) {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function play(sound) {
    const audio = audioRefs.current[sound.id];
    if (!audio) return;

    if (playing.has(sound.id)) {
      stop(sound.id);
      return;
    }

    setPlaying((prev) => new Set(prev).add(sound.id));
    audio.currentTime = 0;
    audio.play();
    audio.onended = () => stop(sound.id);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-10 px-6 py-16">
      <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
        Tell-Tale Soundboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-xl">
        {sounds.map((sound) => {
          const isPlaying = playing.has(sound.id);
          return (
            <button
              key={sound.id}
              onClick={() => play(sound)}
              className={`
                flex flex-col items-center justify-center gap-3 rounded-2xl
                h-36 text-white font-semibold text-lg transition-all duration-150
                border-2 cursor-pointer select-none last:col-span-2 sm:last:col-span-1
                ${
                  isPlaying
                    ? "bg-indigo-600 border-indigo-400 scale-95 shadow-lg shadow-indigo-900"
                    : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 active:scale-95"
                }
              `}
            >
              <span className="text-4xl">{sound.emoji}</span>
              <span>{sound.label}</span>
              {isPlaying && (
                <span className="text-xs font-normal text-indigo-200 animate-pulse">
                  playing...
                </span>
              )}
              <audio
                ref={(el) => (audioRefs.current[sound.id] = el)}
                src={sound.file}
                preload="auto"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
