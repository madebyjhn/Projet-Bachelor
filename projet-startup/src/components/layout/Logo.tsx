export function Logo() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="lg-fill"
          x1="0"
          y1="0"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient
          id="lg-arrow"
          x1="8"
          y1="22"
          x2="26"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      {/* Fond carré arrondi */}
      <rect width="34" height="34" rx="10" fill="url(#lg-fill)" />
      {/* Barre du bas — ligne de base */}
      <line
        x1="8"
        y1="24"
        x2="26"
        y2="24"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />
      {/* Trois colonnes de hauteur croissante */}
      <rect x="8" y="19" width="4" height="5" rx="1.5" fill="white" fillOpacity="0.3" />
      <rect x="15" y="14" width="4" height="10" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="22" y="10" width="4" height="14" rx="1.5" fill="white" fillOpacity="0.9" />
      {/* Flèche de tendance diagonale */}
      <path
        d="M9 21 L15 15.5 L21 18 L26 10.5"
        stroke="url(#lg-arrow)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Dot à la pointe de la flèche */}
      <circle cx="26" cy="10.5" r="1.8" fill="#f0abfc" />
    </svg>
  );
}
