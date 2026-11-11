import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CAREER_TRACKS,
  CORRECT_ANSWERS,
  INITIAL_QUIZ_PROGRESS,
  calculateCareerLevel,
  calculateQuizScore,
  getGermanGrade,
  normalizeGermanText,
  validateAnswer,
} from './quizLogic.ts';

test('normalizeGermanText trims whitespace and lowercases', () => {
  assert.equal(normalizeGermanText('  Wollte  '), 'wollte');
  assert.equal(normalizeGermanText('BÜRO'), 'büro');
});

test('validateAnswer checks correct answers accurately', () => {
  assert.equal(validateAnswer('t2_verb1', 'wollte'), true);
  assert.equal(validateAnswer('t2_verb1', ' WOLLTE '), true);
  assert.equal(validateAnswer('t2_verb1', 'konnte'), false);
  assert.equal(validateAnswer('t1_art1', 'das'), true);
  assert.equal(validateAnswer('t3_word6', 'Stress'), true);
  assert.equal(validateAnswer('t3_word6', 'Gepäck'), false);
});

test('calculateQuizScore with empty progress returns 0', () => {
  const result = calculateQuizScore(INITIAL_QUIZ_PROGRESS);
  assert.equal(result.totalScore, 0);
  assert.equal(result.solvedCount, 0);
  assert.equal(result.totalQuestions, 23);
});

test('calculateQuizScore with all correct answers reaches max 20 points', () => {
  const fullProgress = {
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
  };

  const result = calculateQuizScore(fullProgress);
  assert.equal(result.task1Score, 9);
  assert.equal(result.task2Score, 5);
  assert.equal(result.task3Score, 6);
  assert.equal(result.totalScore, 20);
  assert.equal(result.solvedCount, 23);
});

test('calculateCareerLevel maps score thresholds properly', () => {
  assert.equal(calculateCareerLevel(0), 0);
  assert.equal(calculateCareerLevel(3.75), 0);
  assert.equal(calculateCareerLevel(4), 1);
  assert.equal(calculateCareerLevel(7.5), 1);
  assert.equal(calculateCareerLevel(8), 2);
  assert.equal(calculateCareerLevel(12), 3);
  assert.equal(calculateCareerLevel(16), 4);
  assert.equal(calculateCareerLevel(19.5), 4);
  assert.equal(calculateCareerLevel(20), 5);
});

test('all career tracks contain 6 well-defined levels', () => {
  for (const key of ['medical', 'finance', 'education'] as const) {
    const track = CAREER_TRACKS[key];
    assert.equal(track.levels.length, 6);
    assert.equal(track.levels[0].levelIndex, 0);
    assert.equal(track.levels[5].levelIndex, 5);
    assert.ok(track.levels[5].title.length > 0);
  }
});

test('getGermanGrade returns expected grades and German scale', () => {
  assert.equal(getGermanGrade(20).gradeNumber, '1');
  assert.equal(getGermanGrade(16).gradeNumber, '2');
  assert.equal(getGermanGrade(13).gradeNumber, '3');
  assert.equal(getGermanGrade(10).gradeNumber, '4');
  assert.equal(getGermanGrade(5).gradeNumber, '5');
});
