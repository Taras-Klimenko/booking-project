import { db } from "@/lib/db/client";
import { apartments } from "@/lib/db/schema";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import DeleteApartmentButton from "@/components/admin/DeleteApartmentButton";

export default async function AdminPage() {
  const allApartments = await db.select().from(apartments);

  return (
    <main className="min-h-screen bg-sage-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-3xl text-sage-900">Управление квартирами</h1>
          <form action={logout}>
            <button className="text-sm text-sage-600 hover:text-sage-900">
              Выйти
            </button>
          </form>
        </div>

        <Link
          href="/admin/apartments/new"
          className="mb-6 inline-block rounded-lg bg-sage-700 px-5 py-2.5 text-sm text-white transition-colors hover:bg-sage-800"
        >
          + Добавить квартиру
        </Link>

        <div className="space-y-3">
          {allApartments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between rounded-xl border border-sage-200 bg-white p-5"
            >
              <Link
                href={`/admin/apartments/${apt.id}`}
                className="flex-1"
              >
                <p className="font-medium text-sage-900">{apt.title}</p>
                <p className="text-sm text-sage-600">м. {apt.metro}</p>
              </Link>
              <DeleteApartmentButton apartmentId={apt.id} title={apt.title} />
            </div>
          ))}
        </div>

        {allApartments.length === 0 && (
          <p className="text-center text-sage-500">Квартир пока нет</p>
        )}
      </div>
    </main>
  );
}