export type CareerKey = 'medical' | 'finance' | 'education';

export interface CareerLevelInfo {
  levelIndex: number; // 0 to 5
  title: string;
  badge: string;
  description: string;
  minPoints: number;
  unlockedProps: string[];
}

export interface CareerTrack {
  key: CareerKey;
  name: string;
  icon: string;
  colorHex: string;
  colorThree: number;
  bgThree: number;
  accentColor: string;
  relatedTask: string;
  levels: CareerLevelInfo[];
}

export interface QuizProgress {
  // Task 1: 12 selections
  // Dialogue 1: das, e, die, e, den, en
  // Dialogue 2: Die, en, die, e, der, e
  task1: {
    t1_art1: string;
    t1_end1: string;
    t1_art2: string;
    t1_end2: string;
    t1_art3: string;
    t1_end3: string;
    t1_art4: string;
    t1_end4: string;
    t1_art5: string;
    t1_end5: string;
    t1_art6: string;
    t1_end6: string;
  };
  // Task 2: 5 modal verbs in past tense
  task2: {
    t2_verb1: string; // wollte
    t2_verb2: string; // konntest
    t2_verb3: string; // musstest
    t2_verb4: string; // durfte
    t2_verb5: string; // sollte
  };
  // Task 3: 6 vocabulary choices
  task3: {
    t3_word1: string; // werden
    t3_word2: string; // spannend
    t3_word3: string; // Büro
    t3_word4: string; // Bewerbungen
    t3_word5: string; // dauert
    t3_word6: string; // Stress
  };
}

export interface AnswerValidationStatus {
  [key: string]: boolean;
}
