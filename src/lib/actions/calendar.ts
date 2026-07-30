"use server";

import { db } from "@/lib/db/client";
import { calendarEntries } from "@/lib/db/schema";
import { eq, and, between } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function revalidateApartment(apartmentId: number) {
  revalidatePath(`/admin/apartments/${apartmentId}`);
  revalidatePath(`/apartments`);
}

export async function toggleAvailability(
  apartmentId: number,
  date: string,
  isAvailable: boolean
) {
  await setAvailabilityRange(apartmentId, date, date, isAvailable);
}

export async function setAvailabilityRange(
  apartmentId: number,
  from: string,
  to: string,
  isAvailable: boolean
) {
  const [start, end] = from <= to ? [from, to] : [to, from];

  await db
    .update(calendarEntries)
    .set({ isAvailable })
    .where(
      and(
        eq(calendarEntries.apartmentId, apartmentId),
        between(calendarEntries.date, start, end)
      )
    );

  revalidateApartment(apartmentId);
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

  revalidateApartment(apartmentId);
}