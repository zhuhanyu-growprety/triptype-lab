import { useState } from 'react';
import {
  buildSharePayload,
  canSystemShare,
  copyShareContent,
  systemShare,
} from '../lib/share';

export default function SharePanel({ result, typeCode, onClose }) {
  const [feedback, setFeedback] = useState('');
  const payload = buildSharePayload(result, typeCode);
  const systemShareAvailable = canSystemShare();

  function showMessage(message) {
    setFeedback(message);
    setTimeout(() => setFeedback(''), 2000);
  }

  async function handleCopy() {
    const outcome = await copyShareContent(result, typeCode);
    if (outcome.ok) {
      showMessage('已复制分享内容');
      return;
    }
    showMessage('复制失败，请长按链接手动复制');
  }

  async function handleSystemShare() {
    const outcome = await systemShare(result, typeCode);
    if (outcome.cancelled) return;
    if (outcome.ok) {
      showMessage('已复制分享内容');
      return;
    }
    showMessage('系统分享失败，可复制链接发送');
  }

  return (
    <div className="share-overlay" onClick={onClose} role="presentation">
      <div
        className="share-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-panel-title"
      >
        <h2 id="share-panel-title" className="share-panel-title">
          分享你的旅行人格
        </h2>
        <p className="share-panel-hint">复制文案和链接，或调用系统分享发送给好友。</p>

        <label className="share-panel-label" htmlFor="share-link-field">
          分享链接
        </label>
        <textarea
          id="share-link-field"
          className="share-panel-link"
          readOnly
          value={payload.url}
          rows={3}
          onFocus={(event) => event.target.select()}
        />

        {feedback && <p className="share-panel-feedback">{feedback}</p>}

        <div className="share-panel-actions">
          <button type="button" className="btn btn-primary" onClick={handleCopy}>
            复制分享内容
          </button>
          {systemShareAvailable && (
            <button type="button" className="btn btn-secondary" onClick={handleSystemShare}>
              系统分享
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
