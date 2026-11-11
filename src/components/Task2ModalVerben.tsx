import React from 'react';
import { QuizProgress } from '../types/career';
import { CORRECT_ANSWERS } from '../utils/quizLogic';
import { Volume2, HelpCircle, Check, Sparkles } from 'lucide-react';
import { speakGerman } from '../utils/soundEffects';

interface Task2Props {
  progress: QuizProgress['task2'];
  onChange: (key: keyof QuizProgress['task2'], value: string) => void;
  onOpenGrammar: () => void;
}

export const Task2ModalVerben: React.FC<Task2Props> = ({
  progress,
  onChange,
  onOpenGrammar,
}) => {
  const isCorrect = (key: keyof QuizProgress['task2']) => {
    return progress[key].trim().toLowerCase() === CORRECT_ANSWERS[key].toLowerCase();
  };

  const isFilled = (key: keyof QuizProgress['task2']) => {
    return progress[key].trim().length > 0;
  };

  const getInputClass = (key: keyof QuizProgress['task2']) => {
    if (!isFilled(key)) {
      return 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500';
    }
    if (isCorrect(key)) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
    }
    return 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
  };

  const wordBank = ['dürfen', 'wollen', 'müssen', 'sollen', 'können'];

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shadow-md shadow-sky-600/20">
            2
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Aufgabe 2: Modalverben im Präteritum
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Setze das passende Modalverb in der richtigen Vergangenheitsform ein (5 Punkte)
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGrammar}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Konjugationstabelle
        </button>
      </div>

      {/* Word Bank */}
      <div className="mb-5 p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/50 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-sky-800 dark:text-sky-300 mr-1">
          Wortkasten (Infinitiv):
        </span>
        {wordBank.map((verb) => (
          <span
            key={verb}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 font-mono"
          >
            {verb}
          </span>
        ))}
        <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-auto hidden sm:inline">
          💡 Achtung: im Präteritum anpassen (z. B. ich wollte, du konntest...)
        </span>
      </div>

      {/* Dialogue */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Gespräch: Das Praktikum im Krankenhaus
          </span>
          <button
            onClick={() =>
              speakGerman(
                'Ich wollte schon immer ein Praktikum im Krankenhaus machen, weil ich gern anderen helfe. Ich habe echt lange gesucht. Und konntest du etwas finden? Ja, ich hatte Glück. Was waren deine Aufgaben? Was musstest du denn da machen? Den Krankenschwestern helfen und den Kranken das Essen bringen. Aber allein durfte ich nichts machen, das war verboten. Und ich sollte immer besonders nett und höflich sein. Das haben mir alle gesagt.'
              )
            }
            title="Gesamten Dialog auf Deutsch anhören"
            className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Anhören</span>
          </button>
        </div>

        {/* Line 1 */}
        <div>
          <span className="font-bold text-sky-600 dark:text-sky-400 mr-2">■</span>
          <span>Ich </span>
          <input
            type="text"
            aria-label="Modalverb (1)"
            placeholder="(1)"
            value={progress.t2_verb1}
            disabled={isCorrect('t2_verb1')}
            onChange={(e) => onChange('t2_verb1', e.target.value)}
            className={`w-28 px-2.5 py-1 text-center font-medium rounded-md border text-sm transition-all ${getInputClass(
              't2_verb1'
            )}`}
          />
          {isCorrect('t2_verb1') && <Check className="inline w-4 h-4 text-emerald-500 ml-1" />}
          <span> schon immer ein Praktikum im Krankenhaus machen, weil ich gern anderen helfe. Ich habe echt lange gesucht.</span>
        </div>

        {/* Line 2 */}
        <div>
          <span className="font-bold text-amber-500 mr-2">▲</span>
          <span>Und </span>
          <input
            type="text"
            aria-label="Modalverb (2)"
            placeholder="(2)"
            value={progress.t2_verb2}
            disabled={isCorrect('t2_verb2')}
            onChange={(e) => onChange('t2_verb2', e.target.value)}
            className={`w-28 px-2.5 py-1 text-center font-medium rounded-md border text-sm transition-all ${getInputClass(
              't2_verb2'
            )}`}
          />
          {isCorrect('t2_verb2') && <Check className="inline w-4 h-4 text-emerald-500 ml-1" />}
          <span> du etwas finden?</span>
        </div>

        {/* Line 3 */}
        <div>
          <span className="font-bold text-sky-600 dark:text-sky-400 mr-2">■</span>
          <span>Ja, ich hatte Glück.</span>
        </div>

        {/* Line 4 */}
        <div>
          <span className="font-bold text-amber-500 mr-2">▲</span>
          <span>Was waren deine Aufgaben? Was </span>
          <input
            type="text"
            aria-label="Modalverb (3)"
            placeholder="(3)"
            value={progress.t2_verb3}
            disabled={isCorrect('t2_verb3')}
            onChange={(e) => onChange('t2_verb3', e.target.value)}
            className={`w-28 px-2.5 py-1 text-center font-medium rounded-md border text-sm transition-all ${getInputClass(
              't2_verb3'
            )}`}
          />
          {isCorrect('t2_verb3') && <Check className="inline w-4 h-4 text-emerald-500 ml-1" />}
          <span> du denn da machen?</span>
        </div>

        {/* Line 5 */}
        <div>
          <span className="font-bold text-sky-600 dark:text-sky-400 mr-2">■</span>
          <span>Den Krankenschwestern helfen und den Kranken das Essen bringen. Aber allein </span>
          <input
            type="text"
            aria-label="Modalverb (4)"
            placeholder="(4)"
            value={progress.t2_verb4}
            disabled={isCorrect('t2_verb4')}
            onChange={(e) => onChange('t2_verb4', e.target.value)}
            className={`w-28 px-2.5 py-1 text-center font-medium rounded-md border text-sm transition-all ${getInputClass(
              't2_verb4'
            )}`}
          />
          {isCorrect('t2_verb4') && <Check className="inline w-4 h-4 text-emerald-500 ml-1" />}
          <span> ich nichts machen, das war verboten. Und ich </span>
          <input
            type="text"
            aria-label="Modalverb (5)"
            placeholder="(5)"
            value={progress.t2_verb5}
            disabled={isCorrect('t2_verb5')}
            onChange={(e) => onChange('t2_verb5', e.target.value)}
            className={`w-28 px-2.5 py-1 text-center font-medium rounded-md border text-sm transition-all ${getInputClass(
              't2_verb5'
            )}`}
          />
          {isCorrect('t2_verb5') && <Check className="inline w-4 h-4 text-emerald-500 ml-1" />}
          <span> immer besonders nett und höflich sein. Das haben mir alle gesagt.</span>
        </div>
      </div>
    </div>
  );
};
