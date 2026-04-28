import { useEffect, useRef, useState } from "react";

interface Eye {
  id: number;
  x: number;
  y: number;
  size: number;
  blinkDelay: number;
  blinkDuration: number;
  opacity: number;
}

function SingleEye({
  size,
  blinkDelay,
  blinkDuration,
  opacity,
  mouseX,
  mouseY,
  eyeX,
  eyeY,
}: {
  size: number;
  blinkDelay: number;
  blinkDuration: number;
  opacity: number;
  mouseX: number;
  mouseY: number;
  eyeX: number;
  eyeY: number;
}) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = blinkDelay + Math.random() * 4000;
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, blinkDuration);
      }, delay);
    };
    const timer = scheduleNextBlink();
    return () => clearTimeout(timer);
  }, [blinkDelay, blinkDuration]);

  // Pupil tracking — clamp to inside iris
  const dx = mouseX - eyeX;
  const dy = mouseY - eyeY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const maxPupilOffset = size * 0.12;
  const norm = dist > 0 ? Math.min(dist / 300, 1) : 0;
  const px = (dx / (dist || 1)) * norm * maxPupilOffset;
  const py = (dy / (dist || 1)) * norm * maxPupilOffset;

  const cx = size / 2;
  const cy = size / 2;
  const rx = size * 0.42;
  const ry = size * 0.28;
  const irisR = size * 0.16;
  const pupilR = size * 0.1;
  const highlightR = size * 0.04;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ opacity, display: "block" }}
    >
      <defs>
        <clipPath id={`eyeclip-${size}-${blinkDelay}`}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
        </clipPath>
        <radialGradient id={`irisgrad-${size}-${blinkDelay}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
      </defs>

      {/* Eye white */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0a0a0a" stroke="#dc262640" strokeWidth={size * 0.015} />

      {/* Iris */}
      <circle
        cx={cx + px}
        cy={cy + py}
        r={irisR}
        fill={`url(#irisgrad-${size}-${blinkDelay})`}
        clipPath={`url(#eyeclip-${size}-${blinkDelay})`}
      />

      {/* Pupil */}
      <circle
        cx={cx + px}
        cy={cy + py}
        r={pupilR}
        fill="#000"
        clipPath={`url(#eyeclip-${size}-${blinkDelay})`}
      />

      {/* Highlight */}
      <circle
        cx={cx + px - highlightR}
        cy={cy + py - highlightR}
        r={highlightR}
        fill="rgba(255,255,255,0.5)"
        clipPath={`url(#eyeclip-${size}-${blinkDelay})`}
      />

      {/* Eyelid — blink */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx + 1}
        ry={ry + 1}
        fill="#000"
        style={{
          transform: isBlinking ? `scaleY(1)` : `scaleY(0)`,
          transformOrigin: `${cx}px ${cy - ry}px`,
          transition: isBlinking
            ? `transform ${blinkDuration * 0.2}ms ease-in`
            : `transform ${blinkDuration * 0.3}ms ease-out`,
        }}
      />

      {/* Red glow ring */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx + size * 0.03}
        ry={ry + size * 0.03}
        fill="none"
        stroke="#dc2626"
        strokeWidth={size * 0.01}
        opacity={0.4}
      />
    </svg>
  );
}

export default function BlinkingEyes() {
  const [eyes, setEyes] = useState<Eye[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generated: Eye[] = [];
    const cols = 5;
    const rows = 4;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xBase = (col / (cols - 1)) * 90 + 5;
        const yBase = (row / (rows - 1)) * 80 + 10;
        generated.push({
          id: row * cols + col,
          x: xBase + (Math.random() - 0.5) * 10,
          y: yBase + (Math.random() - 0.5) * 10,
          size: 28 + Math.random() * 32,
          blinkDelay: Math.random() * 3000,
          blinkDuration: 120 + Math.random() * 80,
          opacity: 0.12 + Math.random() * 0.22,
        });
      }
    }

    // Add a few larger, more prominent ones
    for (let i = 0; i < 6; i++) {
      generated.push({
        id: 100 + i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 55 + Math.random() * 45,
        blinkDelay: Math.random() * 5000,
        blinkDuration: 140 + Math.random() * 100,
        opacity: 0.35 + Math.random() * 0.3,
      });
    }

    setEyes(generated);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {eyes.map((eye) => {
        const eyeX = (eye.x / 100) * window.innerWidth;
        const eyeY = (eye.y / 100) * window.innerHeight;
        return (
          <div
            key={eye.id}
            className="absolute"
            style={{
              left: `${eye.x}%`,
              top: `${eye.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <SingleEye
              size={eye.size}
              blinkDelay={eye.blinkDelay}
              blinkDuration={eye.blinkDuration}
              opacity={eye.opacity}
              mouseX={mouse.x}
              mouseY={mouse.y}
              eyeX={eyeX}
              eyeY={eyeY}
            />
          </div>
        );
      })}
    </div>
  );
}
