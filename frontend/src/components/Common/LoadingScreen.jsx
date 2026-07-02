import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-on-surface w-full select-none">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Simple & professional circular spinner */}
        <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <span className="font-mono text-[10px] tracking-widest text-primary font-bold uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
