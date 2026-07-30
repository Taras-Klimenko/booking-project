"use client";

import { useState, useTransition } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ru } from "date-fns/locale";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import { setAvailabilityRange, updatePrice } from "@/lib/actions/calendar";

type CalendarEntry = {
  date: string;
  isAvailable: boolean;
  price: number | null;
};

function toDateStr(day: Date) {
  return format(day, "yyyy-MM-dd");
}

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
  const [range, setRange] = useState<DateRange | undefined>();
  const [priceInput, setPriceInput] = useState("");

  const entryMap = new Map(entries.map((e) => [e.date, e]));
  const bookedDates = entries
    .filter((e) => !e.isAvailable)
    .map((e) => parseISO(e.date));

  const fromStr = range?.from ? toDateStr(range.from) : null;
  const toStr = range?.to
    ? toDateStr(range.to)
    : fromStr;
  const hasSelection = Boolean(fromStr);
  const isSingleDay = Boolean(fromStr && toStr && fromStr === toStr);
  const dayCount =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from) + 1
      : range?.from
        ? 1
        : 0;

  function handleSelect(next: DateRange | undefined) {
    setRange(next);
    if (next?.from && (!next.to || toDateStr(next.from) === toDateStr(next.to))) {
      const dateStr = toDateStr(next.from);
      const entry = entryMap.get(dateStr);
      setPriceInput(entry?.price?.toString() ?? "");
    } else {
      setPriceInput("");
    }
  }

  function handleSetAvailability(isAvailable: boolean) {
    if (!fromStr || !toStr) return;

    startTransition(() => {
      setAvailabilityRange(apartmentId, fromStr, toStr, isAvailable);
    });
    setRange(undefined);
  }

  function handlePriceSave() {
    if (!fromStr || !isSingleDay) return;
    const price = priceInput.trim() === "" ? null : Number(priceInput);

    startTransition(() => {
      updatePrice(apartmentId, fromStr, price);
    });
  }

  const selectedEntry = isSingleDay && fromStr ? entryMap.get(fromStr) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sage-200 bg-white p-6">
        <DayPicker
          mode="range"
          locale={ru}
          selected={range}
          onSelect={handleSelect}
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
            range_start: "bg-sage-600 text-white rounded-l-lg",
            range_end: "bg-sage-600 text-white rounded-r-lg",
            range_middle: "bg-sage-200 text-sage-900 rounded-none",
            today: "font-bold",
          }}
        />
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-sage-600">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-100" /> занято
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-sage-600" /> выбранный диапазон
          </span>
        </div>
        <p className="mt-2 text-xs text-sage-400">
          Кликните дату начала, затем дату конца диапазона
        </p>
      </div>

      <div className="rounded-2xl border border-sage-200 bg-white p-6">
        {!hasSelection ? (
          <p className="text-sage-500">Выберите дату или диапазон в календаре</p>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-sage-500">
                {isSingleDay ? "Выбранная дата" : "Выбранный диапазон"}
              </p>
              <p className="text-lg font-medium text-sage-900">
                {isSingleDay
                  ? format(parseISO(fromStr!), "d MMMM yyyy", { locale: ru })
                  : `${format(parseISO(fromStr!), "d MMM yyyy", { locale: ru })} — ${format(parseISO(toStr!), "d MMM yyyy", { locale: ru })}`}
              </p>
              {!isSingleDay && (
                <p className="mt-1 text-sm text-sage-500">
                  {dayCount}{" "}
                  {dayCount === 1
                    ? "день"
                    : dayCount < 5
                      ? "дня"
                      : "дней"}
                </p>
              )}
              {range?.from && !range.to && (
                <p className="mt-1 text-sm text-sage-400">
                  Выберите конечную дату или отметьте этот день
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm text-sage-500">Статус</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => handleSetAvailability(false)}
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-red-100 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
                >
                  Отметить как занято
                </button>
                <button
                  onClick={() => handleSetAvailability(true)}
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-sage-700 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-800 disabled:opacity-50"
                >
                  Отметить как свободно
                </button>
              </div>
            </div>

            {isSingleDay && (
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
                  {selectedEntry?.price != null &&
                    ` · сейчас: ${selectedEntry.price.toLocaleString("ru-RU")} ₽`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
