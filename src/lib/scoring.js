import tptiContent from '../data/tptiContent.json';

const DIMENSIONS = [
  { pair: ['P', 'E'], default: 'P' },
  { pair: ['F', 'S'], default: 'S' },
  { pair: ['L', 'C'], default: 'C' },
  { pair: ['G', 'O'], default: 'O' },
];

const QUESTION_IDS = tptiContent.questions.map((q) => q.id);

function createEmptyScores() {
  return { P: 0, E: 0, F: 0, S: 0, L: 0, C: 0, G: 0, O: 0 };
}

function getOptionScores(questionId, optionKey) {
  const question = tptiContent.questions.find((q) => q.id === questionId);
  if (!question) return null;

  const option = question.options.find((o) => o.key === optionKey);
  return option?.scores ?? null;
}

function resolveTie(pair, answers) {
  const [a, b] = pair;

  for (let i = QUESTION_IDS.length - 1; i >= 0; i -= 1) {
    const questionId = QUESTION_IDS[i];
    const optionKey = answers[questionId];
    if (!optionKey) continue;

    const scores = getOptionScores(questionId, optionKey);
    if (!scores) continue;

    if (scores[a]) return a;
    if (scores[b]) return b;
  }

  return null;
}

function resolveDimension(scores, pair, defaultCode, answers) {
  const [a, b] = pair;

  if (scores[a] > scores[b]) return a;
  if (scores[b] > scores[a]) return b;

  const tieBreak = resolveTie(pair, answers);
  if (tieBreak) return tieBreak;

  return defaultCode;
}

export function calculateScores(answers) {
  const scores = createEmptyScores();

  QUESTION_IDS.forEach((questionId) => {
    const optionKey = answers[questionId];
    if (!optionKey) return;

    const optionScores = getOptionScores(questionId, optionKey);
    if (!optionScores) return;

    Object.entries(optionScores).forEach(([key, value]) => {
      scores[key] += value;
    });
  });

  return scores;
}

export function calculateTypeCode(answers) {
  const scores = calculateScores(answers);

  const typeCode = DIMENSIONS.map(({ pair, default: defaultCode }) =>
    resolveDimension(scores, pair, defaultCode, answers),
  ).join('');

  return { typeCode, scores };
}

const VALID_TYPE_CODES = new Set(tptiContent.results.map((r) => r.typeCode));

export function isValidTypeCode(typeCode) {
  return VALID_TYPE_CODES.has(typeCode);
}

export function findResult(typeCode) {
  return tptiContent.results.find((r) => r.typeCode === typeCode) ?? null;
}

export function computeResult(answers) {
  const { typeCode, scores } = calculateTypeCode(answers);
  const result = findResult(typeCode);

  return { typeCode, scores, result };
}

export { tptiContent };
