"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { uploadImage, deleteImage } from "@/lib/actions/images";

type ApartmentImage = {
  id: number;
  url: string;
  sortOrder: number;
};

export default function ImageManager({
  apartmentId,
  images,
}: {
  apartmentId: number;
  images: ApartmentImage[];
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await uploadImage(apartmentId, formData);
      if (result?.error) {
        setError(result.error);
      } else if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    });
  }

  function handleDelete(imageId: number, url: string) {
    startTransition(() => {
      deleteImage(imageId, apartmentId, url);
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-sage-200"
          >
            <Image src={img.url} alt="" fill className="object-cover" />
            <button
              onClick={() => handleDelete(img.id, img.url)}
              disabled={isPending}
              className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100 disabled:opacity-50"
              aria-label="Удалить фото"
            >
              ✕
            </button>
          </div>
        ))}

        {images.length === 0 && (
          <p className="col-span-full text-sm text-sage-500">
            Фото пока не загружены
          </p>
        )}
      </div>

      <form action={handleUpload} className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept="image/*"
          required
          className="flex-1 text-sm text-sage-600 file:mr-3 file:rounded-lg file:border-0 file:bg-sage-100 file:px-4 file:py-2 file:text-sm file:text-sage-700 hover:file:bg-sage-200"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-lg bg-sage-700 px-4 py-2 text-sm text-white transition-colors hover:bg-sage-800 disabled:opacity-50"
        >
          {isPending ? "Загрузка..." : "Добавить"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-sage-400">Максимальный размер файла — 5 МБ</p>
    </div>
  );
}
