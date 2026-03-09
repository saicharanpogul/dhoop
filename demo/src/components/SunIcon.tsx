"use client";

export default function SunIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {/* Sun rays */}
      <g className="animate-spin-slow origin-center">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="10"
            x2="50"
            y2="20"
            stroke="#FFC107"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      {/* Sun body */}
      <circle cx="50" cy="50" r="22" fill="url(#sunGrad)" />
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFD740" />
          <stop offset="100%" stopColor="#FFC107" />
        </radialGradient>
      </defs>
    </svg>
  );
}
