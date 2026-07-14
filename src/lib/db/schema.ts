import { pgTable, serial, text, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";

export const apartments = pgTable("apartments", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  address: text("address").notNull(),
  metro: text("metro").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  amenities: text("amenities").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const apartmentImages = pgTable("apartment_images", {
  id: serial("id").primaryKey(),
  apartmentId: integer("apartment_id")
    .notNull()
    .references(() => apartments.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const calendarEntries = pgTable("calendar_entries", {
  id: serial("id").primaryKey(),
  apartmentId: integer("apartment_id")
    .notNull()
    .references(() => apartments.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  price: integer("price"),
});

export const bookingRequests = pgTable("booking_requests", {
  id: serial("id").primaryKey(),
  apartmentId: integer("apartment_id").notNull().references(() => apartments.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  requestedDates: text("requested_dates"),
  createdAt: timestamp("created_at").defaultNow(),
});