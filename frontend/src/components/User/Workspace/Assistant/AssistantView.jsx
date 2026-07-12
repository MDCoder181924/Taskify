import { useEffect, useRef } from 'react';
import ChatArea from './ChatArea';

export default function AssistantView() {
  const canvasRef = useRef(null);

  // Advanced Neural Network background particle animation simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 193, 255, 0.4)';
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 25), 55);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, idx) => {
        p.update();
        p.draw();

        // Connect nearby nodes with delicate lines
        for (let j = idx + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(76, 215, 246, ${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col relative z-10 h-[calc(100vh-7.5rem)] overflow-hidden animate-fade-in">
      
      {/* Dynamic interactive background network simulation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-50 z-0" 
      />

      {/* 2. Conversational log area */}
      <ChatArea />

    </div>
  );
}
