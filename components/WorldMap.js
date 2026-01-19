export default function WorldMap({ locations }) {
  return (
    <div className="map-card">
      <svg
        viewBox="0 0 600 300"
        className="map-frame"
        role="img"
        aria-label="Locations"
      >
        <rect width="600" height="300" fill="none" />
        <path
          d="M12 120c40 24 70 28 110 10 38-18 72-26 130-10 44 12 74 6 110-10 36-16 80-18 140 8v34c-20 8-48 12-76 6-40-8-72-4-116 12-48 16-88 18-134 2-48-16-88-18-132-4-16 6-30 12-50 10z"
          fill="rgba(217,121,75,0.12)"
        />
        {locations.map((loc) => (
          <circle
            key={loc.name}
            cx={loc.x}
            cy={loc.y}
            r="8"
            className="map-dot"
          />
        ))}
      </svg>
    </div>
  );
}
