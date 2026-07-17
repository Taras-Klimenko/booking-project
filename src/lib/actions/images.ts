"use server";

import { put, del } from "@vercel/blob";
import { db } from "@/lib/db/client";
import { apartmentImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function uploadImage(apartmentId: number, formData: FormData) {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
        return { error: "Файл не выбран" };
    }

    // ограничение размера — 5 МБ
    if (file.size > 5 * 1024 * 1024) {
        return { error: "Файл слишком большой (максимум 5 МБ)" };
    }

    const blob = await put(`apartments/${apartmentId}/${Date.now()}-${file.name}`, file, {
        access: "public",
    });

    // placing new image at the end
    const existing = await db
        .select()
        .from(apartmentImages)
        .where(eq(apartmentImages.apartmentId, apartmentId));

    const maxOrder = existing.reduce((max, img) => Math.max(max, img.sortOrder), -1);

    await db.insert(apartmentImages).values({
        apartmentId,
        url: blob.url,
        sortOrder: maxOrder + 1,
    });

    revalidatePath(`/admin/apartments/${apartmentId}`);
    revalidatePath("/");

    return { success: true };
}

export async function deleteImage(imageId: number, apartmentId: number, url: string) {
    await del(url);
    await db.delete(apartmentImages).where(eq(apartmentImages.id, imageId));

    revalidatePath(`/admin/apartments/${apartmentId}`);
    revalidatePath("/");
}