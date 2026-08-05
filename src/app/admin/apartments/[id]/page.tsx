import { db } from "@/lib/db/client";
import { apartments, calendarEntries, apartmentImages } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import CalendarEditor from "@/components/admin/CalendarEditor";
import ImageManager from "@/components/admin/ImageManager";
import ApartmentForm from "@/components/admin/ApartmentForm";
import { updateApartment } from "@/lib/actions/apartments";
import Link from "next/link";

export default async function AdminApartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apartmentId = Number(id);

  const [apartment] = await db
    .select()
    .from(apartments)
    .where(eq(apartments.id, apartmentId));

  if (!apartment) notFound();

  const entries = await db
    .select()
    .from(calendarEntries)
    .where(eq(calendarEntries.apartmentId, apartmentId));

  const images = await db
    .select()
    .from(apartmentImages)
    .where(eq(apartmentImages.apartmentId, apartmentId))
    .orderBy(asc(apartmentImages.sortOrder));

  const updateApartmentWithId = updateApartment.bind(null, apartmentId);

  return (
    <main className="min-h-screen bg-sage-50 px-6 pt-28 pb-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="text-sm text-sage-600 hover:text-sage-900 "
        >
          ← Ко всем квартирам
        </Link>

        <h1 className="mt-2 font-serif text-3xl text-sage-900">
          {apartment.title}
        </h1>
        <p className="text-sage-600">м. {apartment.metro}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 font-serif text-xl text-sage-900">
                Информация о квартире
              </h2>
              <div className="rounded-2xl border border-sage-200 bg-white p-6">
                <ApartmentForm
                  initialValues={{
                    title: apartment.title,
                    description: apartment.description,
                    fullDescription: apartment.fullDescription,
                    address: apartment.address,
                    metro: apartment.metro,
                    latitude: apartment.latitude,
                    longitude: apartment.longitude,
                    pricePerNight: apartment.pricePerNight,
                    amenities: apartment.amenities,
                  }}
                  action={updateApartmentWithId}
                  submitLabel="Сохранить изменения"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-serif text-xl text-sage-900">Фото</h2>
              <div className="rounded-2xl border border-sage-200 bg-white p-6">
                <ImageManager apartmentId={apartment.id} images={images} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-xl text-sage-900">Календарь</h2>
            <CalendarEditor
              apartmentId={apartment.id}
              entries={entries.map((e) => ({
                date: e.date,
                isAvailable: e.isAvailable,
                price: e.price,
              }))}
              defaultPrice={apartment.pricePerNight}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
