export type Apartment = {
    id: number;
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    address: string;
    metro: string;
    pricePerNight: number;
    amenities: string[];
    images: string[];
};