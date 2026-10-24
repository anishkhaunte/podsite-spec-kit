import styles from "./CoverArt.module.css";

type CoverArtProps = {
  /** Episode number; drives the artwork deterministically. */
  number: number;
};

const SIZE = 200;
const round = (n: number) => Math.round(n * 100) / 100;

/** Builds a sine-wave path across the square, shaped by the given parameters. */
function wavePath(amplitude: number, cycles: number, phase: number, y: number): string {
  const steps = 40;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * SIZE;
    const py = y + Math.sin((i / steps) * Math.PI * 2 * cycles + phase) * amplitude;
    points.push(`${i === 0 ? "M" : "L"}${round(x)} ${round(py)}`);
  }
  return points.join(" ");
}

export function CoverArt({ number }: CoverArtProps) {
  const hue = (number * 47) % 360;
  const hue2 = (hue + 70 + (number % 5) * 18) % 360;
  const id = `cover-${number}`;
  const waves = 4 + (number % 4);

  return (
    <svg
      className={styles.art}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 80% 38%)`} />
          <stop offset="1" stopColor={`hsl(${hue2} 85% 24%)`} />
        </linearGradient>
      </defs>
      <rect width={SIZE} height={SIZE} fill={`url(#${id})`} />
      <circle
        cx={round(40 + ((number * 37) % 120))}
        cy={round(30 + ((number * 53) % 100))}
        r={round(34 + (number % 6) * 6)}
        fill={`hsl(${hue2} 90% 65%)`}
        opacity="0.28"
      />
      {Array.from({ length: waves }, (_, i) => (
        <path
          key={i}
          d={wavePath(8 + i * 3 + (number % 5), 1 + ((number + i) % 3), i * 0.9 + number, 70 + i * 18)}
          fill="none"
          stroke="white"
          strokeOpacity={round(0.85 - i * 0.12)}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
