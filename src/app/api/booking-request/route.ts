import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, dates, apartmentTitle } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Укажите имя и телефон" },
        { status: 400 }
      );
    }

    const text = `
🏠 Новая заявка с сайта!

Квартира: ${apartmentTitle}
Имя: ${name}
Телефон: ${phone}
Желаемые даты: ${dates || "не указаны"}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Telegram API responded with error:", response.status, errorBody);
      throw new Error("Telegram API error");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking request error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}