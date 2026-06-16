import { useEffect, useRef, useState } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── STARS (dark mode) ──────────────────────────────
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.5 + 0.1,
    }));

    const meteors = Array.from({ length: 4 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.5,
      length: Math.random() * 120 + 60,
      speed: Math.random() * 4 + 3,
      opacity: 0,
      active: false,
      timer: Math.random() * 200,
    }));

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.opacity += star.speed * 0.01;
        const alpha = (Math.sin(star.opacity) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
        ctx.fill();
      });

      meteors.forEach((meteor) => {
        meteor.timer--;
        if (meteor.timer <= 0 && !meteor.active) {
          meteor.active = true;
          meteor.x = Math.random() * canvas.width;
          meteor.y = Math.random() * canvas.height * 0.4;
          meteor.opacity = 1;
        }
        if (meteor.active) {
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.length, meteor.y + meteor.length);
          const grad = ctx.createLinearGradient(
            meteor.x, meteor.y,
            meteor.x - meteor.length, meteor.y + meteor.length
          );
          grad.addColorStop(0, `rgba(255,255,255,${meteor.opacity})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          meteor.x += meteor.speed;
          meteor.y += meteor.speed;
          meteor.opacity -= 0.015;
          if (meteor.opacity <= 0) {
            meteor.active = false;
            meteor.timer = Math.random() * 300 + 100;
          }
        }
      });

      animationId = requestAnimationFrame(drawStars);
    };

    // ── GRID (light mode) ──────────────────────────────
    const SPACING = 40;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 2;
      const shift = offset % SPACING;

      ctx.strokeStyle = "rgba(99, 135, 230, 0.1)";
      ctx.lineWidth = 0.5;

      for (let x = -1; x < cols; x++) {
        const xp = x * SPACING + shift;
        ctx.beginPath();
        ctx.moveTo(xp, 0);
        ctx.lineTo(xp, canvas.height);
        ctx.stroke();
      }
      for (let y = -1; y < rows; y++) {
        const yp = y * SPACING + shift;
        ctx.beginPath();
        ctx.moveTo(0, yp);
        ctx.lineTo(canvas.width, yp);
        ctx.stroke();
      }

      for (let x = -1; x < cols; x++) {
        for (let y = -1; y < rows; y++) {
          const xp = x * SPACING + shift;
          const yp = y * SPACING + shift;
          const pulse = Math.sin((x + y) * 0.5 + offset * 0.05) * 0.5 + 1;
          ctx.beginPath();
          ctx.arc(xp, yp, pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(99, 135, 230, 0.25)";
          ctx.fill();
        }
      }

      offset += 0.4;
      animationId = requestAnimationFrame(drawGrid);
    };

    if (isDark) {
      drawStars();
    } else {
      drawGrid();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]); // re-runs whenever theme switches

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};