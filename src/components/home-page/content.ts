import { STUDIO_CITY } from "@/lib/site/address";

export const learningFormats = [
  {
    title: "Групово обучение",
    text: `Работа в малка група с демонстрации, обсъждане и практика в студиото на DR & D в ${STUDIO_CITY}.`,
  },
  {
    title: "Индивидуален формат",
    text: "Фокус върху твоето темпо, техника и конкретните умения, които искаш да развиеш като фризьор.",
  },
] as const;

export const learningLevels = [
  {
    id: "beginners",
    title: "За начинаещи фризьори",
    text: "Ясна основа, подредена терминология и спокойна първа среща с професионалните процеси в салон.",
    eyebrow: "Старт",
  },
  {
    id: "advanced",
    title: "За напреднали фризьори",
    text: "Надграждане на техника, диагностика, планиране и увереност при реални казуси в студио.",
    eyebrow: "Надграждане",
  },
] as const;

export const learningHighlights = [
  {
    title: "Теория",
    text: "Структура, логика и професионален език, за да разбираш защо всяка стъпка е важна.",
  },
  {
    title: "Практика",
    text: "Упражнения върху процес, контрол на детайла и работа с обратна връзка от инструктора.",
  },
  {
    title: "Удостоверение",
    text: "След завършване получаваш удостоверение за преминато обучение и усвоени умения.",
  },
] as const;

export const galleryStudioImages = [
  { src: "/studio-3.jpg", alt: `Студио DR & D, ${STUDIO_CITY}` },
  { src: "/studio-1.jpg", alt: `Студио DR & D, ${STUDIO_CITY}` },
  { src: "/studio-2.jpg", alt: `Студио DR & D, ${STUDIO_CITY}` },
] as const;

export const galleryProcess = {
  title: "Процес",
} as const;

export const galleryProcessImages = [
  { src: "/education-1.jpg", alt: `Обучение в DR & D, ${STUDIO_CITY}` },
  { src: "/education-2.jpg", alt: `Обучение в DR & D, ${STUDIO_CITY}` },
  { src: "/education-3.jpg", alt: `Обучение в DR & D, ${STUDIO_CITY}` },
  { src: "/education-4.jpg", alt: `Обучение в DR & D, ${STUDIO_CITY}` },
] as const;

export const galleryHair = {
  title: "Коси",
} as const;

export const galleryHairImages = [
  { src: "/hair-3.jpg", alt: `Прически от DR & D, ${STUDIO_CITY}` },
  { src: "/hair-4.jpg", alt: `Прически от DR & D, ${STUDIO_CITY}` },
  { src: "/hair-7.jpg", alt: `Прически от DR & D, ${STUDIO_CITY}` },
  { src: "/hair-8.jpg", alt: `Прически от DR & D, ${STUDIO_CITY}` },
] as const;

export const galleryBeforeAfter = [
  {
    label: "Начална точка",
    badge: "Преди",
    src: "/before-1.jpg",
    alt: "Трансформация — преди",
  },
  {
    label: "Резултат",
    badge: "След",
    src: "/after-1.png",
    alt: "Трансформация — след",
  },
] as const;

export const galleryVideoEmbeds = [
  {
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100063462193608%2Fvideos%2F590058624790439%2F&show_text=false&width=476&t=0",
    title: "Видео от DR & D",
    width: 476,
    height: 476,
  },
  {
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100063462193608%2Fvideos%2F2500538883349837%2F&show_text=false&width=357&t=0",
    title: "Видео от DR & D",
    width: 357,
    height: 476,
  },
] as const;

export const instructor = {
  name: "Диляна Дачева",
  role: "Главен инструктор",
  image: "/profile-image.png",
  imageWidth: 1023,
  imageHeight: 1537,
  bio: "С 27 години опит в професията. Кариерата ѝ започва през 1997 година. Завършва професионално училище по фризьорство и козметика в Бургас и същата година отваря първия си салон. Работи и се обучава в Атина и Милано, след което преминава обучение в академия L'Oréal. След това продължава с обучения по колористика, подстригване и стайлинг на прически. Участва в международни конкурси и шоу програми. Пет години е обучаващ тренер за Elgon. Изкарала е първа и втора степен мастърклас по подстригване и колористика.",
  quote:
    "Мисията ми е да преобразявам и да създавам красота и най-добрата награда за мен е усмивката и благодарността на клиента.",
} as const;

export const testimonials = [
  {
    quote:
      "Най-полезно беше, че всяка стъпка се обясняваше спокойно и после я пробвахме веднага.",
    name: "Мария П.",
    detail: "начинаещ фризьор",
  },
  {
    quote:
      "Получих подредена система за работа, не просто отделни трикове. Това ми даде увереност.",
    name: "Виктория Д.",
    detail: "работещ стилист",
  },
  {
    quote:
      "Индивидуалната обратна връзка беше точна и практична. Видях къде губя контрол в процеса.",
    name: "Симона К.",
    detail: "курсист в индивидуален формат",
  },
  {
    quote:
      "Хареса ми балансът между теория и практика. Денят беше интензивен, но много ясен.",
    name: "Никол Н.",
    detail: "напреднало ниво",
  },
] as const;

export const homeModulesIntro =
  "Избери модул според темата, нивото и датата на старт. Всяка програма включва теория, демонстрация и практика в студио.";

export const homeContactIntro =
  `Ако не си сигурен откъде да започнеш, свържи се с нас. Ще ти помогнем да избереш подходящ курс за фризьори в ${STUDIO_CITY} — формат, ниво и следваща дата.`;
