// src/components/Testimonials.tsx
const testimonials = [
  {
    name: "Дмитрий",
    text: "Останавливался по командировке на неделю — всё чисто, тихо, до метро действительно 5 минут. Буду бронировать снова.",
    apartment: "Студия у Сокола",
  },
  {
    name: "Марина",
    text: "Очень удобно, что рядом и метро, и МЦД — добиралась в любую точку города без пересадок. Квартира точно как на фото.",
    apartment: "Квартира у Войковской",
  },
  {
    name: "Игорь",
    text: "Снимали с коллегой на несколько дней для командировки в МАИ. Всё понравилось, хозяйка на связи, вопросы решались быстро.",
    apartment: "Апартаменты у Стрешнево",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-4xl text-sage-900">
        Что говорят <span className="text-sage-600">наши гости</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-sage-200 bg-white p-6"
          >
            <p className="text-sage-700">«{t.text}»</p>
            <div className="mt-4 border-t border-sage-200 pt-4">
              <p className="font-medium text-sage-900">{t.name}</p>
              <p className="text-sm text-sage-500">{t.apartment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
