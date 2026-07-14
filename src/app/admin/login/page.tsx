"use client";

import { useState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sage-50">
      <form
        action={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-sage-200 bg-white p-8"
      >
        <h1 className="font-serif text-2xl text-sage-900">Вход в админку</h1>

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="w-full rounded-lg border border-sage-300 px-4 py-2 focus:border-sage-600 focus:outline-none"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-sage-700 py-3 text-white transition-colors hover:bg-sage-800 disabled:opacity-50"
        >
          {loading ? "Проверка..." : "Войти"}
        </button>
      </form>
    </main>
  );
}
