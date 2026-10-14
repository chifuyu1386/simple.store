import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* تصویر اصلی */}
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
        <img
          src={images[activeIndex]}
          alt={`${title} — تصویر ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* تصاویر کوچک */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`نمایش تصویر ${i + 1}`}
              className={[
                "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                i === activeIndex
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300",
              ].join(" ")}
            >
              <img
                src={img}
                alt={`${title} — تصویر کوچک ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}