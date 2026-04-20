import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowDown, Play } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    badge: "Featured",
    title: "The REVO Wellness Ecosystem",
    description: "Smart devices. Clean formulas. Real results.",
    cta: "Explore Products",
    duration: "1:24",
    bg: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "New Launch",
    title: "Walking Pad — Move While You Work",
    description: "Ultra-slim, whisper-quiet, and built for daily movement.",
    cta: "View Walking Pad",
    duration: "0:48",
    bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "Success Story",
    title: "How Retailers Are Growing with REVO",
    description: "50% margins, 90%+ sell-through, and dedicated partner support.",
    cta: "See Case Studies",
    duration: "2:10",
    bg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2072&auto=format&fit=crop",
  },
];

export const HomeScreen = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideNumber = `0${current + 1} / 0${SLIDES.length}`;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-20000 ease-linear transform scale-100"
            style={{
              backgroundImage: `url(${slide.bg})`,
              transform: index === current ? "scale(1.15)" : "scale(1)"
            }}
          />
          <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Slide Counter (Top-Right) */}
      <div className="absolute top-20 right-8 md:right-12 z-30 font-medium text-sm tracking-widest opacity-80">
        {slideNumber}
      </div>

      {/* Main Content (Bottom-Left Alignment) */}
      <div className="absolute bottom-20 left-8 md:left-12 lg:left-20 z-20 max-w-[700px] w-full pr-12">
        <div className="flex flex-col items-start gap-4 md:gap-6">
          <div className="overflow-hidden">
            <span
              key={`badge-${current}`}
              className="inline-block text-[10px] md:text-xs font-bold tracking-[0.2em] opacity-60 animate-slide-up"
            >
              {SLIDES[current].badge}
            </span>
          </div>

          <div className="overflow-hidden">
            <h1
              key={`title-${current}`}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-slide-up delay-100"
            >
              {SLIDES[current].title}
            </h1>
          </div>

          <div className="overflow-hidden">
            <p
              key={`desc-${current}`}
              className="text-base md:text-lg lg:text-xl opacity-70 max-w-[500px] font-medium animate-slide-up delay-200"
            >
              {SLIDES[current].description}
            </p>
          </div>

          <div className="flex items-center gap-8 animate-slide-up delay-300">
            <button className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-revo-orange rounded-full hover:bg-white hover:text-black transition-all duration-300">
              <Play size={16} fill="currentColor" className="ml-0.5" />
              <span className="font-bold text-[10px] md:text-xs tracking-widest">
                {SLIDES[current].cta}
              </span>
            </button>
            <span className="text-xs font-bold opacity-40 tracking-widest ml-2">
              {SLIDES[current].duration}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls (Bottom-Right Alignment) */}
      <div className="absolute bottom-20 right-8 md:right-12 lg:right-20 z-30 flex items-center gap-8 md:gap-12">

        {/* Arrow Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          {/* Pagination Dots */}
          <div className="flex items-center gap-3">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1 transition-all duration-500 ease-out ${index === current ? "w-10 bg-revo-orange" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator (Center-Bottom) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
        <ArrowDown size={20} />
      </div>
    </div>
  );
};