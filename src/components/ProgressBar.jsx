export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="progress-bar-wrap">
      <div className="progress-bar-meta">
        <span className="progress-bar-label">
          第 {current} / {total} 题
        </span>
        <span className="progress-bar-percent">{percent}%</span>
      </div>
      <div className="progress-bar-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
