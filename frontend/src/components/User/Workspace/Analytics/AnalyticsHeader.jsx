import { Download } from 'lucide-react';

export default function AnalyticsHeader() {
  const handleExport = () => {
    alert('Synthesizing Operational Performance Report... Downloading in PDF formats shortly.');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 z-10 relative">
      <div>
        <span className="font-mono text-[10px] font-bold text-[#4cd7f6] uppercase tracking-widest block mb-1">
          Operational Insights
        </span>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-none">
          Performance Analytics
        </h1>
      </div>

      <button 
        onClick={handleExport}
        className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl flex items-center gap-2 text-[#c0c1ff] hover:bg-white/10 hover:border-[#c0c1ff]/40 transition-all hover:scale-[1.03] active:scale-97 group cursor-pointer shadow-lg shadow-black/15"
      >
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        <span className="font-sans font-bold text-xs tracking-wider uppercase">Export Report</span>
      </button>
    </div>
  );
}
