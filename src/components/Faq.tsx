"use client";
import { useState } from "react";

const faqs = [
  { q: "Как забронировать квартиру?", a: "Оставьте заявку с датами на сайте или напишите нам напрямую в Telegram." },
  { q: "Какой депозит и когда он возвращается?", a: "..." },
  { q: "Во сколько заезд и выезд?", a: "..." },
  { q: "Можно ли с животными?", a: "..." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-serif text-4xl text-sage-900">
        Остались вопросы? <span className="italic text-sage-600">мы поможем</span>
      </h2>
      <div className="mt-10 divide-y divide-sage-200">
        {faqs.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-lg text-sage-900">{item.q}</span>
              <span className="text-sage-600">{open === i ? "↑" : "↓"}</span>
            </button>
            {open === i && <p className="pb-5 text-sage-700">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}