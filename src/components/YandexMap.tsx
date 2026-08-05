type YandexMapProps = {
  latitude: number;
  longitude: number;
  address?: string;
  zoom?: number;
};

export default function YandexMap({
  latitude,
  longitude,
  address,
  zoom = 16,
}: YandexMapProps) {
  // Yandex uses longitude,latitude order for ll and pt
  const src = `https://yandex.ru/map-widget/v1/?ll=${longitude}%2C${latitude}&z=${zoom}&pt=${longitude},${latitude},pm2rdm&l=map&lang=ru_RU`;

  return (
    <section>
      <h3 className="font-serif text-xl text-sage-900">Расположение</h3>
      {address && (
        <p className="mt-2 text-sm text-sage-600">{address}</p>
      )}
      <div className="mt-4 overflow-hidden rounded-2xl border border-sage-200">
        <iframe
          src={src}
          width="100%"
          height="360"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={address ? `Карта: ${address}` : "Карта расположения"}
        />
      </div>
    </section>
  );
}
