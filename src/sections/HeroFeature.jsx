export default function HeroFeature({ icon: Icon, title, text }) {
  return (
    <li className="hero-feature">
      <Icon aria-hidden="true" />
      <span>{title}</span>
      <span>{text}</span>
    </li>
  );
}
