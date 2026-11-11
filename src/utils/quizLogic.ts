import { CareerKey, CareerTrack, QuizProgress } from '../types/career';

export const CAREER_TRACKS: Record<CareerKey, CareerTrack> = {
  medical: {
    key: 'medical',
    name: 'Medizin & Gesundheit',
    icon: '🏥',
    colorHex: '#0284c7', // sky-600
    colorThree: 0x0284c7,
    bgThree: 0xe0f2fe,
    accentColor: '#38bdf8',
    relatedTask: 'Aufgabe 2: Praktikum im Krankenhaus',
    levels: [
      {
        levelIndex: 0,
        title: 'Praktikant/in im Krankenhaus',
        badge: '🩺 Stufe 1',
        description: 'Du hilfst den Krankenschwestern und bringst den Patienten das Essen.',
        minPoints: 0,
        unlockedProps: ['Namensschild', 'Notizblock'],
      },
      {
        levelIndex: 1,
        title: 'Pflegehelfer/in',
        badge: '🩹 Stufe 2',
        description: 'Du unterstützt die Stationsleitung und hast deine ersten medizinischen Aufgaben.',
        minPoints: 4,
        unlockedProps: ['Klinik-Kasack (Blau)', 'Rotes Kreuz Abzeichen'],
      },
      {
        levelIndex: 2,
        title: 'Krankenpfleger/in',
        badge: '💉 Stufe 3',
        description: 'Ausgebildete Pflegefachkraft mit Klemmbrett und Patientenakten.',
        minPoints: 8,
        unlockedProps: ['Pflege-Klemmbrett', 'Medizinische Schutzhandschuhe'],
      },
      {
        levelIndex: 3,
        title: 'Assistenzarzt / -ärztin',
        badge: '🩺 Stufe 4',
        description: 'Erfolgreich approbiert! Du trägst den weißen Kittel und untersuchst Patienten.',
        minPoints: 12,
        unlockedProps: ['Weißer Arztkittel', 'Stethoskop', 'Visitenmappe'],
      },
      {
        levelIndex: 4,
        title: 'Oberarzt / -ärztin',
        badge: '⭐ Stufe 5',
        description: 'Spezialist/in und Leitungsfunktion in der Klinik mit Stirnspiegel.',
        minPoints: 16,
        unlockedProps: ['Klassischer Stirnspiegel', 'Chefarzt-Visitenpult'],
      },
      {
        levelIndex: 5,
        title: 'Klinikdirektor/in',
        badge: '👑 Stufe 6 - Maximum',
        description: 'Höchste medizinische Leitung des Krankenhauses mit goldener Äskulap-Medaille!',
        minPoints: 20,
        unlockedProps: ['Goldener Äskulapstab', 'Direktorenpult', 'Goldenes Ehrenpodest'],
      },
    ],
  },
  finance: {
    key: 'finance',
    name: 'Bankwesen & Finanzen',
    icon: '🏦',
    colorHex: '#16a34a', // green-600
    colorThree: 0x16a34a,
    bgThree: 0xdcfce7,
    accentColor: '#4ade80',
    relatedTask: 'Aufgabe 3: Ausbildung zur Bankkauffrau',
    levels: [
      {
        levelIndex: 0,
        title: 'Schülerpraktikant/in',
        badge: '📝 Stufe 1',
        description: 'Erste Einblicke in die Finanzwelt und die Abteilungen der Bank.',
        minPoints: 0,
        unlockedProps: ['Praktikumsmappe', 'Besucherausweis'],
      },
      {
        levelIndex: 1,
        title: 'Azubi Bankkaufmann/-frau',
        badge: '💼 Stufe 2',
        description: '3-jährige duale Ausbildung mit Kundenbetreuung und Schalterdienst.',
        minPoints: 4,
        unlockedProps: ['Business-Hemd', 'Krawatte'],
      },
      {
        levelIndex: 2,
        title: 'Bankkaufmann/-frau',
        badge: '📊 Stufe 3',
        description: 'Erfolgreicher Abschluss! Selbstständige Kontoführung und Kundenberatung.',
        minPoints: 8,
        unlockedProps: ['Leder-Aktentasche', 'Büro-Arbeitsplatz'],
      },
      {
        levelIndex: 3,
        title: 'Finanzberater/in',
        badge: '📈 Stufe 4',
        description: 'Experte für Kredite, Investitionen und anspruchsvolle Finanzprodukte.',
        minPoints: 12,
        unlockedProps: ['Edler Designer-Anzug', 'Goldene Armbanduhr'],
      },
      {
        levelIndex: 4,
        title: 'Filialleiter/in',
        badge: '🏢 Stufe 5',
        description: 'Leiter/in der gesamten Bankfiliale mit Personalverantwortung.',
        minPoints: 16,
        unlockedProps: ['Filialleiter-Zylinder', 'Mahagoni-Schreibtisch'],
      },
      {
        levelIndex: 5,
        title: 'Bankdirektor/in & Vorstand',
        badge: '👑 Stufe 6 - Maximum',
        description: 'Vorstandsvorsitz der Bankengruppe mit Tresor-Schlüssel und Gold-Status!',
        minPoints: 20,
        unlockedProps: ['Goldene Taschenuhr', 'Panzertresor-Emblem', 'Goldenes Ehrenpodest'],
      },
    ],
  },
  education: {
    key: 'education',
    name: 'Bildung & Sport-Handel',
    icon: '🏫',
    colorHex: '#ea580c', // orange-600
    colorThree: 0xea580c,
    bgThree: 0xffedd5,
    accentColor: '#fb923c',
    relatedTask: 'Aufgabe 1: Sportgeschäft & Schule',
    levels: [
      {
        levelIndex: 0,
        title: 'Schüler/in',
        badge: '🎒 Stufe 1',
        description: 'Du lernst fleißig für die Prüfungen und besuchst das Sportgeschäft FIT.',
        minPoints: 0,
        unlockedProps: ['Schulrucksack', 'FIT-Sportkappe'],
      },
      {
        levelIndex: 1,
        title: 'Aushilfe im Sportgeschäft',
        badge: '👟 Stufe 2',
        description: 'Nebenjob im Zentrum: Du hilfst in der Mode- und Schuhabteilung.',
        minPoints: 4,
        unlockedProps: ['FIT-Team-Trikot', 'Sneaker-Accessoire'],
      },
      {
        levelIndex: 2,
        title: 'Verkaufsberater/in FIT',
        badge: '🏷️ Stufe 3',
        description: 'Kompetente Beratung für Kunden – immer freundlich und zuvorkommend.',
        minPoints: 8,
        unlockedProps: ['Verkäufer-Tablet', 'Sport-Ausrüstung'],
      },
      {
        levelIndex: 3,
        title: 'Lehramtsreferendar/in',
        badge: '📚 Stufe 4',
        description: 'Unterrichtspraktikum an der Schule mit spannenden Experimenten.',
        minPoints: 12,
        unlockedProps: ['Bücherstapel', 'Dozenten-Brille'],
      },
      {
        levelIndex: 4,
        title: 'Biolehrer/in (Echt cool!)',
        badge: '🔬 Stufe 5',
        description: 'Der beliebteste Biolehrer der Schule – anschaulicher und cooler Unterricht!',
        minPoints: 16,
        unlockedProps: ['Mikroskop-Modell', 'Tafel-Zeigestab', 'Akademischer Doktorhut'],
      },
      {
        levelIndex: 5,
        title: 'Schuldirektor/in',
        badge: '👑 Stufe 6 - Maximum',
        description: 'Schulleitung mit Rednerpult, Lorbeerkranz und Ehrenabschlussurkunde!',
        minPoints: 20,
        unlockedProps: ['Direktoren-Rednerpult', 'Goldenes Diplom', 'Goldenes Ehrenpodest'],
      },
    ],
  },
};

