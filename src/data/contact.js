export const contact = {
  owner: "לירן",
  phoneDisplay: "054-6537113",
  phoneHref: "tel:+972546537113",
  whatsappNumber: "972546537113",
  area: "צפת וכל אזור הצפון",
  kashrut: "כשר למהדרין",
};

export function whatsappLink(text) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const whatsappDefault = whatsappLink(
  "שלום לירן, הגעתי מהאתר ואשמח לקבל פרטים על אירוח.",
);
