import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({
  index,
  title,
  lines,
  href,
  image,
  alt,
  imagePosition,
  featured = false,
}) {
  return (
    <Link
      to={href}
      className={`service-card${featured ? " service-card--featured" : ""}`}
      dir="ltr"
      data-image-reveal
    >
      <img
        src={image}
        alt={alt}
        style={{ objectPosition: imagePosition }}
      />
      <div className="service-card__shade" aria-hidden="true" />
      <div className="service-card__dim" aria-hidden="true" />
      <div className="service-card__body">
        <span className="service-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 dir="rtl">{title}</h3>
        <p dir="rtl">
          {lines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <span className="service-card__link">
          <ChevronLeft aria-hidden="true" strokeWidth={1.5} />
          <span dir="rtl">לפרטים נוספים</span>
        </span>
      </div>
    </Link>
  );
}
