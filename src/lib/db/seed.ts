import { db } from "./client";
import { apartments, apartmentImages, calendarEntries } from "./schema";

type MockApartment = {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  address: string;
  metro: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  bookedDates: string[];
};

const mockApartments: MockApartment[] = [
  {
    id: "1",
    slug: "apartment-1",
    title: "Уютная студия у метро Сокол",
    description: "Светлая студия с современным ремонтом.",
    fullDescription:
      "Светлая студия с современным ремонтом в 5 минутах от метро Сокол. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
    address: "ул. Примерная, 1",
    metro: "Сокол",
    latitude: 55.8048,
    longitude: 37.5153,
    pricePerNight: 3500,
    images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp", "/placeholder-apartment.webp"],
    amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
    bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
  },
  {
    id: "2",
    slug: "apartment-2",
    title: "Квартира рядом с Войковской",
    description: "Просторная однокомнатная квартира, тихий двор, рядом парк.",
    fullDescription:
      "Просторная однокомнатная квартира, тихий двор, рядом парк. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
    address: "ул. Примерная, 2",
    metro: "Войковская",
    latitude: 55.819,
    longitude: 37.4978,
    pricePerNight: 4000,
    images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp", "/placeholder-apartment.webp"],
    amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
    bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
  },
  {
    id: "3",
    slug: "apartment-3",
    title: "Апартаменты у МЦД Стрешнево",
    description: "Современный интерьер, вид на парк, всё необходимое для командировки.",
    fullDescription:
      "Современный интерьер, вид на парк, всё необходимое для командировки. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
    address: "ул. Примерная, 3",
    metro: "МЦД Стрешнево",
    latitude: 55.8134,
    longitude: 37.4867,
    pricePerNight: 3800,
    images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp"],
    amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
    bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
  },
  {
    id: "4",
    slug: "apartment-4",
    title: "Двухкомнатная квартира у Сокола",
    description: "Подойдёт для командировочных вдвоём или небольшой семьи.",
    fullDescription:
      "Подойдёт для командировочных вдвоём или небольшой семьи. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
    address: "ул. Примерная, 4",
    metro: "Сокол",
    latitude: 55.8055,
    longitude: 37.5168,
    pricePerNight: 5000,
    images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp", "/placeholder-apartment.webp"],
    amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
    bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
  },
];

// Сколько дней вперёд заполнить в календаре
const DAYS_AHEAD = 180;

function formatDate(d: Date) {
  return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

async function seed() {
  console.log("Очищаю существующие данные...");
  await db.delete(calendarEntries);
  await db.delete(apartmentImages);
  await db.delete(apartments);

  for (const apt of mockApartments) {
    console.log(`Добавляю квартиру: ${apt.title}`);

    const [inserted] = await db
      .insert(apartments)
      .values({
        slug: apt.slug,
        title: apt.title,
        description: apt.description,
        fullDescription: apt.fullDescription,
        address: apt.address,
        metro: apt.metro,
        latitude: apt.latitude,
        longitude: apt.longitude,
        pricePerNight: apt.pricePerNight,
        amenities: apt.amenities,
      })
      .returning({ id: apartments.id });

    const apartmentId = inserted.id;

    // Фото
    await db.insert(apartmentImages).values(
      apt.images.map((url, index) => ({
        apartmentId,
        url,
        sortOrder: index,
      }))
    );

    // Календарь на DAYS_AHEAD дней вперёд от сегодня
    const bookedSet = new Set(apt.bookedDates);
    const today = new Date();
    const entries = [];

    for (let i = 0; i < DAYS_AHEAD; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = formatDate(date);

      entries.push({
        apartmentId,
        date: dateStr,
        isAvailable: !bookedSet.has(dateStr),
        price: null, // используется pricePerNight по умолчанию
      });
    }

    await db.insert(calendarEntries).values(entries);
  }

  console.log("Готово! Все квартиры и календарь добавлены.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Ошибка при сидировании:", err);
    process.exit(1);
  });