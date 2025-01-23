import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gupVhP9rRZ6agGva3eiMX10FTsMWC8.png",
    alt: "Institute entrance gate",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gupVhP9rRZ6agGva3eiMX10FTsMWC8.png",
    alt: "Building entrance",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gupVhP9rRZ6agGva3eiMX10FTsMWC8.png",
    alt: "Institute entrance gate",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gupVhP9rRZ6agGva3eiMX10FTsMWC8.png",
    alt: "Building entrance",
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= images.length - slidesPerView ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - slidesPerView : prevIndex - 1
    );
  };

  // Update slidesPerView based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1); // Mobile: 1 slide
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2); // Tablet: 2 slides
      } else {
        setSlidesPerView(3); // Desktop: 3 slides
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  return (
    <div className="relative w-full max-w-[900px] mx-auto h-[250px] sm:h-[350px] lg:h-[450px] mt-4 mb-4 overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / slidesPerView) * 100}%)`,
          width: `${images.length * (100 / slidesPerView)}%`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`w-[${100 / slidesPerView}%] h-[250px] sm:h-[350px] lg:h-[450px] object-cover flex-shrink-0`}
          />
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 text-white cursor-pointer transition-all hover:bg-black/40"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 text-white cursor-pointer transition-all hover:bg-black/40"
      >
        <ChevronRight size={20} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentIndex === index
                ? "bg-white"
                : "bg-gray-400"
            } transition-all`}
          ></button>
        ))}
      </div>
    </div>
  );
}
