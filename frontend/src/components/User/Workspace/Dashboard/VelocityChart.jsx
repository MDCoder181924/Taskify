import { useMemo, useState } from 'react';
import { parseTaskDate, startOfLocalDay, toLocalDateKey } from '../../../../utils/dateUtils';

const getRangeDays = (timeRange) => {
  if (timeRange === '30d') return 30;
  if (timeRange === '90d') return 90;
  return 7;
};

const buildChartPoints = (tasks, timeRange) => {
  const dayCount = getRangeDays(timeRange);
  const today = startOfLocalDay();
  const completedByDay = tasks.reduce((acc, task) => {
    if (task.taskStatus !== 'completed') return acc;

    const completedDate = parseTaskDate(task.updatedAt || task.taskDueDate);
    if (!completedDate) return acc;

    const key = toLocalDateKey(completedDate);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const visibleDays = Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dayCount - 1 - index));
    return date;
  });

  const maxValue = Math.max(1, ...visibleDays.map((date) => completedByDay[toLocalDateKey(date)] || 0));
  const pointCount = Math.min(dayCount, 7);
  const step = dayCount <= 7 ? 1 : Math.ceil(dayCount / pointCount);
  const sampledDays = visibleDays.filter((_, index) => index % step === 0).slice(-pointCount);

  return sampledDays.map((date, index) => {
    const value = completedByDay[toLocalDateKey(date)] || 0;
    const cx = sampledDays.length === 1 ? 400 : (800 / (sampledDays.length - 1)) * index;
    const cy = 170 - (value / maxValue) * 130;

    return {
      cx,
      cy,
      value,
      label: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      active: toLocalDateKey(date) === toLocalDateKey(today)
    };
  });
};

const buildLinePath = (points) => {
  if (points.length === 0) return 'M0,170';
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.cx},${point.cy}`).join(' ');
};

export default function VelocityChart({ tasks = [] }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const chartPoints = useMemo(() => buildChartPoints(tasks, timeRange), [tasks, timeRange]);
  const linePath = buildLinePath(chartPoints);
  const areaPath = chartPoints.length > 0
    ? `${linePath} L${chartPoints[chartPoints.length - 1].cx},200 L${chartPoints[0].cx},200 Z`
    : 'M0,200 Z';

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-[#EF2F29]/30 transition-all duration-500 shadow-xl shadow-black/25">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#ffa940]/5 blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold font-display text-white tracking-tight">Velocity Insight</h2>
          <p className="text-xs text-[#c7c4d7] mt-1 font-sans">Completed tasks from your current data</p>
        </div>

        <div className="flex gap-2 bg-[#000000]/40 p-1.5 rounded-full border border-white/5">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-[#b21b16] text-white'
                  : 'text-[#908fa0] hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-60 w-full relative flex flex-col justify-between pt-2">
        <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none z-0">
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
        </div>

        <div className="relative w-full h-44 z-10">
          <svg
            className="w-full h-full overflow-visible transition-all duration-300"
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EF2F29" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EF2F29" stopOpacity="0" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d={areaPath} fill="url(#chartGradient)" className="transition-all duration-500" />
            <path
              d={linePath}
              fill="none"
              stroke="#EF2F29"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonGlow)"
              className="transition-all duration-500"
            />

            {chartPoints.map((pt) => (
              <g
                key={pt.label}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r="9"
                  fill="#EF2F29"
                  opacity={hoveredPoint?.label === pt.label || pt.active ? 0.3 : 0}
                  className="transition-all duration-200"
                />
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r="4.5"
                  fill={pt.active ? '#ff6b4a' : '#EF2F29'}
                  stroke="#050505"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              </g>
            ))}
          </svg>

          {hoveredPoint && (
            <div
              className="absolute bg-[#0d0d0d] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-2xl z-20 pointer-events-none transition-all duration-150 animate-fade-in"
              style={{
                left: `${(hoveredPoint.cx / 800) * 100}%`,
                top: `${(hoveredPoint.cy / 200) * 100 - 32}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="font-mono text-[9px] text-[#ffa940] uppercase tracking-wider font-bold">
                {hoveredPoint.label}
              </div>
              <div className="font-display font-extrabold text-white mt-0.5">
                {hoveredPoint.value} Tasks Completed
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-[#908fa0] uppercase tracking-widest px-2">
          {chartPoints.map((pt) => (
            <span
              key={pt.label}
              className={`transition-colors duration-200 ${
                hoveredPoint?.label === pt.label ? 'text-[#ffa940] font-bold' : ''
              }`}
            >
              {pt.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
