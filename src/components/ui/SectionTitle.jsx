export default function SectionTitle({
  as: Tag = "h2",
  className = "",
  children,
}) {
  return <Tag className={`text-text-primary ${className}`}>{children}</Tag>;
}
