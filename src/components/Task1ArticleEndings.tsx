import React from 'react';
import { QuizProgress } from '../types/career';
import { CORRECT_ANSWERS } from '../utils/quizLogic';
import { Volume2, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { speakGerman } from '../utils/soundEffects';

interface Task1Props {
  progress: QuizProgress['task1'];
  onSelect: (key: keyof QuizProgress['task1'], value: string) => void;
  onOpenGrammar: () => void;
}

export const Task1ArticleEndings: React.FC<Task1Props> = ({
  progress,
  onSelect,
  onOpenGrammar,
}) => {
  const isCorrect = (key: keyof QuizProgress['task1']) => {
    return progress[key].toLowerCase() === CORRECT_ANSWERS[key].toLowerCase();
  };

  const isFilled = (key: keyof QuizProgress['task1']) => {
    return progress[key].length > 0;
  };

  const getSelectClass = (key: keyof QuizProgress['task1']) => {
    if (!isFilled(key)) {
      return 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500';
    }
    if (isCorrect(key)) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
    }
    return 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shadow-md shadow-sky-600/20">
            1
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Aufgabe 1: Artikel und Endungen
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adjektivdeklination nach bestimmtem Artikel im Nominativ und Akkusativ (9 Punkte)
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGrammar}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Grammatik-Tabelle
        </button>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
        {/* Dialogue 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Dialog 1: Im Einkaufszentrum
            </span>
            <button
              onClick={() =>
                speakGerman(
                  'Gestern habe ich das große Sportgeschäft FIT im Zentrum besucht. Ich finde die neue Mode wirklich interessant. Ich kaufe nie da ein. Ich mag den unhöflichen Verkäufer in der Schuhabteilung nicht. Er ist furchtbar.'
                )
              }
              title="Dialog auf Deutsch anhören"
              className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Anhören</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-bold text-sky-600 dark:text-sky-400 mr-1.5">■</span>
              <span>Gestern habe ich </span>

              {/* t1_art1: das */}
              <select
                aria-label="Artikel Sportgeschäft"
                value={progress.t1_art1}
                disabled={isCorrect('t1_art1')}
                onChange={(e) => onSelect('t1_art1', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_art1'
                )}`}
              >
                <option value="">-- Artikel --</option>
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
                <option value="den">den</option>
              </select>

              <span>groß</span>

              {/* t1_end1: e */}
              <select
                aria-label="Endung große"
                value={progress.t1_end1}
                disabled={isCorrect('t1_end1')}
                onChange={(e) => onSelect('t1_end1', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_end1'
                )}`}
              >
                <option value="">--</option>
                <option value="e">-e</option>
                <option value="en">-en</option>
                <option value="er">-er</option>
                <option value="es">-es</option>
              </select>

              <span> Sportgeschäft FIT im Zentrum besucht. Ich finde </span>

              {/* t1_art2: die */}
              <select
                aria-label="Artikel Mode"
                value={progress.t1_art2}
                disabled={isCorrect('t1_art2')}
                onChange={(e) => onSelect('t1_art2', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_art2'
                )}`}
              >
                <option value="">-- Artikel --</option>
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
                <option value="den">den</option>
              </select>

              <span>neu</span>

              {/* t1_end2: e */}
              <select
                aria-label="Endung neue"
                value={progress.t1_end2}
                disabled={isCorrect('t1_end2')}
                onChange={(e) => onSelect('t1_end2', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_end2'
                )}`}
              >
                <option value="">--</option>
                <option value="e">-e</option>
                <option value="en">-en</option>
                <option value="er">-er</option>
                <option value="es">-es</option>
              </select>

              <span> Mode wirklich interessant.</span>
            </div>

            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/80">
              <span className="font-bold text-amber-500 mr-1.5">▲</span>
              <span>Ich kaufe nie da ein. Ich mag </span>

              {/* t1_art3: den */}
              <select
                aria-label="Artikel Verkäufer"
                value={progress.t1_art3}
                disabled={isCorrect('t1_art3')}
                onChange={(e) => onSelect('t1_art3', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_art3'
                )}`}
              >
                <option value="">-- Artikel --</option>
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
                <option value="den">den</option>
              </select>

              <span>unhöflich</span>

              {/* t1_end3: en */}
              <select
                aria-label="Endung unhöflichen"
                value={progress.t1_end3}
                disabled={isCorrect('t1_end3')}
                onChange={(e) => onSelect('t1_end3', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_end3'
                )}`}
              >
                <option value="">--</option>
                <option value="e">-e</option>
                <option value="en">-en</option>
                <option value="er">-er</option>
                <option value="es">-es</option>
              </select>

              <span> Verkäufer in der Schuhabteilung nicht. Er ist furchtbar.</span>
            </div>
          </div>
        </div>

        {/* Dialogue 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Dialog 2: In der Schule
            </span>
            <button
              onClick={() =>
                speakGerman(
                  'Was magst du nicht in der Schule? Die stressigen Prüfungen und die doofe Englischlehrerin. Ich finde sie auch doof. Aber der neue Biolehrer ist echt cool.'
                )
              }
              title="Dialog auf Deutsch anhören"
              className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Anhören</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-bold text-sky-600 dark:text-sky-400 mr-1.5">■</span>
              <span>Was magst du nicht in der Schule?</span>
            </div>

            <div className="pt-1">
              <span className="font-bold text-amber-500 mr-1.5">▲</span>

              {/* t1_art4: Die */}
              <select
                aria-label="Artikel Prüfungen"
                value={progress.t1_art4}
                disabled={isCorrect('t1_art4')}
                onChange={(e) => onSelect('t1_art4', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_art4'
                )}`}
              >
                <option value="">-- Artikel --</option>
                <option value="Der">Der</option>
                <option value="Die">Die</option>
                <option value="Das">Das</option>
                <option value="Den">Den</option>
              </select>

              <span>stressig</span>

              {/* t1_end4: en */}
              <select
                aria-label="Endung stressigen"
                value={progress.t1_end4}
                disabled={isCorrect('t1_end4')}
                onChange={(e) => onSelect('t1_end4', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_end4'
                )}`}
              >
                <option value="">--</option>
                <option value="e">-e</option>
                <option value="en">-en</option>
                <option value="er">-er</option>
                <option value="es">-es</option>
              </select>

              <span> Prüfungen und </span>

              {/* t1_art5: die */}
              <select
                aria-label="Artikel Englischlehrerin"
                value={progress.t1_art5}
                disabled={isCorrect('t1_art5')}
                onChange={(e) => onSelect('t1_art5', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_art5'
                )}`}
              >
                <option value="">-- Artikel --</option>
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
                <option value="den">den</option>
              </select>

              <span>doof</span>

              {/* t1_end5: e */}
              <select
                aria-label="Endung doofe"
                value={progress.t1_end5}
                disabled={isCorrect('t1_end5')}
                onChange={(e) => onSelect('t1_end5', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_end5'
                )}`}
              >
                <option value="">--</option>
                <option value="e">-e</option>
                <option value="en">-en</option>
                <option value="er">-er</option>
                <option value="es">-es</option>
              </select>

              <span> Englischlehrerin.</span>
            </div>

            <div className="pt-1">
              <span className="font-bold text-sky-600 dark:text-sky-400 mr-1.5">■</span>
              <span>Ich finde sie auch doof. Aber </span>

              {/* t1_art6: der */}
              <select
                aria-label="Artikel Biolehrer"
                value={progress.t1_art6}
                disabled={isCorrect('t1_art6')}
                onChange={(e) => onSelect('t1_art6', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_art6'
                )}`}
              >
                <option value="">-- Artikel --</option>
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
                <option value="den">den</option>
              </select>

              <span>neu</span>

              {/* t1_end6: e */}
              <select
                aria-label="Endung neue"
                value={progress.t1_end6}
                disabled={isCorrect('t1_end6')}
                onChange={(e) => onSelect('t1_end6', e.target.value)}
                className={`mx-1 px-2 py-1 rounded-md border text-sm font-medium transition-all ${getSelectClass(
                  't1_end6'
                )}`}
              >
                <option value="">--</option>
                <option value="e">-e</option>
                <option value="en">-en</option>
                <option value="er">-er</option>
                <option value="es">-es</option>
              </select>

              <span> Biolehrer ist echt cool.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
