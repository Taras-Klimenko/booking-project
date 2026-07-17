"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Apartment } from "@/lib/types";

export default function ApartmentRow({ apartment }: { apartment: Apartment }) {
  const [active, setActive] = useState(0);
  const hasMultiple = apartment.images.length > 1;

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    setActive((i) => (i === 0 ? apartment.images.length - 1 : i - 1));
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    setActive((i) => (i === apartment.images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative h-[480px] overflow-hidden sm:h-[420px]">
      <Image
        src={apartment.images[active]}
        alt={apartment.title}
        fill
        className="object-cover transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {hasMultiple && (
        <>
          <button
            onClick={prev}
            aria-label="Предыдущее фото"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Следующее фото"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          >
            →
          </button>

          <div className="absolute top-4 right-4 flex gap-1.5">
            {apartment.images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === active ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-sage-100">
            м. {apartment.metro}
          </p>
          <h3 className="mt-1 font-serif text-2xl sm:text-4xl">{apartment.title}</h3>
          <p className="mt-2 max-w-md text-sm text-sage-100">
            {apartment.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
          <p className="font-serif text-xl italic sm:text-2xl">
            от {apartment.pricePerNight.toLocaleString("ru-RU")} ₽
          </p>
          <Link
            href={`/apartments/${apartment.slug}`}
            className="inline-block shrink-0 rounded border border-white px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-sage-900 sm:mt-3 sm:px-5"
          >
            Смотреть
          </Link>
        </div>
      </div>
    </div>
  );
}