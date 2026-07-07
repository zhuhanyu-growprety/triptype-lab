const BASE = import.meta.env.BASE_URL;

function tptiAsset(filename) {
  return `${BASE}assets/tpti/${filename}`;
}

function tptiResultAsset(filename) {
  return `${BASE}assets/tpti/results/${filename}`;
}

const QUESTION_IMAGES = {
  q01: tptiAsset('tpti-q01-pretrip-planning-4x5.webp'),
  q02: tptiAsset('tpti-q02-arrival-first-day-4x5.webp'),
  q03: tptiAsset('tpti-q03-change-route-4x5.webp'),
  q04: tptiAsset('tpti-q04-long-queue-4x5.webp'),
  q05: tptiAsset('tpti-q05-budget-choice-4x5.webp'),
  q06: tptiAsset('tpti-q06-travel-night-4x5.webp'),
  q07: tptiAsset('tpti-q07-rainy-change-4x5.webp'),
  q08: tptiAsset('tpti-q08-stay-choice-4x5.webp'),
  q09: tptiAsset('tpti-q09-first-meal-4x5.webp'),
  q10: tptiAsset('tpti-q10-travel-memory-4x5.webp'),
  q11: tptiAsset('tpti-q11-half-day-free-time-4x5.webp'),
  q12: tptiAsset('tpti-q12-continue-or-rest-4x5.webp'),
};

const RESULT_IMAGES = {
  PFLG: tptiResultAsset('tpti-result-PFLG-4x5.webp'),
  PFLO: tptiResultAsset('tpti-result-PFLO-4x5.webp'),
  PFCG: tptiResultAsset('tpti-result-PFCG-4x5.webp'),
  PFCO: tptiResultAsset('tpti-result-PFCO-4x5.webp'),
  PSLG: tptiResultAsset('tpti-result-PSLG-4x5.webp'),
  PSLO: tptiResultAsset('tpti-result-PSLO-4x5.webp'),
  PSCG: tptiResultAsset('tpti-result-PSCG-4x5.webp'),
  PSCO: tptiResultAsset('tpti-result-PSCO-4x5.webp'),
  EFLG: tptiResultAsset('tpti-result-EFLG-4x5.webp'),
  EFLO: tptiResultAsset('tpti-result-EFLO-4x5.webp'),
  EFCG: tptiResultAsset('tpti-result-EFCG-4x5.webp'),
  EFCO: tptiResultAsset('tpti-result-EFCO-4x5.webp'),
  ESLG: tptiResultAsset('tpti-result-ESLG-4x5.webp'),
  ESLO: tptiResultAsset('tpti-result-ESLO-4x5.webp'),
  ESCG: tptiResultAsset('tpti-result-ESCG-4x5.webp'),
  ESCO: tptiResultAsset('tpti-result-ESCO-4x5.webp'),
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

export const HERO_IMAGE = tptiAsset('tpti-hero-start-9x16.webp');

export function toMobileWebpSrc(desktopSrc) {
  if (!desktopSrc || !desktopSrc.endsWith('.webp')) return desktopSrc;
  return desktopSrc.replace(/\.webp$/, '.mobile.webp');
}
