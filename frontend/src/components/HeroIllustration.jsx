function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 320" style={{ width: '100%', maxWidth: '380px' }}>
      {/* background blob */}
      <circle cx="200" cy="160" r="150" fill="var(--primary-light)" />

      {/* desk */}
      <rect x="60" y="240" width="280" height="14" rx="4" fill="#E0DEF7" />

      {/* laptop base */}
      <rect x="140" y="210" width="120" height="10" rx="3" fill="#D6D3F0" />
      {/* laptop screen */}
      <rect x="150" y="140" width="100" height="70" rx="6" fill="#2D2A5C" />
      <rect x="158" y="148" width="84" height="54" rx="2" fill="#F0EEFF" />
      <rect x="165" y="155" width="40" height="6" rx="2" fill="var(--primary)" />
      <rect x="165" y="166" width="60" height="5" rx="2" fill="#C9C5EE" />
      <rect x="165" y="176" width="50" height="5" rx="2" fill="#C9C5EE" />
      <rect x="165" y="186" width="30" height="5" rx="2" fill="var(--orange)" />

      {/* person body */}
      <ellipse cx="200" cy="225" rx="38" ry="20" fill="var(--primary)" />
      {/* person head */}
      <circle cx="200" cy="160" r="28" fill="#FFD8B0" />
      {/* hair */}
      <path d="M174 150 Q175 125 200 125 Q225 125 226 150 Q226 138 200 138 Q174 138 174 150Z" fill="#2D2A5C" />
      {/* hoodie shoulders */}
      <path d="M165 215 Q165 185 200 185 Q235 185 235 215 L235 230 L165 230 Z" fill="var(--orange)" />
      {/* hoodie collar */}
      <path d="M188 188 Q200 200 212 188" stroke="#E08A2E" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* books stack */}
      <rect x="60" y="225" width="55" height="10" rx="2" fill="var(--green)" />
      <rect x="64" y="214" width="47" height="10" rx="2" fill="var(--yellow)" />
      <rect x="68" y="203" width="39" height="10" rx="2" fill="var(--primary)" />

      {/* floating sparkles */}
      <circle cx="80" cy="100" r="4" fill="var(--yellow)" />
      <circle cx="320" cy="90" r="5" fill="var(--orange)" />
      <circle cx="340" cy="200" r="3" fill="var(--green)" />
      <path d="M300 130 l5 -5 l5 5 l-5 5 Z" fill="var(--primary)" />
    </svg>
  );
}

export default HeroIllustration;