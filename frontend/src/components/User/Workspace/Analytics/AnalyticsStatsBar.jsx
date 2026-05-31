import { useEffect, useState } from 'react';
import { TrendingUp, Clock, Heart, Zap } from 'lucide-react';

export default function AnalyticsStatsBar() {
  const [tasksCount, setTasksCount] = useState(0);
  const [speedCount, setSpeedCount] = useState(0);
  const [healthCount, setHealthCount] = useState(0);
  const [utilCount, setUtilCount] = useState(0);

  // Smooth counting animation loop on mount
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing curve (quad out)
      const ease = 1 - (1 - progress) * (1 - progress);

      setTasksCount(Math.ceil(ease * 1248));
      setSpeedCount((ease * 4.2).toFixed(1));
      setHealthCount(Math.ceil(ease * 98));
      setUtilCount(Math.ceil(ease * 76));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const stats = [
    {
      title: 'Total Tasks',
      value: tasksCount,
      changeText: '12% from last month',
      icon: TrendingUp,
      changeColor: 'text-[#4cd7f6]',
      iconColor: 'text-[#4cd7f6]'
    },
    {
      title: 'Avg. Speed',
      value: `${speedCount} hrs`,
      changeText: '-15% response time',
      icon: Clock,
      changeColor: 'text-[#4cd7f6]',
      iconColor: 'text-[#4cd7f6]'
    },
    {
      title: 'Team Health',
      value: `${healthCount}%`,
      changeText: 'High productivity',
      icon: Heart,
      changeColor: 'text-[#fbabff]',
      iconColor: 'text-[#fbabff] fill-[#fbabff]/20'
    },
    {
      title: 'AI Utilization',
      value: `${utilCount}%`,
      changeText: '420 hours saved',
      icon: Zap,
      changeColor: 'text-[#4cd7f6]',
      iconColor: 'text-[#4cd7f6] fill-[#4cd7f6]/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6 z-10 relative">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx}
            className="glass-card bg-gradient-to-tr from-[#131b2e]/50 to-transparent p-5 rounded-2xl border border-white/10 hover:border-[#c0c1ff]/30 shadow-lg shadow-black/25 group hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-[#c7c4d7]/70 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
              {stat.title}
            </p>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-none">
              {stat.value}
            </h3>
            
            <div className="flex items-center gap-1.5 mt-3">
              <Icon className={`w-3.5 h-3.5 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} />
              <span className={`text-[10px] font-sans font-bold uppercase tracking-wide ${stat.changeColor}`}>
                {stat.changeText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
