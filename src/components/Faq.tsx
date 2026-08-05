"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Как забронировать квартиру?",
    a: "Оставьте заявку с указанием квартиры и датами на сайте или напишите нам в Telegram / MAX",
  },
  {
    q: "Во сколько заезд и выезд?",
    a: "Заезд с 14:00, выезд 12:00. По согласованию доступны ранний заезд и поздний выезд",
  },
  {
    q: "Какой депозит и как он возвращается?",
    a: "Депозит 3000 руб., возвращается при соблюдении правил пользования квартирой, при обнаружении запаха от курения или ущерба имуществу залог не возвращается.",
  },
  {
    q: "Правила пользования и проживания в квартире:",
    a: `- курение в квартире категорически запрещено;
- квартира не сдается для вечеринок и шумных компаний;
- квартира не сдается лицам младше 18 лет;
- проживание с животными запрещено;
- соблюдайте, пожалуйста, тишину с 22:00 и до 7:00 следующего дня;
- при уходе из квартиры не оставляйте включённой воду, свет и
бытовые электроприборы;
- просим Вас не оставлять мусор и другие предметы в местах общего
пользования. Мусорные контейнеры находятся во дворе дома.
    `,
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-serif text-4xl text-sage-900">
        Остались вопросы?{" "}
        <span className="italic text-sage-600">мы поможем</span>
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
            {open === i && (
              <p className="pb-5 text-sage-700 whitespace-pre-wrap">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
