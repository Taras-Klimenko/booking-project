export type Apartment = {
    id: number;
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    address: string;
    metro: string;
    latitude: number | null;
    longitude: number | null;
    pricePerNight: number;
    amenities: string[];
    images: string[];
};