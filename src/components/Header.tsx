"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // на случай, если страница уже проскроллена при загрузке

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-20 w-full backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-sage-50/90 shadow-sm" : "bg-black/10"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className={`font-serif text-2xl italic transition-colors ${
            scrolled ? "text-sage-900" : "text-white"
          }`}
        >
          Просто Уютно
        </Link>

        <nav
          className={`hidden gap-8 text-sm transition-colors sm:flex uppercase ${
            scrolled ? "text-sage-900" : "text-white"
          }`}
        >
          <a href="/#apartments" className="hover:text-sage-600">
            Квартиры
          </a>
          <a href="/#faq" className="hover:text-sage-600">
            Вопросы
          </a>
          <a href="/#testimonials" className="hover:text-sage-600">
            Отзывы
          </a>
          <a href="/#contacts" className="hover:text-sage-600">
            Контакты
          </a>
        </nav>

        <a
          href="https://t.me/your_telegram"
          className={`rounded border px-5 py-2 text-sm transition-colors ${
            scrolled
              ? "border-sage-900 text-sage-900 hover:bg-sage-900 hover:text-white"
              : "border-white text-white hover:bg-white hover:text-sage-900"
          }`}
        >
          Написать нам
        </a>
      </div>
    </header>
  );
}
