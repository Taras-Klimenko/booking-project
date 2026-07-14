"use client";

import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import "react-day-picker/dist/style.css";

export default function AvailabilityCalendar({
  bookedDates,
}: {
  bookedDates: string[];
}) {
  const booked = bookedDates.map((d) => new Date(d));

  return (
    <div className="rounded-2xl border border-sage-200 bg-white p-6">
      <h3 className="mb-4 font-serif text-xl text-sage-900">Доступность</h3>
      <DayPicker
        mode="single"
        locale={ru}
        disabled={booked}
        modifiers={{ booked }}
        modifiersClassNames={{
          booked: "bg-sage-200 text-sage-400 line-through",
        }}
        classNames={{
          months: "flex flex-col",
          caption: "flex justify-center py-2 font-medium text-sage-900",
          nav_button: "text-sage-600 hover:text-sage-900",
          day: "text-sage-800 rounded-lg hover:bg-sage-100",
          day_selected: "bg-sage-600 text-white hover:bg-sage-700",
          day_today: "font-bold",
        }}
      />
      <div className="mt-4 flex gap-4 text-sm text-sage-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-sage-200" /> занято
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-sage-600" /> выбрано
        </span>
      </div>
    </div>
  );
}
