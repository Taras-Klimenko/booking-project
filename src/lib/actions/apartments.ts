"use server";

import { db } from "@/lib/db/client";
import { apartments, calendarEntries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const translitMap: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(title: string) {
    return title
        .toLowerCase()
        .split("")
        .map((char) => translitMap[char] ?? char)
        .join("")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function parseOptionalCoord(value: FormDataEntryValue | null) {
    if (typeof value !== "string" || !value.trim()) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

export async function createApartment(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const address = formData.get("address") as string;
    const metro = formData.get("metro") as string;
    const latitude = parseOptionalCoord(formData.get("latitude"));
    const longitude = parseOptionalCoord(formData.get("longitude"));
    const pricePerNight = Number(formData.get("pricePerNight"));
    const amenities = (formData.get("amenities") as string)
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

    const slug = slugify(title);

    const [inserted] = await db
        .insert(apartments)
        .values({
            slug,
            title,
            description,
            fullDescription,
            address,
            metro,
            latitude,
            longitude,
            pricePerNight,
            amenities,
        })
        .returning({ id: apartments.id });

    // calendar generation
    const entries = [];
    const today = new Date();
    for (let i = 0; i < 180; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        entries.push({
            apartmentId: inserted.id,
            date: date.toISOString().split("T")[0],
            isAvailable: true,
            price: null,
        });
    }
    await db.insert(calendarEntries).values(entries);

    revalidatePath("/admin");
    revalidatePath("/");
    redirect(`/admin/apartments/${inserted.id}`);
}

export async function updateApartment(apartmentId: number, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const address = formData.get("address") as string;
    const metro = formData.get("metro") as string;
    const latitude = parseOptionalCoord(formData.get("latitude"));
    const longitude = parseOptionalCoord(formData.get("longitude"));
    const pricePerNight = Number(formData.get("pricePerNight"));
    const amenities = (formData.get("amenities") as string)
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

    const [updated] = await db
        .update(apartments)
        .set({
            title,
            description,
            fullDescription,
            address,
            metro,
            latitude,
            longitude,
            pricePerNight,
            amenities,
            updatedAt: new Date(),
        })
        .where(eq(apartments.id, apartmentId))
        .returning({ slug: apartments.slug });

    revalidatePath("/admin");
    revalidatePath(`/admin/apartments/${apartmentId}`);
    revalidatePath("/");
    if (updated?.slug) {
        revalidatePath(`/apartments/${updated.slug}`);
    }
}

export async function deleteApartment(apartmentId: number) {
    // фото и календарь удалятся автоматически благодаря onDelete: "cascade" в схеме
    await db.delete(apartments).where(eq(apartments.id, apartmentId));

    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/admin");
}