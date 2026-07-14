export type Apartment = {
    id: string;
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    address: string;
    metro: string;
    pricePerNight: number;
    images: string[];
    amenities: string[];
    bookedDates: string[]; // формат "YYYY-MM-DD"
};


export const apartments: Apartment[] = [
    {
        id: "1",
        slug: "apartment-1",
        title: "Уютная студия у метро Сокол",
        description: "Светлая студия с современным ремонтом.",
        fullDescription:
            "Светлая студия с современным ремонтом в 5 минутах от метро Сокол. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
        address: "ул. Примерная, 1",
        metro: "Сокол",
        pricePerNight: 3500,
        images: [
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
        ],
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
        pricePerNight: 4000,
        images: [
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
        ],
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
        pricePerNight: 3800,
        images: [
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
        ],
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
        pricePerNight: 5000,
        images: [
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
            "/placeholder-apartment.webp",
        ],
        amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
        bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
    },
];

export function getApartmentBySlug(slug: string) {
    return apartments.find((apt) => apt.slug === slug);
}