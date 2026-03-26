import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Quote, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function DailyQuote() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a short, unique, and inspiring productivity or mindfulness quote. Return it as a JSON object with 'text' and 'author' fields.",
        config: {
          responseMimeType: "application/json",
        }
      });
      
      const data = JSON.parse(response.text || '{}');
      setQuote(data);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote({ text: "The only way to do great work is to love what you do.", author: "Steve Jobs" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm border border-zinc-100 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Quote size={18} />
          <span className="text-xs font-medium uppercase tracking-wider">Daily Inspiration</span>
        </div>
        <button 
          onClick={fetchQuote}
          disabled={loading}
          className="p-2 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={quote?.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex-1 flex flex-col justify-center"
        >
          {quote ? (
            <>
              <p className="text-lg font-medium leading-relaxed text-zinc-800 italic">
                "{quote.text}"
              </p>
              <p className="mt-4 text-sm text-zinc-500 font-medium">
                — {quote.author}
              </p>
            </>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-zinc-100 rounded w-full animate-pulse" />
              <div className="h-4 bg-zinc-100 rounded w-3/4 animate-pulse" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
