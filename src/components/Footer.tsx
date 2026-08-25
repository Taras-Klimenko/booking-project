import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="border-t border-sage-200 bg-sage-900 text-sage-100"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-serif text-2xl italic text-white">
              Просто Уютно
            </p>
            <p className="mt-3 text-sm text-sage-300">
              Квартиры посуточно рядом с м. Сокол, Войковская, МЦД Стрешнево.
              Удобно для командировочных и гостей столицы.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sage-400">
              Навигация
            </p>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/#apartments" className="hover:text-white">
                Квартиры
              </Link>
              <Link href="/#faq" className="hover:text-white">
                Частые вопросы
              </Link>
              <Link href="/#contacts" className="hover:text-white">
                Контакты
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sage-400">
              Связаться
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="tel:+79653236684" className="hover:text-white">
                +7-965-323-66-84
              </a>
              <a href="tel:+79653012729" className="hover:text-white">
                +7-965-301-27-29
              </a>
              <a href="https://t.me/Adilya17S" className="hover:text-white">
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-sage-700 pt-6 text-xs text-sage-400">
          © {new Date().getFullYear()} Просто Уютно. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
