export function cleanTypeCode(typeCode) {
  if (typeCode == null || typeCode === '') return '';
  return String(typeCode).replace(/^["']|["']$/g, '');
}

export function buildShareUrl(typeCode) {
  const clean = cleanTypeCode(typeCode);
  const shareUrl = `${window.location.origin}${window.location.pathname}#/result?type=${encodeURIComponent(clean)}&shared=1`;
  return shareUrl;
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

export async function shareResult(result, typeCode) {
  const payload = buildSharePayload(result, typeCode);

  if (navigator.share) {
    try {
      await navigator.share({
        title: payload.title,
        text: payload.fullText,
        url: payload.url,
      });
      return { ok: true, method: 'share' };
    } catch (error) {
      if (error?.name === 'AbortError') {
        return { ok: false, method: 'share', cancelled: true };
      }
    }
  }

  try {
    await navigator.clipboard.writeText(payload.fullText);
    return { ok: true, method: 'clipboard' };
  } catch {
    return { ok: false, method: 'clipboard' };
  }
}
