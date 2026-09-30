// Lightweight inline SVG "photo" so no image assets are needed.
export default function PhotoArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 220" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#93c5fd" /><stop offset="1" stopColor="#e0f2fe" /></linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2dd4bf" /><stop offset="1" stopColor="#0f766e" /></linearGradient>
      </defs>
      <rect width="300" height="220" fill="url(#sky)" />
      <path d="M0 140l60-70 40 40 50-60 70 80 80-50v140H0z" fill="#64748b" />
      <path d="M150 50l-25 30 15-6 10 12 12-14 8 8z" fill="#f1f5f9" />
      <path d="M0 150c40-20 90-10 130 5s110 0 170-15v80H0z" fill="#166534" />
      <rect y="165" width="300" height="55" fill="url(#lake)" />
    </svg>
  );
}
