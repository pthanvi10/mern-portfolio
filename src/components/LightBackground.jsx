import { useEffect, useRef } from "react";

export const LightBackground = () => {
  const canvasRef = useRef(null);

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

    const SPACING = 40;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 2;

      // Draw grid lines
      ctx.strokeStyle = "rgba(99, 135, 230, 0.1)";
      ctx.lineWidth = 0.5;

      for (let x = -1; x < cols; x++) {
        const xPos = (x * SPACING + (offset % SPACING));
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, canvas.height);
        ctx.stroke();
      }

      for (let y = -1; y < rows; y++) {
        const yPos = (y * SPACING + (offset % SPACING));
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();
      }

      // Draw dots at intersections
      for (let x = -1; x < cols; x++) {
        for (let y = -1; y < rows; y++) {
          const xPos = x * SPACING + (offset % SPACING);
          const yPos = y * SPACING + (offset % SPACING);

          // Pulse size based on position + time
          const pulse = Math.sin((x + y) * 0.5 + offset * 0.05) * 0.5 + 1;

          ctx.beginPath();
          ctx.arc(xPos, yPos, pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(99, 135, 230, 0.25)";
          ctx.fill();
        }
      }

      offset += 0.4;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
    />
  );
};