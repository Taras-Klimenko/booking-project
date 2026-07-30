import { notFound } from "next/navigation";
// import { getApartmentBySlug, apartments } from "@/lib/mock-data";
import { getApartmentBySlug } from "@/lib/db/queries";
import Gallery from "@/components/Gallery";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import BookingForm from "@/components/BookingForm";


export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apartment = await getApartmentBySlug(slug);
  if (!apartment) notFound();

  return (
    <main className="min-h-screen bg-sage-50 pt-28">
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <p className="text-sm uppercase tracking-wide text-sage-600">
          м. {apartment.metro}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-sage-900">
          {apartment.title}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Gallery images={apartment.images} title={apartment.title} />

            <p className="mt-8 text-sage-700">{apartment.fullDescription}</p>

            <div className="mt-8">
              <h3 className="font-serif text-xl text-sage-900">Удобства</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {apartment.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-sage-300 px-4 py-1 text-sm text-sage-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-sage-200 bg-white p-6">
              <p className="font-serif text-3xl text-sage-900">
                {apartment.pricePerNight.toLocaleString("ru-RU")} ₽
                <span className="text-base font-sans text-sage-600">
                  {" "}
                  / сутки
                </span>
              </p>
            </div>
            <AvailabilityCalendar calendar={apartment.calendar} />
            <BookingForm apartmentTitle={apartment.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
