import { getResultImageSources } from '../lib/imageMap';

export default function ResultCard({ result, typeCode }) {
  const resultImageSources = getResultImageSources(typeCode);

  return (
    <article className="result-card">
      {resultImageSources.desktopSrc && (
        <div className="result-card-image-wrap">
          <img
            src={resultImageSources.desktopSrc}
            srcSet={resultImageSources.srcSet}
            sizes={resultImageSources.sizes}
            alt={`${result.nameCn} 结果插画`}
            className="result-card-image"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      )}

      <div className="result-card-body">
        <p className="result-card-code">{typeCode}</p>
        <h1 className="result-card-title">{result.nameCn}</h1>
        <p className="result-card-name-en">{result.nameEn}</p>
        <p className="result-card-tagline">{result.tagline}</p>

        <section className="result-section">
          <h2 className="result-section-title">人格描述</h2>
          <p className="result-section-text">{result.description}</p>
        </section>

        <section className="result-section">
          <h2 className="result-section-title">旅行风格</h2>
          <p className="result-section-text">{result.travelStyle}</p>
        </section>

        <section className="result-section">
          <h2 className="result-section-title">适合场景</h2>
          <p className="result-section-text">{result.bestFor}</p>
        </section>

        <section className="result-section">
          <h2 className="result-section-title">小提醒</h2>
          <p className="result-section-text">{result.watchOut}</p>
        </section>
      </div>
    </article>
  );
}
