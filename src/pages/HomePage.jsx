import { Link } from 'react-router-dom';
import { tptiContent } from '../lib/scoring';
import { HERO_IMAGE_SOURCES } from '../lib/imageMap';
import { hasLastResult } from '../lib/storage';
import { USER_DISCLAIMER } from '../lib/disclaimer';

export default function HomePage() {
  const { home } = tptiContent.pageCopy;
  const showLastResult = hasLastResult();

  return (
    <div className="page home-page">
      <header className="home-header">
        <h1 className="home-title">{home.title}</h1>
        <p className="home-subtitle">{home.subtitle}</p>
      </header>

      <div className="hero-card">
        <img
          src={HERO_IMAGE_SOURCES.desktopSrc}
          srcSet={HERO_IMAGE_SOURCES.srcSet}
          sizes={HERO_IMAGE_SOURCES.sizes}
          alt="旅行出发场景"
          className="hero-image"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <p className="home-intro">{home.intro}</p>

      <div className="home-actions">
        <Link to="/quiz" className="btn btn-primary">
          {home.startButton}
        </Link>
        {showLastResult && (
          <Link to="/result" className="btn btn-secondary">
            查看上次结果
          </Link>
        )}
      </div>

      <footer className="disclaimer">
        <p>{USER_DISCLAIMER}</p>
      </footer>
    </div>
  );
}
