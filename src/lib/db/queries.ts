import { db } from "./client";
import { apartments, apartmentImages, calendarEntries } from "./schema";
import { eq, asc } from "drizzle-orm";

export async function getAllApartments() {
  const rows = await db.select().from(apartments);

  const withImages = await Promise.all(
    rows.map(async (apt) => {
      const images = await db
        .select()
        .from(apartmentImages)
        .where(eq(apartmentImages.apartmentId, apt.id))
        .orderBy(asc(apartmentImages.sortOrder));

      return { ...apt, images: images.map((img) => img.url) };
    })
  );

  return withImages;
}

export async function getApartmentBySlug(slug: string) {
  const [apartment] = await db
    .select()
    .from(apartments)
    .where(eq(apartments.slug, slug));

  if (!apartment) return null;

  const images = await db
    .select()
    .from(apartmentImages)
    .where(eq(apartmentImages.apartmentId, apartment.id))
    .orderBy(asc(apartmentImages.sortOrder));

  const calendar = await db
    .select()
    .from(calendarEntries)
    .where(eq(calendarEntries.apartmentId, apartment.id));

  return {
    ...apartment,
    images: images.map((img) => img.url),
    calendar,
  };
}