import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Pill, 
  Apple, 
  Activity, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'predictor', icon: Stethoscope, label: 'AI Predictor' },
    { id: 'advisor', icon: Pill, label: 'Medicine Advisor' },
    { id: 'diet', icon: Apple, label: 'Diet Planner' },
    { id: 'firstaid', icon: Activity, label: 'First Aid' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-20 lg:w-64 h-screen glass-panel border-r border-white/5 flex flex-col py-8 sticky top-0 z-50"
    >
      <div className="px-6 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-lg shadow-neon-cyan/20">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="hidden lg:block font-display font-bold text-xl tracking-tight neon-glow-cyan">
          AetherMed <span className="text-neon-cyan">AI</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
              activeTab === item.id 
                ? "bg-white/10 text-neon-cyan shadow-inner shadow-white/5" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-6 h-6 transition-transform duration-300 group-hover:scale-110",
              activeTab === item.id && "text-neon-cyan"
            )} />
            <span className="hidden lg:block font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-pill"
                className="absolute left-0 w-1 h-6 bg-neon-cyan rounded-r-full"
              />
            )}
            <ChevronRight className={cn(
              "hidden lg:block ml-auto w-4 h-4 opacity-0 transition-all",
              activeTab === item.id ? "opacity-100 translate-x-0" : "group-hover:opacity-50 group-hover:translate-x-1"
            )} />
          </button>
        ))}
      </nav>

      <div className="px-4 mt-auto space-y-2">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-6 h-6" />
          <span className="hidden lg:block font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut className="w-6 h-6" />
          <span className="hidden lg:block font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};
