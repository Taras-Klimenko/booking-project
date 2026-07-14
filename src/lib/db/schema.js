"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRequests = exports.calendarEntries = exports.apartmentImages = exports.apartments = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.apartments = (0, pg_core_1.pgTable)("apartments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    slug: (0, pg_core_1.text)("slug").notNull().unique(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    fullDescription: (0, pg_core_1.text)("full_description").notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    metro: (0, pg_core_1.text)("metro").notNull(),
    pricePerNight: (0, pg_core_1.integer)("price_per_night").notNull(),
    amenities: (0, pg_core_1.text)("amenities").array().notNull().default([]),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.apartmentImages = (0, pg_core_1.pgTable)("apartment_images", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    apartmentId: (0, pg_core_1.integer)("apartment_id")
        .notNull()
        .references(function () { return exports.apartments.id; }, { onDelete: "cascade" }),
    url: (0, pg_core_1.text)("url").notNull(),
    sortOrder: (0, pg_core_1.integer)("sort_order").notNull().default(0),
});
exports.calendarEntries = (0, pg_core_1.pgTable)("calendar_entries", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    apartmentId: (0, pg_core_1.integer)("apartment_id")
        .notNull()
        .references(function () { return exports.apartments.id; }, { onDelete: "cascade" }),
    date: (0, pg_core_1.date)("date").notNull(),
    isAvailable: (0, pg_core_1.boolean)("is_available").notNull().default(true),
    price: (0, pg_core_1.integer)("price"),
});
exports.bookingRequests = (0, pg_core_1.pgTable)("booking_requests", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    apartmentId: (0, pg_core_1.integer)("apartment_id").notNull().references(function () { return exports.apartments.id; }),
    name: (0, pg_core_1.text)("name").notNull(),
    phone: (0, pg_core_1.text)("phone").notNull(),
    requestedDates: (0, pg_core_1.text)("requested_dates"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
