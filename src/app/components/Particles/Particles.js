"use client";

import { useEffect, useRef, useState } from "react";

// Decorative canvas: no particle engine or animation dependencies needed.
export default function Particles() {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const region = canvas.parentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let points = [];
    let frame = 0;
    let previousTime = 0;
    let visible = false;

    function draw(step = 0) {
      context.clearRect(0, 0, width, height);
      for (const point of points) {
        point.x += point.vx * step;
        point.y += point.vy * step;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        point.x = Math.max(0, Math.min(width, point.x));
        point.y = Math.max(0, Math.min(height, point.y));
        context.fillStyle = "rgba(158, 218, 255, 0.45)";
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 145) continue;
          context.strokeStyle = `rgba(144, 206, 255, ${0.19 * (1 - distance / 145)})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
        const point = points[i];
        const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
        if (distance < 160 && !motion.matches && !paused) {
          context.strokeStyle = `rgba(156, 243, 208, ${0.3 * (1 - distance / 160)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }
      }
    }

    function animate(time) {
      frame = requestAnimationFrame(animate);
      const elapsed = time - previousTime;
      if (elapsed < 1000 / 30) return;
      draw(Math.min(elapsed, 70) / (1000 / 30));
      previousTime = time;
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      draw();
      if (!paused && !motion.matches && visible && !document.hidden) {
        frame = requestAnimationFrame(animate);
      }
    }

    function resize() {
      width = region.clientWidth;
      height = region.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(65, Math.max(18, Math.floor(width * height / 19000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.2 + 0.8,
      }));
      draw();
    }

    function movePointer(event) {
      if (event.pointerType !== "mouse") return;
      const bounds = region.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }

    function clearPointer() {
      pointer.x = -1000;
      pointer.y = -1000;
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    resizeObserver.observe(region);
    intersectionObserver.observe(region);
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    region.addEventListener("pointermove", movePointer);
    region.addEventListener("pointerleave", clearPointer);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      region.removeEventListener("pointermove", movePointer);
      region.removeEventListener("pointerleave", clearPointer);
    };
  }, [paused]);

  return (
    <>
      <canvas className="particle-background" ref={canvasRef} aria-hidden="true" />
      <button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? "Resume background" : "Pause background"}
      </button>
    </>
  );
}
