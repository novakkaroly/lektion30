import React from 'react';
import confetti from 'canvas-confetti';
import { CareerTrack, CareerLevelInfo } from '../types/career';
import { getGermanGrade } from '../utils/quizLogic';
import { Trophy, Award, CheckCircle, RotateCcw, X, Share2, Sparkles } from 'lucide-react';

interface CompletionCertificateModalProps {
  isOpen: boolean;
  score: number;
  maxScore: number;
  task1Score: number;
  task2Score: number;
  task3Score: number;
  career: CareerTrack;
  levelInfo: CareerLevelInfo;
  onClose: () => void;
  onReset: () => void;
}

export const CompletionCertificateModal: React.FC<CompletionCertificateModalProps> = ({
  isOpen,
  score,
  maxScore,
  task1Score,
  task2Score,
  task3Score,
  career,
  levelInfo,
  onClose,
  onReset,
}) => {
  if (!isOpen) return null;

  const gradeInfo = getGermanGrade(score);

  const handleConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border-2 border-amber-400/80 overflow-hidden text-slate-800 dark:text-slate-100 animate-scale-up">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex p-3 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 mb-2">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-wide text-amber-300 uppercase">
            Karriere-Zertifikat & Auswertung
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Beste Freunde Lektion 30: Test A – Grammatik & Wortschatz
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Grade & Score Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Erreichte Schulnote
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-sky-600 dark:text-sky-400">
                  Note {gradeInfo.gradeNumber}
                </span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-200">
                  ({gradeInfo.gradeText})
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {gradeInfo.comment}
              </p>
            </div>

            <div className="text-center sm:text-right sm:border-l sm:border-slate-300 dark:sm:border-slate-700 sm:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Gesamtpunktzahl
              </span>
              <div className="text-3xl font-black text-amber-500">
                {score} <span className="text-base font-normal text-slate-400">/ {maxScore}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {Math.round((score / maxScore) * 100)}% erreicht
              </span>
            </div>
          </div>

          {/* Achieved Career Title */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-center gap-4">
            <span className="text-3xl">{career.icon}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Erreichte Karrierestufe in {career.name}
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                {levelInfo.title}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {levelInfo.description}
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Punkteaufteilung nach Aufgaben
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-500 dark:text-slate-400">Aufgabe 1</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {task1Score} <span className="text-[10px] font-normal text-slate-400">/ 9</span>
                </div>
                <div className="text-[10px] text-slate-400">Artikel & Endungen</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-500 dark:text-slate-400">Aufgabe 2</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {task2Score} <span className="text-[10px] font-normal text-slate-400">/ 5</span>
                </div>
                <div className="text-[10px] text-slate-400">Modalverben</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-500 dark:text-slate-400">Aufgabe 3</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {task3Score} <span className="text-[10px] font-normal text-slate-400">/ 6</span>
                </div>
                <div className="text-[10px] text-slate-400">Wortschatz</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleConfetti}
              className="flex-1 py-3 px-4 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Konfetti feiern!</span>
            </button>

            <button
              onClick={onReset}
              className="py-3 px-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Neuer Versuch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
