export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import ApartmentRow from "@/components/ApartmentRow";
import Faq from "@/components/Faq";
import { getAllApartments } from "@/lib/db/queries";
import Testimonials from "@/components/Testimonials";

export default async function Home() {

  const apartments = await getAllApartments();
  
  return (
    <main className="min-h-screen bg-sage-50">
      <Hero />

      <section id="apartments" className="mx-auto max-w-6xl space-y-6 px-6 pt-24">
        <div className="mb-4">
          <h2 className="font-serif text-4xl text-sage-900">Наши квартиры</h2>
          <p className="mt-2 text-sage-600">
            Выберите подходящий вариант — актуальные цены и даты в календаре
            каждой квартиры
          </p>
        </div>

        {apartments.map((apt) => (
          <ApartmentRow key={apt.id} apartment={apt} />
        ))}
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="faq">
        <Faq />
      </section>
    </main>
  );
}
