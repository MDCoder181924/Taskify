import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsStatsBar from './AnalyticsStatsBar';
import VelocityGauge from './VelocityGauge';
import WeeklyCompletionChart from './WeeklyCompletionChart';
import TaskDistribution from './TaskDistribution';
import TeamHeatmap from './TeamHeatmap';

export default function AnalyticsView() {
  return (
    <div className="flex-1 flex flex-col relative z-10 animate-fade-in pb-6 px-1">
      
      {/* 1. Header with Export triggers */}
      <AnalyticsHeader />

      {/* 2. Stats bar panels */}
      <AnalyticsStatsBar />

      {/* 3. Bento Grid graphs layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left: Velocity speed gauge gauge */}
        <div className="lg:col-span-4 flex flex-col">
          <VelocityGauge />
        </div>

        {/* Right: Weekly completion rates bar graphs */}
        <div className="lg:col-span-8 flex flex-col">
          <WeeklyCompletionChart />
        </div>

      </div>

      {/* 4. Bottom Grid: task category distributions & heatmaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pie Segment Categories */}
        <div className="lg:col-span-5 flex flex-col">
          <TaskDistribution />
        </div>

        {/* Right: Team efficiency heat tables */}
        <div className="lg:col-span-7 flex flex-col">
          <TeamHeatmap />
        </div>

      </div>

    </div>
  );
}
