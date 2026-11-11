import React, { useState, useEffect, useRef } from 'react';
import {
  CareerKey,
  CareerTrack,
  QuizProgress,
} from './types/career';
import {
  CAREER_TRACKS,
  CORRECT_ANSWERS,
  INITIAL_QUIZ_PROGRESS,
  calculateCareerLevel,
  calculateQuizScore,
} from './utils/quizLogic';
import {
  playCorrectSound,
  playWrongSound,
  playCareerSwitchSound,
  playClickSound,
  setSoundEnabled,
  isSoundEnabled,
} from './utils/soundEffects';
import { ThreeCareerStage } from './components/ThreeCareerStage';
import { Task1ArticleEndings } from './components/Task1ArticleEndings';
import { Task2ModalVerben } from './components/Task2ModalVerben';
import { Task3Wortschatz } from './components/Task3Wortschatz';
import { GrammarDrawer } from './components/GrammarDrawer';
import { PromotionModal } from './components/PromotionModal';
import { CompletionCertificateModal } from './components/CompletionCertificateModal';
import {
  Trophy,
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
} from 'lucide-react';

export default function App() {
  const [currentCareer, setCurrentCareer] = useState<CareerKey>('medical');
  const [progress, setProgress] = useState<QuizProgress>(INITIAL_QUIZ_PROGRESS);
  const [activeTaskTab, setActiveTaskTab] = useState<'all' | 't1' | 't2' | 't3'>('all');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [isGrammarOpen, setIsGrammarOpen] = useState<boolean>(false);
  const [isPromotionOpen, setIsPromotionOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Animations trigger states for 3D stage
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [isLevelingUp, setIsLevelingUp] = useState<boolean>(false);

  // Previous level tracker to detect promotions
  const prevLevelRef = useRef<number>(0);

  // Calculate current score & level
  const { totalScore, task1Score, task2Score, task3Score, solvedCount, totalQuestions } =
    calculateQuizScore(progress);
  const currentLevel = calculateCareerLevel(totalScore);

  // Sound toggle effect
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  // Career Switcher
  const handleSelectCareer = (key: CareerKey) => {
    if (key === currentCareer) return;
    playCareerSwitchSound();
    setCurrentCareer(key);
  };

  // Check for Level Up / Promotion
  useEffect(() => {
    if (currentLevel > prevLevelRef.current) {
      prevLevelRef.current = currentLevel;
      setIsLevelingUp(true);
      setIsPromotionOpen(true);
      const timer = setTimeout(() => {
        setIsLevelingUp(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      prevLevelRef.current = currentLevel;
    }
  }, [currentLevel]);

  // Handle Answer Changes
  const handleTask1Select = (key: keyof QuizProgress['task1'], value: string) => {
    if (!value) return;
    const isCorrect = value.toLowerCase() === CORRECT_ANSWERS[key].toLowerCase();

    setProgress((prev) => ({
      ...prev,
      task1: { ...prev.task1, [key]: value },
    }));

    if (isCorrect) {
      playCorrectSound();
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 900);
    } else {
      playWrongSound();
    }
  };

  const handleTask2Change = (key: keyof QuizProgress['task2'], value: string) => {
    setProgress((prev) => ({
      ...prev,
      task2: { ...prev.task2, [key]: value },
    }));

    const isCorrect = value.trim().toLowerCase() === CORRECT_ANSWERS[key].toLowerCase();
    if (isCorrect) {
      playCorrectSound();
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 900);
    } else if (value.trim().length >= 4) {
      playWrongSound();
    }
  };

  const handleTask3Select = (key: keyof QuizProgress['task3'], value: string) => {
    const isCorrect = value === CORRECT_ANSWERS[key];

    setProgress((prev) => ({
      ...prev,
      task3: { ...prev.task3, [key]: value },
    }));

    if (isCorrect) {
      playCorrectSound();
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 900);
    } else {
      playWrongSound();
    }
  };

  // Quick Demo / Test Fill
  const handleFillDemoSolution = () => {
    playClickSound();
    setProgress({
      task1: {
        t1_art1: 'das',
        t1_end1: 'e',
        t1_art2: 'die',
        t1_end2: 'e',
        t1_art3: 'den',
        t1_end3: 'en',
        t1_art4: 'Die',
        t1_end4: 'en',
        t1_art5: 'die',
        t1_end5: 'e',
        t1_art6: 'der',
        t1_end6: 'e',
      },
      task2: {
        t2_verb1: 'wollte',
        t2_verb2: 'konntest',
        t2_verb3: 'musstest',
        t2_verb4: 'durfte',
        t2_verb5: 'sollte',
      },
      task3: {
        t3_word1: 'werden',
        t3_word2: 'spannend',
        t3_word3: 'Büro',
        t3_word4: 'Bewerbungen',
        t3_word5: 'dauert',
        t3_word6: 'Stress',
      },
    });
  };

  const handleResetProgress = () => {
    playClickSound();
    setProgress(INITIAL_QUIZ_PROGRESS);
    prevLevelRef.current = 0;
    setIsCertificateOpen(false);
  };

  const careerTrack = CAREER_TRACKS[currentCareer];
  const currentLevelInfo = careerTrack.levels[currentLevel];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* Top Main Navigation Header */}
      <header className="h-14 sm:h-16 px-3 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-30 shrink-0">
        {/* App Title & Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-sky-600/20">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              Beste Freunde <span className="text-sky-600 dark:text-sky-400 font-bold">Lektion 30</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              3D Gamifizierter Deutsch-Karriere-Simulator
            </p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Demo Fill button */}
          <button
            onClick={handleFillDemoSolution}
            title="Alle Antworten korrekt ausfüllen für Demo"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Demo-Lösung</span>
          </button>

          {/* Grammar Drawer Button */}
          <button
            onClick={() => setIsGrammarOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grammatik-Hilfe</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Audio stummschalten' : 'Audio aktivieren'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Zen 3D View Toggle */}
          <button
            onClick={() => setZenMode(!zenMode)}
            title={zenMode ? 'Geteilte Ansicht' : '3D Vollbild'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {zenMode ? <Minimize2 className="w-4 h-4 text-sky-500" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Evaluation / Certificate Button */}
          <button
            onClick={() => setIsCertificateOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Urkunde</span>
          </button>
        </div>
      </header>

      {/* Career Track Selector Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto z-20 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden lg:inline">
            Wähle deine Karriere:
          </span>
          {(['medical', 'finance', 'education'] as CareerKey[]).map((cKey) => {
            const track = CAREER_TRACKS[cKey];
            const isActive = currentCareer === cKey;
            return (
              <button
                key={cKey}
                onClick={() => handleSelectCareer(cKey)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{track.icon}</span>
                <span className="whitespace-nowrap">{track.name}</span>
                {isActive && (
                  <span className="text-[10px] font-extrabold bg-sky-700/80 px-1.5 py-0.5 rounded-full">
                    Stufe {currentLevel + 1}/6
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>Gesamtpunkte:</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
            {totalScore} / 20 Pkt ({solvedCount}/{totalQuestions})
          </span>
        </div>
      </div>

      {/* Main Content Area (Split Screen) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* LEFT PANE: 3D Career Stage */}
        <div
          className={`transition-all duration-300 ease-in-out relative ${
            zenMode
              ? 'w-full h-full'
              : 'w-full md:w-1/2 lg:w-5/12 h-[42vh] md:h-full border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 shrink-0'
          }`}
        >
          <ThreeCareerStage
            careerKey={currentCareer}
            currentLevel={currentLevel}
            score={totalScore}
            maxScore={20}
            isCelebrating={isCelebrating}
            isLevelingUp={isLevelingUp}
          />
        </div>

        {/* RIGHT PANE: Quiz Tasks */}
        {!zenMode && (
          <div className="flex-1 h-[58vh] md:h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900/50">
            {/* Task Filter Tabs */}
            <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTaskTab('all');
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    activeTaskTab === 'all'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Alle Aufgaben (20 Pkt)
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTaskTab('t1');
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                    activeTaskTab === 't1'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>1. Artikel</span>
                  <span className="text-[10px] opacity-75">({task1Score}/9)</span>
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTaskTab('t2');
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                    activeTaskTab === 't2'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>2. Modalverben</span>
                  <span className="text-[10px] opacity-75">({task2Score}/5)</span>
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTaskTab('t3');
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                    activeTaskTab === 't3'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>3. Wortschatz</span>
                  <span className="text-[10px] opacity-75">({task3Score}/6)</span>
                </button>
              </div>

              {/* Reset Quiz button */}
              <button
                onClick={handleResetProgress}
                title="Antworten zurücksetzen"
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Zurücksetzen</span>
              </button>
            </div>

            {/* Scrollable Tasks Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {(activeTaskTab === 'all' || activeTaskTab === 't1') && (
                <Task1ArticleEndings
                  progress={progress.task1}
                  onSelect={handleTask1Select}
                  onOpenGrammar={() => setIsGrammarOpen(true)}
                />
              )}

              {(activeTaskTab === 'all' || activeTaskTab === 't2') && (
                <Task2ModalVerben
                  progress={progress.task2}
                  onChange={handleTask2Change}
                  onOpenGrammar={() => setIsGrammarOpen(true)}
                />
              )}

              {(activeTaskTab === 'all' || activeTaskTab === 't3') && (
                <Task3Wortschatz
                  progress={progress.task3}
                  onSelect={handleTask3Select}
                />
              )}

              {/* Bottom Finish Action Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <h4 className="text-base font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Beste Freunde Lektion 30: Fertig geübt?
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Aktueller Punktestand: <strong>{totalScore} von 20 Punkten</strong> (
                    {Math.round((totalScore / 20) * 100)}%)
                  </p>
                </div>

                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Auswertung & Note ansehen</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grammar Spickzettel Modal */}
      <GrammarDrawer
        isOpen={isGrammarOpen}
        onClose={() => setIsGrammarOpen(false)}
      />

      {/* Beförderung / Promotion Celebration Modal */}
      <PromotionModal
        isOpen={isPromotionOpen}
        career={careerTrack}
        newLevelInfo={currentLevelInfo}
        onClose={() => setIsPromotionOpen(false)}
      />

      {/* Final Grade & Certificate Modal */}
      <CompletionCertificateModal
        isOpen={isCertificateOpen}
        score={totalScore}
        maxScore={20}
        task1Score={task1Score}
        task2Score={task2Score}
        task3Score={task3Score}
        career={careerTrack}
        levelInfo={currentLevelInfo}
        onClose={() => setIsCertificateOpen(false)}
        onReset={handleResetProgress}
      />
    </div>
  );
}
