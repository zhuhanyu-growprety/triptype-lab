import { toMobileWebpSrc } from '../lib/imageMap';

export default function ResponsiveTptiImage({
  src,
  alt,
  className,
  loading,
  decoding = 'async',
  fetchPriority,
}) {
  const mobileSrc = toMobileWebpSrc(src);
  const useMobileSource = mobileSrc && mobileSrc !== src;

  return (
    <picture>
      {useMobileSource && (
        <source media="(max-width: 640px)" srcSet={mobileSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
