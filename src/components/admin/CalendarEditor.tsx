"use client";

import { useState, useTransition } from "react";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { toggleAvailability, updatePrice } from "@/lib/actions/calendar";

type CalendarEntry = {
  date: string;
  isAvailable: boolean;
  price: number | null;
};

export default function CalendarEditor({
  apartmentId,
  entries,
  defaultPrice,
}: {
  apartmentId: number;
  entries: CalendarEntry[];
  defaultPrice: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState("");

  const entryMap = new Map(entries.map((e) => [e.date, e]));
  const bookedDates = entries
    .filter((e) => !e.isAvailable)
    .map((e) => new Date(e.date));

  function handleDayClick(day: Date) {
    const dateStr = format(day, "yyyy-MM-dd");
    setSelectedDate(dateStr);
    const entry = entryMap.get(dateStr);
    setPriceInput(entry?.price?.toString() ?? "");
  }

  function handleToggle() {
    if (!selectedDate) return;
    const entry = entryMap.get(selectedDate);
    const newAvailability = !(entry?.isAvailable ?? true);

    startTransition(() => {
      toggleAvailability(apartmentId, selectedDate, newAvailability);
    });
  }

  function handlePriceSave() {
    if (!selectedDate) return;
    const price = priceInput.trim() === "" ? null : Number(priceInput);

    startTransition(() => {
      updatePrice(apartmentId, selectedDate, price);
    });
  }

  const selectedEntry = selectedDate ? entryMap.get(selectedDate) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sage-200 bg-white p-6">
        <DayPicker
          mode="single"
          locale={ru}
          onDayClick={handleDayClick}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{
            booked: "bg-red-100 text-red-700",
          }}
          classNames={{
            month_grid: "w-full",
            caption_label: "flex justify-center py-2 font-medium text-sage-900",
            button_previous: "text-sage-600 hover:text-sage-900",
            button_next: "text-sage-600 hover:text-sage-900",
            chevron: "fill-sage-600",
            day: "text-sage-800 rounded-lg hover:bg-sage-100 cursor-pointer",
            selected: "bg-sage-600 text-white hover:bg-sage-700",
            today: "font-bold",
          }}
        />
        <div className="mt-4 flex gap-4 text-sm text-sage-600">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-100" /> занято
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-sage-600" /> выбранная дата
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-sage-200 bg-white p-6">
        {!selectedDate ? (
          <p className="text-sage-500">Выберите дату в календаре слева</p>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-sage-500">Выбранная дата</p>
              <p className="text-lg font-medium text-sage-900">
                {format(new Date(selectedDate), "d MMMM yyyy", { locale: ru })}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-sage-500">Статус</p>
              <button
                onClick={handleToggle}
                disabled={isPending}
                className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  selectedEntry?.isAvailable === false
                    ? "bg-sage-700 text-white hover:bg-sage-800"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {selectedEntry?.isAvailable === false
                  ? "Отметить как свободно"
                  : "Отметить как занято"}
              </button>
            </div>

            <div>
              <p className="mb-2 text-sm text-sage-500">
                Цена на эту дату (по умолчанию{" "}
                {defaultPrice.toLocaleString("ru-RU")} ₽)
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder={defaultPrice.toString()}
                  className="flex-1 rounded-lg border border-sage-300 px-3 py-2 focus:border-sage-600 focus:outline-none"
                />
                <button
                  onClick={handlePriceSave}
                  disabled={isPending}
                  className="rounded-lg bg-sage-700 px-4 py-2 text-sm text-white transition-colors hover:bg-sage-800 disabled:opacity-50"
                >
                  Сохранить
                </button>
              </div>
              <p className="mt-1 text-xs text-sage-400">
                Оставьте поле пустым, чтобы использовать цену по умолчанию
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
