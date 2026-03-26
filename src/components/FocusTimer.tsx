import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Simple notification logic could go here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm border border-zinc-100 flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-2 text-zinc-400 mb-6 w-full">
        <TimerIcon size={18} />
        <span className="text-xs font-medium uppercase tracking-wider">Focus Timer</span>
      </div>

      <div className="flex gap-1 p-1 bg-zinc-100 rounded-lg mb-8">
        <button
          onClick={() => switchMode('work')}
          className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'work' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'break' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          Break
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-8">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-zinc-100"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={552.92}
            initial={{ strokeDashoffset: 552.92 }}
            animate={{ 
              strokeDashoffset: 552.92 * (1 - timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) 
            }}
            transition={{ duration: 1, ease: "linear" }}
            className="text-zinc-900"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-light tracking-tight tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
