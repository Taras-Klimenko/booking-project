"use server";

import { db } from "@/lib/db/client";
import { calendarEntries } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleAvailability(
  apartmentId: number,
  date: string,
  isAvailable: boolean
) {
  await db
    .update(calendarEntries)
    .set({ isAvailable })
    .where(
      and(
        eq(calendarEntries.apartmentId, apartmentId),
        eq(calendarEntries.date, date)
      )
    );

  revalidatePath(`/admin/apartments/${apartmentId}`);
  revalidatePath(`/apartments`); 
}

export async function updatePrice(
  apartmentId: number,
  date: string,
  price: number | null
) {
  await db
    .update(calendarEntries)
    .set({ price })
    .where(
      and(
        eq(calendarEntries.apartmentId, apartmentId),
        eq(calendarEntries.date, date)
      )
    );

  revalidatePath(`/admin/apartments/${apartmentId}`);
  revalidatePath(`/apartments`);
}