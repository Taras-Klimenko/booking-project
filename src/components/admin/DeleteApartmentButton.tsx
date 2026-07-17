"use client";

import { useState, useTransition } from "react";
import { deleteApartment } from "@/lib/actions/apartments";

export default function DeleteApartmentButton({
  apartmentId,
  title,
}: {
  apartmentId: number;
  title: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-sage-600">Удалить «{title}»?</span>
        <button
          onClick={() => startTransition(() => deleteApartment(apartmentId))}
          disabled={isPending}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? "Удаление..." : "Да, удалить"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-sm text-sage-500 hover:text-sage-700"
        >
          Отмена
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="ml-4 text-sm text-red-600 hover:text-red-800"
    >
      Удалить
    </button>
  );
}
