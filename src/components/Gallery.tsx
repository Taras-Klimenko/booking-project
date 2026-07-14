"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-sage-100">
        <Image src={images[active]} alt={title} fill className="object-cover" />
      </div>
      <div className="mt-3 flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-20 w-28 overflow-hidden rounded-lg border-2 transition-colors ${
              active === i ? "border-sage-600" : "border-transparent"
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}