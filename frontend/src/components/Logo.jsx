function Logo({ size = 64 }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      {/* Rocket trail */}
      <path d="M70 30 Q78 22 85 14" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="85" cy="14" r="3" fill="#FFD93D" />

      {/* Rounded square badge */}
      <rect x="8" y="8" width="84" height="84" rx="22" fill="url(#prepmateGradient)" />

      {/* Letter P */}
      <text
        x="38"
        y="68"
        fontFamily="'Poppins', sans-serif"
        fontWeight="800"
        fontSize="46"
        fill="#fff"
      >
        P
      </text>

      {/* Graduation cap on top of the P */}
      <g transform="translate(50, 18)">
        <polygon points="0,0 22,7 0,14 -22,7" fill="#FFD93D" />
        <rect x="-3" y="6" width="6" height="10" rx="2" fill="#FFD93D" />
        <circle cx="14" cy="10" r="2" fill="#1E293B" />
      </g>

      <defs>
        <linearGradient id="prepmateGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Logo;