export default function OptionCard({ optionKey, text, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`option-card${selected ? ' option-card--selected' : ''}`}
      onClick={() => onSelect(optionKey)}
    >
      <span className="option-card-key">{optionKey}</span>
      <span className="option-card-text">{text}</span>
    </button>
  );
}