export const CORRECT_ANSWERS = {
  // Task 1 (12 items * 0.75 pt = 9.0 pts)
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

  // Task 2 (5 items * 1.0 pt = 5.0 pts)
  t2_verb1: 'wollte',
  t2_verb2: 'konntest',
  t2_verb3: 'musstest',
  t2_verb4: 'durfte',
  t2_verb5: 'sollte',

  // Task 3 (6 items * 1.0 pt = 6.0 pts)
  t3_word1: 'werden',
  t3_word2: 'spannend',
  t3_word3: 'Büro',
  t3_word4: 'Bewerbungen',
  t3_word5: 'dauert',
  t3_word6: 'Stress',
};

export const INITIAL_QUIZ_PROGRESS: QuizProgress = {
  task1: {
    t1_art1: '',
    t1_end1: '',
    t1_art2: '',
    t1_end2: '',
    t1_art3: '',
    t1_end3: '',
    t1_art4: '',
    t1_end4: '',
    t1_art5: '',
    t1_end5: '',
    t1_art6: '',
    t1_end6: '',
  },
  task2: {
    t2_verb1: '',
    t2_verb2: '',
    t2_verb3: '',
    t2_verb4: '',
    t2_verb5: '',
  },
  task3: {
    t3_word1: '',
    t3_word2: '',
    t3_word3: '',
    t3_word4: '',
    t3_word5: '',
    t3_word6: '',
  },
};

