import eventsImage from "../assets/images/events.jpg";
import shabbatImage from "../assets/images/shabbat.jpg";
import deliveryImage from "../assets/images/delivery.jpg";

export const serviceSteps = [
  "מספרים לנו מה צריך",
  "מתאימים תפריט וכמות",
  "סוגרים את פרטי האירוח",
];

export const services = [
  {
    path: "/events",
    title: "אירועים",
    intro:
      "אירוח מוקפד לאירועים משפחתיים ועסקיים, עם תפריט שמותאם לאופי האירוע, לכמות האורחים ולסגנון האירוח.",
    points: [
      "אירועים משפחתיים",
      "אירועים עסקיים",
      "התאמת תפריט",
      "התאמה לכמות אורחים",
      "פתרונות הגשה ואירוח",
    ],
    image: eventsImage,
    imagePosition: "70% 78%",
    alt: "שולחן אירוע ערוך עם מנת בשר וכוסות יין",
  },
  {
    path: "/shabbat-vacations",
    title: "שבתות ונופשים",
    intro:
      "פתרונות אירוח מלאים לשבתות, קבוצות ונופשים בצפון, עם אוכל מוכן ושירות שמאפשר להגיע לשבת מסודרים ורגועים.",
    points: [
      "שבתות משפחתיות",
      "קבוצות",
      "נופשים",
      "אירוח בצפון",
      "התאמת כמויות ותפריט",
    ],
    image: shabbatImage,
    imagePosition: "68% 52%",
    alt: "שולחן שבת עם חלות, גביע קידוש ונרות",
  },
  {
    path: "/delivery-north",
    title: "משלוחים ואירוח בצפון",
    intro:
      "אוכל מוכן ואירוח מוקפד שמגיע אליכם באזור הצפון, עם התאמה לכמות האנשים ולסוג האירוח.",
    points: [
      "משלוחים באזור הצפון",
      "אוכל מוכן",
      "אירוח משפחתי וקבוצתי",
      "התאמת כמויות",
      "תיאום מראש",
    ],
    image: deliveryImage,
    imagePosition: "78% 62%",
    alt: "מגשי אירוח ואריזות ממותגות",
  },
];
