const KEYS = {
  answers: 'tpti:lastAnswers',
  scores: 'tpti:lastScores',
  typeCode: 'tpti:lastTypeCode',
  result: 'tpti:lastResult',
};

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveLastResult({ answers, scores, typeCode, result }) {
  writeJson(KEYS.answers, answers);
  writeJson(KEYS.scores, scores);
  writeJson(KEYS.typeCode, typeCode);
  writeJson(KEYS.result, result);
}

export function getLastResult() {
  const typeCode = localStorage.getItem(KEYS.typeCode);
  const result = readJson(KEYS.result);
  const answers = readJson(KEYS.answers);
  const scores = readJson(KEYS.scores);

  if (!typeCode || !result) {
    return null;
  }

  return { answers, scores, typeCode, result };
}

export function hasLastResult() {
  return Boolean(localStorage.getItem(KEYS.typeCode) && localStorage.getItem(KEYS.result));
}

export function clearLastResult() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
