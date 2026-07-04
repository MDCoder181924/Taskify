import { useEffect, useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';

export default function SpatialUniverse() {
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const nodesData = [
      { id: 1, name: 'Aether Core Engine', tasks: 14, priority: 'CRITICAL', progress: '65%', color: '#EF2F29', x: -12, y: 8, z: 2 },
      { id: 2, name: 'Quantum QA Testing', tasks: 8, priority: 'HIGH', progress: '88%', color: '#ff6b4a', x: 12, y: -6, z: -4 },
      { id: 3, name: 'Obsidian Database Sync', tasks: 22, priority: 'CRITICAL', progress: '45%', color: '#ffa940', x: 2, y: -10, z: 8 },
      { id: 4, name: 'Nexus Task Router', tasks: 5, priority: 'MEDIUM', progress: '92%', color: '#b21b16', x: -8, y: -4, z: -10 },
      { id: 5, name: 'Lumina Interface UI', tasks: 17, priority: 'LOW', progress: '74%', color: '#c93b1d', x: 8, y: 10, z: 6 },
    ];

    setActiveNode(nodesData[0]);

    const interval = setInterval(() => {
      const randomNode = nodesData[Math.floor(Math.random() * nodesData.length)];
      setActiveNode(randomNode);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="showcase" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface-lowest/40 border-y border-white/5 reveal reveal-scale-in">
      
      {/* Interface overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between pointer-events-none gap-12">
        
        {/* Left Side: Glowing Glassmorphic Showcase Control Panel */}
        <div className="max-w-xl glass-card p-8 md:p-10 rounded-[2.5rem] border-white/15 backdrop-blur-3xl pointer-events-auto flex flex-col gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit text-primary font-mono text-[10px] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            3D Spatial Universe
          </div>

          <h2 className="font-display font-extrabold text-3.5xl md:text-4.5xl text-white tracking-tight leading-tight">
            Experience the Future of Productivity
          </h2>

          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
            Harness the power of AI-driven spatial computing. Our neural interface visualizes complex project structures in multi-dimensional space, turning data lists into navigable action paths.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-gradient-to-r from-primary to-secondary text-white-always px-7 py-3.5 rounded-xl font-sans font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/10">
              Explore Spatial Mode
            </button>
            <button className="text-white border border-white/10 hover:border-white/25 hover:bg-white/5 px-7 py-3.5 rounded-xl font-sans font-bold text-sm transition-all duration-300">
              Learn More
            </button>
          </div>

        </div>

        {/* Right Side: Active Project Focus Panel */}
        {activeNode && (
          <div className="glass-card p-6 rounded-2.5xl border-outline-variant/35 backdrop-blur-3xl pointer-events-auto w-64 shadow-[0_15px_30px_rgba(0,0,0,0.4)] animate-pulse relative z-10 self-end lg:self-center transition-all duration-1000">
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-tertiary" />
            <span className="text-[9px] text-on-surface-variant font-mono uppercase tracking-widest block mb-1">Project Focus</span>
            <div className="font-display font-extrabold text-lg mb-3 transition-colors" style={{ color: activeNode.color }}>
              {activeNode.name}
            </div>
            
            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between border-b border-outline-variant/30 pb-1">
                <span className="text-on-surface-variant">Active tasks:</span>
                <span className="text-on-surface font-mono font-bold">{activeNode.tasks}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-1">
                <span className="text-on-surface-variant">Priority:</span>
                <span className="font-bold" style={{ color: activeNode.color }}>{activeNode.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Completion rate:</span>
                <span className="text-on-surface font-mono font-bold">{activeNode.progress}</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
