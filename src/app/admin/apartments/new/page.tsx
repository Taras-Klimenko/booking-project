import { createApartment } from "@/lib/actions/apartments";
import ApartmentForm from "@/components/admin/ApartmentForm";
import Link from "next/link";

export default function NewApartmentPage() {
  return (
    <main className="min-h-screen bg-sage-50 px-6 pt-28 pb-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin"
          className="text-sm text-sage-600 hover:text-sage-900"
        >
          ← Ко всем квартирам
        </Link>

        <h1 className="mt-2 mb-6 font-serif text-3xl text-sage-900">
          Новая квартира
        </h1>

        <div className="rounded-2xl border border-sage-200 bg-white p-6">
          <ApartmentForm
            action={createApartment}
            submitLabel="Создать квартиру"
          />
        </div>
      </div>
    </main>
  );
}
