import { db } from "@/lib/db/client";
import { apartments } from "@/lib/db/schema";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";

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

        <div className="space-y-3">
          {allApartments.map((apt) => (
            <Link
              key={apt.id}
              href={`/admin/apartments/${apt.id}`}
              className="block rounded-xl border border-sage-200 bg-white p-5 transition-colors hover:border-sage-400"
            >
              <p className="font-medium text-sage-900">{apt.title}</p>
              <p className="text-sm text-sage-600">м. {apt.metro}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}