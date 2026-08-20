"use client";

import { useTransition } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";

type ApartmentFormValues = {
  title: string;
  description: string;
  fullDescription: string;
  address: string;
  metro: string;
  latitude: number | null;
  longitude: number | null;
  pricePerNight: number;
  amenities: string[];
};

export default function ApartmentForm({
  initialValues,
  action,
  submitLabel,
}: {
  initialValues?: ApartmentFormValues;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm text-sage-600">Название</label>
        <input
          name="title"
          defaultValue={initialValues?.title}
          required
          className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-sage-600">
          Краткое описание (для списка квартир)
        </label>
        <textarea
          name="description"
          defaultValue={initialValues?.description}
          required
          rows={2}
          className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-sage-600">
          Полное описание (для страницы квартиры)
        </label>
        <RichTextEditor
          name="fullDescription"
          defaultValue={initialValues?.fullDescription}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-sage-600">Адрес</label>
          <input
            name="address"
            defaultValue={initialValues?.address}
            required
            className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-sage-600">Метро</label>
          <input
            name="metro"
            defaultValue={initialValues?.metro}
            required
            className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-sage-600">
          Координаты для карты (необязательно)
        </label>
        <p className="mb-2 text-xs text-sage-500">
          Можно скопировать из Яндекс.Карт: ПКМ по точке → «Что здесь?»
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-sage-500">Широта</label>
            <input
              type="number"
              name="latitude"
              step="any"
              defaultValue={initialValues?.latitude ?? undefined}
              placeholder="55.805"
              className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-sage-500">Долгота</label>
            <input
              type="number"
              name="longitude"
              step="any"
              defaultValue={initialValues?.longitude ?? undefined}
              placeholder="37.515"
              className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-sage-600">
          Цена за сутки (по умолчанию)
        </label>
        <input
          type="number"
          name="pricePerNight"
          defaultValue={initialValues?.pricePerNight}
          required
          className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-sage-600">
          Удобства (через запятую)
        </label>
        <input
          name="amenities"
          defaultValue={initialValues?.amenities?.join(", ")}
          placeholder="Wi-Fi, Кондиционер, Стиральная машина"
          className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-sage-700 py-3 text-white transition-colors hover:bg-sage-800 disabled:opacity-50"
      >
        {isPending ? "Сохранение..." : submitLabel}
      </button>
    </form>
  );
}
