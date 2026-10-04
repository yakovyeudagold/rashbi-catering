export default function IconButton({
  icon: Icon,
  label,
  href,
  type = "button",
  className = "",
  ...props
}) {
  const content = Icon ? (
    <Icon aria-hidden="true" strokeWidth={1.5} />
  ) : null;

  if (href) {
    return (
      <a href={href} aria-label={label} className={className} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} aria-label={label} className={className} {...props}>
      {content}
    </button>
  );
}
