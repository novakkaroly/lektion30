import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CareerTrack, CareerLevelInfo } from '../types/career';
import { Award, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { playPromotionFanfare } from '../utils/soundEffects';

interface PromotionModalProps {
  isOpen: boolean;
  career: CareerTrack;
  newLevelInfo: CareerLevelInfo;
  onClose: () => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  career,
  newLevelInfo,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      playPromotionFanfare();
      // Multi-angle confetti blast
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center text-white overflow-hidden animate-scale-up">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/25 blur-3xl rounded-full pointer-events-none" />

        {/* Icon & Ribbon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/30 mb-4 animate-bounce">
          <Award className="w-10 h-10" />
        </div>

        <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
          🎉 Karrieresprung!
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 mb-1">
          Beförderung!
        </h2>

        <p className="text-sm text-slate-400 mb-4">
          In deiner Karriere <strong>{career.name}</strong> hast du die nächste Stufe erreicht:
        </p>

        {/* New Job Title Banner */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 mb-5 shadow-inner">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-0.5">
            {newLevelInfo.badge}
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {newLevelInfo.title}
          </div>
          <p className="text-xs text-slate-300 mt-2 italic leading-relaxed">
            "{newLevelInfo.description}"
          </p>

          {/* Unlocked 3D accessories */}
          <div className="mt-3 pt-3 border-t border-slate-700/80">
            <span className="text-[11px] font-semibold text-sky-400 block mb-1">
              Neu an deiner 3D-Figur:
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {newLevelInfo.unlockedProps.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs font-medium bg-slate-900/90 text-slate-200 px-2 py-0.5 rounded-md border border-slate-600"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Weiter üben & aufsteigen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
