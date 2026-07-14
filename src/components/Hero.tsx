// src/components/Hero.tsx
export default function Hero() {
    return (
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder-apartment.webp"
            alt="Уютное завтра"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage-900/70 via-sage-900/20 to-transparent" />
        </div>
  
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
          <h1 className="font-serif text-5xl text-white sm:text-6xl">
            Уютное завтра
          </h1>
          <p className="mt-2 font-serif text-3xl italic text-sage-100">
            квартиры посуточно для комфортного проживания
          </p>
  
          <div className="mt-10 flex gap-8 text-white">
            <div>
              <span className="text-2xl font-semibold">4</span>
              <p className="text-sm text-sage-100">квартиры в наличии</p>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div>
              <span className="text-2xl font-semibold">5 мин</span>
              <p className="text-sm text-sage-100">пешком до метро</p>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div>
              <span className="text-2xl font-semibold">3</span>
              <p className="text-sm text-sage-100">станции метро/МЦД рядом</p>
            </div>
          </div>
        </div>
      </section>
    );
  }