export function normalizeGermanText(input: string): string {
  return input.trim().toLowerCase();
}

export function validateAnswer(key: keyof typeof CORRECT_ANSWERS, userAnswer: string): boolean {
  if (!userAnswer) return false;
  const correct = CORRECT_ANSWERS[key];
  return normalizeGermanText(userAnswer) === normalizeGermanText(correct);
}

export function calculateQuizScore(progress: QuizProgress): {
  totalScore: number;
  task1Score: number;
  task2Score: number;
  task3Score: number;
  solvedCount: number;
  totalQuestions: number;
} {
  let task1Score = 0;
  let task2Score = 0;
  let task3Score = 0;
  let solvedCount = 0;

  // Task 1: 12 questions * 0.75 = 9.0 pts
  const t1Keys: (keyof QuizProgress['task1'])[] = [
    't1_art1', 't1_end1', 't1_art2', 't1_end2',
    't1_art3', 't1_end3', 't1_art4', 't1_end4',
    't1_art5', 't1_end5', 't1_art6', 't1_end6',
  ];
  t1Keys.forEach((key) => {
    if (validateAnswer(key, progress.task1[key])) {
      task1Score += 0.75;
      solvedCount++;
    }
  });

  // Task 2: 5 questions * 1.0 = 5.0 pts
  const t2Keys: (keyof QuizProgress['task2'])[] = [
    't2_verb1', 't2_verb2', 't2_verb3', 't2_verb4', 't2_verb5',
  ];
  t2Keys.forEach((key) => {
    if (validateAnswer(key, progress.task2[key])) {
      task2Score += 1.0;
      solvedCount++;
    }
  });

  // Task 3: 6 questions * 1.0 = 6.0 pts
  const t3Keys: (keyof QuizProgress['task3'])[] = [
    't3_word1', 't3_word2', 't3_word3', 't3_word4', 't3_word5', 't3_word6',
  ];
  t3Keys.forEach((key) => {
    if (validateAnswer(key, progress.task3[key])) {
      task3Score += 1.0;
      solvedCount++;
    }
  });

  const totalScore = Math.min(20, Math.round((task1Score + task2Score + task3Score) * 100) / 100);

  return {
    totalScore,
    task1Score: Math.round(task1Score * 100) / 100,
    task2Score: Math.round(task2Score * 100) / 100,
    task3Score: Math.round(task3Score * 100) / 100,
    solvedCount,
    totalQuestions: 23,
  };
}

export function calculateCareerLevel(score: number): number {
  // 6 levels: 0, 1, 2, 3, 4, 5
  if (score >= 20) return 5;
  if (score >= 16) return 4;
  if (score >= 12) return 3;
  if (score >= 8) return 2;
  if (score >= 4) return 1;
  return 0;
}

export function getGermanGrade(score: number): {
  gradeNumber: string;
  gradeText: string;
  comment: string;
  colorClass: string;
} {
  if (score >= 19) {
    return {
      gradeNumber: '1',
      gradeText: 'Sehr gut',
      comment: 'Hervorragende Leistung! Du beherrschst Adjektivendungen und Modalverben perfekt.',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
    };
  }
  if (score >= 16) {
    return {
      gradeNumber: '2',
      gradeText: 'Gut',
      comment: 'Sehr solide Deutschkenntnisse! Nur ganz wenige kleine Unsicherheiten.',
      colorClass: 'text-blue-600 dark:text-blue-400',
    };
  }
  if (score >= 13) {
    return {
      gradeNumber: '3',
      gradeText: 'Befriedigend',
      comment: 'Gute Basis, aber übe noch die Adjektivdeklination im Akkusativ und Modalverben.',
      colorClass: 'text-amber-600 dark:text-amber-400',
    };
  }
  if (score >= 10) {
    return {
      gradeNumber: '4',
      gradeText: 'Ausreichend',
      comment: 'Bestanden, aber schau dir noch die Grammatiktabellen an!',
      colorClass: 'text-orange-600 dark:text-orange-400',
    };
  }
  return {
    gradeNumber: '5',
    gradeText: 'Mangelhaft',
    comment: 'Lies die Grammatik-Hinweise durch und versuche es noch einmal!',
    colorClass: 'text-rose-600 dark:text-rose-400',
  };
}
