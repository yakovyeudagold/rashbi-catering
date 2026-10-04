export default function SplitWords({ text, className }) {
  const words = text.split(" ");

  return (
    <span className={className} data-split>
      <span className="visually-hidden">{text}</span>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="split-word">
            <span className="split-word__inner">{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
