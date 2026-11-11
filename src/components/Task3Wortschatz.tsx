import React from 'react';
import { QuizProgress } from '../types/career';
import { CORRECT_ANSWERS } from '../utils/quizLogic';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';
import { speakGerman } from '../utils/soundEffects';

interface Task3Props {
  progress: QuizProgress['task3'];
  onSelect: (key: keyof QuizProgress['task3'], value: string) => void;
}

export const Task3Wortschatz: React.FC<Task3Props> = ({ progress, onSelect }) => {
  const isCorrect = (key: keyof QuizProgress['task3']) => {
    return progress[key] === CORRECT_ANSWERS[key];
  };

  const isSelected = (key: keyof QuizProgress['task3'], option: string) => {
    return progress[key] === option;
  };

  const renderChoicePill = (
    key: keyof QuizProgress['task3'],
    opt1: string,
    opt2: string,
    num: number
  ) => {
    const solved = isCorrect(key);
    const selected = progress[key];

    return (
      <span className="inline-flex items-center mx-1 my-0.5 bg-slate-200/80 dark:bg-slate-700/80 p-0.5 rounded-lg border border-slate-300 dark:border-slate-600 align-middle">
        <button
          type="button"
          disabled={solved}
          onClick={() => onSelect(key, opt1)}
          className={`px-2 py-0.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
            isSelected(key, opt1)
              ? solved
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          {opt1}
        </button>

        <span className="text-slate-400 dark:text-slate-500 px-0.5 text-xs">/</span>

        <button
          type="button"
          disabled={solved}
          onClick={() => onSelect(key, opt2)}
          className={`px-2 py-0.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
            isSelected(key, opt2)
              ? solved
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          {opt2}
        </button>

        <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1 font-mono font-normal">
          ({num})
        </span>
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shadow-md shadow-sky-600/20">
            3
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Aufgabe 3: Beruf & Wortschatz
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Was ist richtig? Klicke auf das passende Wort im Satz (6 Punkte)
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            speakGerman(
              'Meine Schwester möchte später Bankkauffrau werden, denn sie findet diesen Beruf spannend. Außerdem möchte sie in einem Büro arbeiten. Hoffentlich kann sie ein Praktikum bei einer Bank machen. Sie hat schon ein paar Bewerbungen geschrieben und wartet jetzt auf eine Antwort. Im Internet hat sie viele Informationen über den Beruf gefunden. Die Ausbildung dauert drei Jahre. Dann findet man sehr schnell eine Arbeit, aber manchmal hat man Stress. Na ja, man kann nicht alles haben!'
            )
          }
          title="Text auf Deutsch anhören"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Text anhören</span>
        </button>
      </div>

      {/* Narrative Paragraph */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-sm sm:text-base leading-loose text-slate-700 dark:text-slate-200">
        <span>Meine Schwester möchte später Bankkauffrau </span>
        {renderChoicePill('t3_word1', 'werden', 'bekommen', 1)}
        <span>, denn sie findet diesen Beruf </span>
        {renderChoicePill('t3_word2', 'spannend', 'zufrieden', 2)}
        <span>. Außerdem möchte sie in einem </span>
        {renderChoicePill('t3_word3', 'Firma', 'Büro', 3)}
        <span> arbeiten. Hoffentlich kann sie ein Praktikum bei einer Bank machen. Sie hat schon ein paar </span>
        {renderChoicePill('t3_word4', 'Aufsätze', 'Bewerbungen', 4)}
        <span> geschrieben und wartet jetzt auf eine Antwort. Im Internet hat sie viele Informationen über den Beruf gefunden. Die Ausbildung </span>
        {renderChoicePill('t3_word5', 'dauert', 'bearbeitet', 5)}
        <span> drei Jahre. Dann findet man sehr schnell eine Arbeit, aber manchmal hat man </span>
        {renderChoicePill('t3_word6', 'Stress', 'Gepäck', 6)}
        <span>. Na ja, man kann nicht alles haben!</span>
      </div>
    </div>
  );
};
