export function cleanTypeCode(typeCode) {
  if (typeCode == null || typeCode === '') return '';
  return String(typeCode).replace(/^["']|["']$/g, '');
}

export function buildShareUrl(typeCode) {
  const clean = cleanTypeCode(typeCode);
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${window.location.origin}${normalizedBase}#/result?type=${encodeURIComponent(clean)}&shared=1`;
}

export function buildShareMessage(result) {
  return result.shareText;
}

export function buildSharePayload(result, typeCode) {
  const shareUrl = buildShareUrl(typeCode);
  const shareMessage = buildShareMessage(result);
  const fullShareText = `${shareMessage}\n${shareUrl}`;

  return {
    title: 'TPTI 旅行人格测试',
    shareMessage,
    url: shareUrl,
    fullText: fullShareText,
  };
}

function copyWithExecCommand(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }

  document.body.removeChild(textarea);
  return copied;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to execCommand
    }
  }

  return copyWithExecCommand(text);
}

export function canSystemShare() {
  return typeof navigator.share === 'function';
}

export async function copyShareContent(result, typeCode) {
  const payload = buildSharePayload(result, typeCode);
  const copied = await copyText(payload.fullText);
  return { ok: copied };
}

export async function systemShare(result, typeCode) {
  if (!canSystemShare()) {
    return { ok: false };
  }

  const payload = buildSharePayload(result, typeCode);

  try {
    await navigator.share({
      title: payload.title,
      text: payload.shareMessage,
      url: payload.url,
    });
    return { ok: true };
  } catch (error) {
    if (error?.name === 'AbortError') {
      return { ok: false, cancelled: true };
    }
    return { ok: false };
  }
}
