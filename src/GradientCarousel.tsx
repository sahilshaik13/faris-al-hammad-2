import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type RGB = [number, number, number];

type GradientCarouselProps = {
  images: string[];
  className?: string;
  maxRotationDegrees?: number;
  maxDepthPx?: number;
  minScale?: number;
  cardGap?: number;
  frictionFactor?: number;
  wheelSensitivity?: number;
  dragSensitivity?: number;
  backgroundBlur?: number;
  gradientSize?: number;
  gradientIntensity?: number;
  enableKeyboard?: boolean;
  cardAspectRatio?: number;
  initialIndex?: number;
  onCardChange?: (index: number) => void;
  snapStrength?: number;
  snapThreshold?: number;
  showBackground?: boolean;
  autoAdvanceMs?: number;
  activeOffsetCards?: number;
  activeAlign?: "center" | "left";
  leftInsetPx?: number;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function circularDistance(a: number, b: number, total: number) {
  const d = a - b;
  if (d > total / 2) return d - total;
  if (d < -total / 2) return d + total;
  return d;
}

function rgbToString([r, g, b]: RGB, alpha = 1) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
}

async function extractColor(src: string): Promise<RGB> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve([90, 120, 200]);

        const w = 40;
        const h = 40;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const data = ctx.getImageData(0, 0, w, h).data;
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha < 50) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        if (count === 0) return resolve([90, 120, 200]);
        resolve([r / count, g / count, b / count]);
      } catch {
        resolve([90, 120, 200]);
      }
    };

    img.onerror = () => resolve([90, 120, 200]);
    img.src = src;
  });
}

