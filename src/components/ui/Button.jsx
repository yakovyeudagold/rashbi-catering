const variants = {
  primary:
    "bg-gold text-bg-primary hover:bg-gold-light",
  secondary:
    "border border-border bg-transparent text-text-primary hover:border-gold",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm transition-colors duration-[var(--duration-base)] ease-standard ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
