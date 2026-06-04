import { useState, useEffect, useRef } from 'react';
import { Plus, Menu, X, Terminal, Brain, CheckSquare, BarChart2 } from 'lucide-react';
import StatsGrid from './StatsGrid'
import VelocityChart from './VelocityChart';
import Timeline from './Timeline';
import AIInsights from './AIInsights';
import CalendarPreview from './CalendarPreview';
import RecentActivity from './RecentActivity';
import { useTask } from '../../../../context/TaskContext';

export default function DashbordView({ }) {
    return (

        <>
            <StatsGrid
                tasks = {useTask().tasks}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-8 flex flex-col gap-6">
                    <VelocityChart />
                    <Timeline />
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <AIInsights />
                    <CalendarPreview />
                </div>

            </div>

            <RecentActivity />
        </>
    )
}