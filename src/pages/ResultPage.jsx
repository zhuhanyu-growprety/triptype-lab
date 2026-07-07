import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { tptiContent, findResult, isValidTypeCode } from '../lib/scoring';
import { getLastResult } from '../lib/storage';
import { cleanTypeCode, shareResult } from '../lib/share';
import ResultCard from '../components/ResultCard';

function resolveDisplayedResult(searchParams) {
  const rawType = searchParams.get('type');
  const cleanType = cleanTypeCode(rawType)?.toUpperCase() ?? '';
  const isShared = searchParams.get('shared') === '1';

  if (cleanType && isValidTypeCode(cleanType)) {
    return {
      typeCode: cleanType,
      result: findResult(cleanType),
      isShared,
    };
  }

  const lastResult = getLastResult();
  if (lastResult?.result) {
    const storedType = cleanTypeCode(lastResult.typeCode)?.toUpperCase() ?? '';
    if (storedType && isValidTypeCode(storedType)) {
      return {
        typeCode: storedType,
        result: findResult(storedType) ?? lastResult.result,
        isShared: false,
      };
    }
  }

  return null;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [shareStatus, setShareStatus] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  const displayed = resolveDisplayedResult(searchParams);
  const { result: pageCopy } = tptiContent.pageCopy;

  function showToast(message) {
    setShareStatus(message);
    setTimeout(() => setShareStatus(''), 2000);
  }

  if (!displayed?.result) {
    return (
      <div className="page result-page result-page--empty">
        <div className="empty-state">
          <p className="empty-state-title">还没有测试结果</p>
          <p className="empty-state-text">
            完成 12 道旅行场景题，即可生成你的专属旅行人格。
          </p>
          <Link to="/quiz" className="btn btn-primary">
            {tptiContent.pageCopy.home.startButton}
          </Link>
        </div>
      </div>
    );
  }

  const { typeCode, result, isShared } = displayed;
  const retestLabel = isShared ? '我也测测' : pageCopy.retestButton;

  async function handleShare() {
    if (isSharing) return;

    setIsSharing(true);
    try {
      const outcome = await shareResult(result, typeCode);

      if (outcome.cancelled) return;

      if (outcome.ok) {
        showToast('已复制分享内容');
        return;
      }

      showToast('分享失败，请稍后重试');
    } catch {
      showToast('分享失败，请稍后重试');
    } finally {
      setIsSharing(false);
    }
  }

  function handleRetest() {
    navigate('/quiz');
  }

  return (
    <div className="page result-page">
      {isShared && (
        <p className="shared-hint">你正在查看一份分享结果</p>
      )}

      <ResultCard result={result} typeCode={typeCode} />

      <div className="result-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShare}
          disabled={isSharing}
        >
          {shareStatus || '分享结果'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleRetest}>
          {retestLabel}
        </button>
        <Link to="/" className="btn btn-ghost">
          {pageCopy.homeButton}
        </Link>
      </div>
    </div>
  );
}
