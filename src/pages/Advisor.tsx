import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pill, 
  AlertTriangle, 
  Info, 
  Search, 
  Loader2,
  ChevronRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '@/src/components/GlassCard';
import { getMedicineAdvice } from '@/src/services/geminiService';

export const Advisor: React.FC = () => {
  const [disease, setDisease] = useState('');
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!disease.trim()) return;
    setLoading(true);
    try {
      const data = await getMedicineAdvice(disease);
      setMedicines(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold font-display neon-glow-cyan leading-tight">
            Smart Medicine <br />
            <span className="text-neon-cyan">Advisor</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Get intelligent recommendations for medications based on your diagnosed condition. 
            Includes dosage, safety warnings, and potential side effects.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="Enter disease name (e.g., Hypertension)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-neon-cyan/50 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !disease.trim()}
              className="px-8 py-4 rounded-2xl bg-neon-cyan text-medical-bg font-bold hover:shadow-lg hover:shadow-neon-cyan/20 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Advice'}
            </button>
          </div>
        </div>

        {/* 3D Pill Visualization Placeholder */}
        <div className="w-full md:w-80 h-80 glass-panel rounded-[40px] relative flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent" />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              y: [0, -20, 0]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative z-10"
          >
            <Pill className="w-32 h-32 text-neon-cyan drop-shadow-[0_0_20px_rgba(0,242,255,0.5)]" />
          </motion.div>
          <div className="absolute bottom-6 text-xs font-bold uppercase tracking-widest text-neon-cyan/50">
            3D Visualization Active
          </div>
        </div>
      </div>

      <AnimatePresence>
        {medicines.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {medicines.map((med, i) => (
              <GlassCard key={i} delay={i * 0.1} className="p-0 overflow-hidden">
                <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                      <Pill className="text-neon-cyan w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{med.name}</h3>
                      <p className="text-xs text-neon-cyan font-bold uppercase tracking-wider">Recommended Dosage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-display font-bold text-white">{med.dosage}</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 rounded-2xl bg-orange-400/5 border border-orange-400/10">
                      <div className="flex items-center gap-2 text-orange-400 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Warnings</span>
                      </div>
                      <p className="text-sm text-slate-300">{med.warnings}</p>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-neon-blue/5 border border-neon-blue/10">
                      <div className="flex items-center gap-2 text-neon-blue mb-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Safety</span>
                      </div>
                      <p className="text-sm text-slate-300">FDA Approved. Follow prescribed cycle.</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-400 mb-3">
                      <Info className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Potential Side Effects</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {med.sideEffects.map((effect: string, j: number) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