export function GradientCarousel({
  images,
  className,
  maxRotationDegrees = 28,
  maxDepthPx = 140,
  minScale = 0.86,
  cardGap = 20,
  frictionFactor = 0.92,
  wheelSensitivity = 0.0018,
  dragSensitivity = 0.02,
  backgroundBlur = 24,
  gradientSize = 0.9,
  gradientIntensity = 0.7,
  enableKeyboard = true,
  cardAspectRatio = 1,
  initialIndex = 0,
  onCardChange,
  snapStrength = 0.12,
  snapThreshold = 0.02,
  showBackground = true,
  autoAdvanceMs = 0,
  activeOffsetCards = 0,
  activeAlign = "center",
  leftInsetPx = 16,
}: GradientCarouselProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const progressRef = useRef(initialIndex);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);

  const [renderTick, setRenderTick] = useState(0);
  const [colors, setColors] = useState<RGB[]>([]);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const total = safeImages.length;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cs = await Promise.all(safeImages.map(extractColor));
      if (!cancelled) setColors(cs);
    })();
    return () => {
      cancelled = true;
    };
  }, [safeImages]);

  const drawBackground = useCallback(() => {
    if (!showBackground) return;
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root || total === 0) return;

    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const center = progressRef.current;
    const baseR = Math.max(rect.width, rect.height) * 0.45 * gradientSize;

    const bg = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    bg.addColorStop(0, "rgba(10,12,20,1)");
    bg.addColorStop(1, "rgba(8,10,18,1)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, rect.width, rect.height);

    for (let i = 0; i < total; i++) {
      const diff = circularDistance(i, center, total);
      const influence = Math.max(0, 1 - Math.abs(diff) / 2.8);
      if (influence < 0.03) continue;

      const angle = (diff / 2.8) * Math.PI;
      const cx = rect.width * 0.5 + Math.sin(angle) * rect.width * 0.32;
      const cy = rect.height * 0.5 + Math.cos(angle * 0.65) * rect.height * 0.18;

      const color = colors[i] ?? [90, 120, 200];
      const intensity = gradientIntensity * influence;

      const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR);
      rg.addColorStop(0, rgbToString(color, 0.58 * intensity));
      rg.addColorStop(0.55, rgbToString(color, 0.22 * intensity));
      rg.addColorStop(1, rgbToString(color, 0));
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, rect.width, rect.height);
    }

    const vg = ctx.createRadialGradient(
      rect.width / 2,
      rect.height / 2,
      Math.min(rect.width, rect.height) * 0.15,
      rect.width / 2,
      rect.height / 2,
      Math.max(rect.width, rect.height) * 0.65
    );
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, [colors, gradientIntensity, gradientSize, total, showBackground]);

  const tick = useCallback(() => {
    if (total === 0) return;

    progressRef.current += velocityRef.current;
    progressRef.current = mod(progressRef.current, total);
    velocityRef.current *= frictionFactor;

    if (Math.abs(velocityRef.current) < 0.00002) velocityRef.current = 0;

    // Card-by-card feel: once velocity drops, ease toward nearest card index.
    if (!draggingRef.current && Math.abs(velocityRef.current) < snapThreshold) {
      const nearest = Math.round(progressRef.current);
      const delta = nearest - progressRef.current;
      progressRef.current += delta * snapStrength;
    }

    setRenderTick((t) => t + 1);
    drawBackground();

    // Active card switches only after a full card step completes.
    const active = mod(Math.floor(progressRef.current + 0.0001), total);
    onCardChange?.(active);

    rafRef.current = requestAnimationFrame(tick);
  }, [drawBackground, frictionFactor, onCardChange, total, snapStrength, snapThreshold]);

  useEffect(() => {
    if (total === 0) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick, total]);

  useEffect(() => {
    drawBackground();
    const onResize = () => drawBackground();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawBackground]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastXRef.current = e.clientX;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || total === 0) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current += -dx * dragSensitivity;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onWheel = (e: WheelEvent) => {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      const axis = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const normalized = clamp(axis, -40, 40);
      velocityRef.current += normalized * wheelSensitivity;
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [wheelSensitivity]);

  useEffect(() => {
    if (!enableKeyboard || total === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") velocityRef.current += 0.06;
      if (e.key === "ArrowLeft") velocityRef.current -= 0.06;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableKeyboard, total]);

  useEffect(() => {
    if (!autoAdvanceMs || total <= 1) return;

    const id = window.setInterval(() => {
      if (draggingRef.current) return;
      progressRef.current = mod(Math.round(progressRef.current) + 1, total);
      velocityRef.current = 0;
    }, autoAdvanceMs);

    return () => window.clearInterval(id);
  }, [autoAdvanceMs, total]);

  if (total === 0) return null;

  const cardW = "min(18.315vw, 226px)";
  const cardWidthPx = Math.min(window.innerWidth * 0.18315, 226);
  // Keep equal spacing: each slot = card width + requested gap.
  const stepPx = cardWidthPx + cardGap;
  const current = progressRef.current;
  const rootWidth = rootRef.current?.clientWidth ?? 0;
  const alignOffsetPx =
    activeAlign === "left"
      ? cardWidthPx / 2 + leftInsetPx - rootWidth / 2
      : 0;
  void renderTick;

  return (
    <div
      ref={rootRef}
      className={`gc-root ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="region"
      aria-label="Gradient Carousel"
    >
      <canvas
        ref={canvasRef}
        className="gc-canvas"
        style={{
          display: showBackground ? "block" : "none",
          filter: `blur(${backgroundBlur}px) saturate(1.05)`,
        }}
      />
      <div className="gc-stage">
        {safeImages.map((src, i) => {
          // Left-anchored sliding queue:
          // - baseIndex decides current "main" card
          // - frac drives the in-between slide to next card
          const baseIndex = Math.floor(current);
          const frac = current - baseIndex;
          const queueDiff = mod(i - baseIndex, total);
          const slidePos = queueDiff - frac;
          const t = clamp(Math.abs(slidePos) / 2.5, 0, 1);

          const rotateY = lerp(0, -maxRotationDegrees, t);

          const z = lerp(maxDepthPx, 0, t);
          // Make active card noticeably larger than surrounding cards.
          const scale = lerp(1.14, minScale, t);
          const x = (slidePos + activeOffsetCards) * stepPx + alignOffsetPx;

          const zIndex = 1000 + Math.round((1 - t) * 200);
          const blur = slidePos > 2.2 ? 2 : 0;
          // Fade card smoothly when it exits to the left (instead of vanishing instantly).
          const leftFade = clamp(1 + slidePos, 0, 1);
          const opacity = slidePos < 0 ? leftFade : 1;

          const style: CSSProperties = {
            width: cardW,
            aspectRatio: String(cardAspectRatio),
            transform: `translate3d(${x}px, -50%, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
            zIndex,
            filter: `blur(${blur}px)`,
            opacity,
          };

          return (
            <div key={`${src}-${i}`} className="gc-card-wrap" style={style}>
              <img
                src={src}
                alt={`Carousel item ${i + 1}`}
                draggable={false}
                className="gc-card"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
