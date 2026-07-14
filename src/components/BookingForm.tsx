"use client";

import { useState } from "react";

export default function BookingForm({ apartmentTitle }: { apartmentTitle: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, dates, apartmentTitle }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setName("");
      setPhone("");
      setDates("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-white p-6 text-center">
        <p className="font-serif text-lg text-sage-900">Заявка отправлена!</p>
        <p className="mt-2 text-sm text-sage-600">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-sage-200 bg-white p-6"
    >
      <h3 className="font-serif text-xl text-sage-900">Оставить заявку</h3>

      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-lg border border-sage-300 px-4 py-2 text-sage-900 placeholder:text-sage-400 focus:border-sage-600 focus:outline-none"
      />

      <input
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full rounded-lg border border-sage-300 px-4 py-2 text-sage-900 placeholder:text-sage-400 focus:border-sage-600 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Желаемые даты"
        value={dates}
        onChange={(e) => setDates(e.target.value)}
        className="w-full rounded-lg border border-sage-300 px-4 py-2 text-sage-900 placeholder:text-sage-400 focus:border-sage-600 focus:outline-none"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-sage-700 py-3 text-white transition-colors hover:bg-sage-800 disabled:opacity-50"
      >
        {status === "loading" ? "Отправка..." : "Отправить заявку"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Что-то пошло не так, попробуйте ещё раз или напишите нам в Telegram напрямую.
        </p>
      )}
    </form>
  );
}