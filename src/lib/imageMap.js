const BASE = import.meta.env.BASE_URL;

function tptiAsset(filename) {
  return `${BASE}assets/tpti/${filename}`;
}

function tptiResultAsset(filename) {
  return `${BASE}assets/tpti/results/${filename}`;
}

const QUESTION_IMAGES = {
  q01: tptiAsset('tpti-q01-pretrip-planning-4x5.png'),
  q02: tptiAsset('tpti-q02-arrival-first-day-4x5.png'),
  q03: tptiAsset('tpti-q03-change-route-4x5.png'),
  q04: tptiAsset('tpti-q04-long-queue-4x5.png'),
  q05: tptiAsset('tpti-q05-budget-choice-4x5.png'),
  q06: tptiAsset('tpti-q06-travel-night-4x5.png'),
  q07: tptiAsset('tpti-q07-rainy-change-4x5.png'),
  q08: tptiAsset('tpti-q08-stay-choice-4x5.png'),
  q09: tptiAsset('tpti-q09-first-meal-4x5.png'),
  q10: tptiAsset('tpti-q10-travel-memory-4x5.png'),
  q11: tptiAsset('tpti-q11-half-day-free-time-4x5.png'),
  q12: tptiAsset('tpti-q12-continue-or-rest-4x5.png'),
};

const RESULT_IMAGES = {
  PFLG: tptiResultAsset('tpti-result-PFLG-4x5.png'),
  PFLO: tptiResultAsset('tpti-result-PFLO-4x5.png'),
  PFCG: tptiResultAsset('tpti-result-PFCG-4x5.png'),
  PFCO: tptiResultAsset('tpti-result-PFCO-4x5.png'),
  PSLG: tptiResultAsset('tpti-result-PSLG-4x5.png'),
  PSLO: tptiResultAsset('tpti-result-PSLO-4x5.png'),
  PSCG: tptiResultAsset('tpti-result-PSCG-4x5.png'),
  PSCO: tptiResultAsset('tpti-result-PSCO-4x5.png'),
  EFLG: tptiResultAsset('tpti-result-EFLG-4x5.png'),
  EFLO: tptiResultAsset('tpti-result-EFLO-4x5.png'),
  EFCG: tptiResultAsset('tpti-result-EFCG-4x5.png'),
  EFCO: tptiResultAsset('tpti-result-EFCO-4x5.png'),
  ESLG: tptiResultAsset('tpti-result-ESLG-4x5.png'),
  ESLO: tptiResultAsset('tpti-result-ESLO-4x5.png'),
  ESCG: tptiResultAsset('tpti-result-ESCG-4x5.png'),
  ESCO: tptiResultAsset('tpti-result-ESCO-4x5.png'),
};

const RESULT_FAMILY_IMAGES = {
  'planning-control': tptiAsset('tpti-result-family-planning-control-4x5.png'),
  'spontaneous-explore': tptiAsset('tpti-result-family-spontaneous-explore-4x5.png'),
  'social-vibe': tptiAsset('tpti-result-family-social-vibe-4x5.png'),
  'quiet-healing': tptiAsset('tpti-result-family-quiet-healing-4x5.png'),
};

const TYPE_CODE_TO_FAMILY = {
  PFLG: 'planning-control',
  PFLO: 'planning-control',
  PFCG: 'planning-control',
  PFCO: 'planning-control',
  EFLG: 'spontaneous-explore',
  EFLO: 'spontaneous-explore',
  EFCG: 'spontaneous-explore',
  EFCO: 'spontaneous-explore',
  PSLG: 'social-vibe',
  PSCG: 'social-vibe',
  ESLG: 'social-vibe',
  ESCG: 'social-vibe',
  PSLO: 'quiet-healing',
  PSCO: 'quiet-healing',
  ESLO: 'quiet-healing',
  ESCO: 'quiet-healing',
};

export function getQuestionImage(questionId) {
  const id = String(questionId ?? '').trim().toLowerCase();
  return QUESTION_IMAGES[id] ?? QUESTION_IMAGES.q01 ?? '';
}

export function getResultFamilyImage(typeCode) {
  const family = TYPE_CODE_TO_FAMILY[typeCode];
  return family ? RESULT_FAMILY_IMAGES[family] : '';
}

export function getResultImage(typeCode) {
  return RESULT_IMAGES[typeCode] ?? getResultFamilyImage(typeCode);
}

export const HERO_IMAGE = tptiAsset('tpti-hero-start-9x16.png');
