import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface GrammarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrammarDrawer: React.FC<GrammarDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Grammatik-Spickzettel: Beste Freunde Lektion 30
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Wichtige Regeln für Adjektivendungen und Modalverben im Präteritum
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {/* Table 1: Adjective Endings */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              1. Adjektivdeklination nach bestimmtem Artikel
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Merkregel: Im Nominativ und im Akkusativ Feminin/Neutral endet das Adjektiv auf{' '}
              <strong className="text-sky-600 dark:text-sky-400 font-bold">-e</strong>. Im Akkusativ
              Maskulin und im Plural endet es immer auf{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">-en</strong>!
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2.5">Kasus</th>
                    <th className="p-2.5">Maskulin (der)</th>
                    <th className="p-2.5">Feminin (die)</th>
                    <th className="p-2.5">Neutral (das)</th>
                    <th className="p-2.5">Plural (die)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">Nominativ</td>
                    <td className="p-2.5">der neu<strong>e</strong> Biolehrer</td>
                    <td className="p-2.5">die doof<strong>e</strong> Lehrerin</td>
                    <td className="p-2.5">das groß<strong>e</strong> Geschäft</td>
                    <td className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20">
                      die stressig<strong>en</strong> Prüfungen
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">Akkusativ</td>
                    <td className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20">
                      den unhöflich<strong>en</strong> Verkäufer
                    </td>
                    <td className="p-2.5">die neu<strong>e</strong> Mode</td>
                    <td className="p-2.5">das groß<strong>e</strong> Geschäft</td>
                    <td className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20">
                      die stressig<strong>en</strong> Prüfungen
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Modal Verbs in Past Tense */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              2. Modalverben im Präteritum (Vergangenheit)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Wichtig: Im Präteritum verlieren die Modalverben ihren Umlaut (können &rarr;{' '}
              <strong>konnte</strong>, müssen &rarr; <strong>musste</strong>, dürfen &rarr;{' '}
              <strong>durfte</strong>). Die 1. und 3. Person Singular sind identisch!
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2.5">Person</th>
                    <th className="p-2.5">wollen</th>
                    <th className="p-2.5">können</th>
                    <th className="p-2.5">müssen</th>
                    <th className="p-2.5">dürfen</th>
                    <th className="p-2.5">sollen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold">ich</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">wollte</td>
                    <td className="p-2.5 font-medium">konnte</td>
                    <td className="p-2.5 font-medium">musste</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">durfte</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">sollte</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold">du</td>
                    <td className="p-2.5 font-medium">wolltest</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">konntest</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">musstest</td>
                    <td className="p-2.5 font-medium">durftest</td>
                    <td className="p-2.5 font-medium">solltest</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold">er / sie / es</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">wollte</td>
                    <td className="p-2.5 font-medium">konnte</td>
                    <td className="p-2.5 font-medium">musste</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">durfte</td>
                    <td className="p-2.5 font-medium text-sky-600 dark:text-sky-400">sollte</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold">wir</td>
                    <td className="p-2.5 font-medium">wollten</td>
                    <td className="p-2.5 font-medium">konnten</td>
                    <td className="p-2.5 font-medium">mussten</td>
                    <td className="p-2.5 font-medium">durften</td>
                    <td className="p-2.5 font-medium">sollten</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 3: Berufswortschatz */}
          <div className="space-y-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Wichtige Redemittel zum Thema Beruf & Praktikum
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950 dark:text-amber-200">
              <li>• ein Praktikum im Krankenhaus <strong>machen</strong></li>
              <li>• Bankkauffrau <strong>werden</strong> (Zukunftswunsch)</li>
              <li>• in einem <strong>Büro</strong> arbeiten</li>
              <li>• <strong>Bewerbungen</strong> schreiben</li>
              <li>• eine Ausbildung <strong>dauert</strong> drei Jahre</li>
              <li>• bei der Arbeit <strong>Stress</strong> haben</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
