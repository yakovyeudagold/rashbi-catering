export default function Container({
  as: Tag = "div",
  className = "",
  children,
}) {
  return (
    <Tag className={`mx-auto w-full max-w-content px-page-x ${className}`}>
      {children}
    </Tag>
  );
}
