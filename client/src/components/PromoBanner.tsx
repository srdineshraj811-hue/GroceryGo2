import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { SpecialBanner } from "@shared/schema";

interface PromoBannerProps {
  banners: SpecialBanner[];
  onBannerClick?: (banner: SpecialBanner) => void;
}

export function PromoBanner({ banners, onBannerClick }: PromoBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setLocation] = useLocation();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleBannerClick = useCallback((banner: SpecialBanner) => {
    if (onBannerClick) {
      onBannerClick(banner);
    } else {
      setLocation(banner.linkUrl);
    }
  }, [onBannerClick, setLocation]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="relative" data-testid="carousel-promo-banner">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-[0_0_100%] min-w-0"
              data-testid={`slide-banner-${banner.id}`}
            >
              <div
                className="relative h-40 md:h-48 overflow-hidden rounded-lg cursor-pointer hover-elevate active-elevate-2"
                onClick={() => handleBannerClick(banner)}
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-center">
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                    {banner.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <div className="absolute bottom-4 right-4 flex gap-2 md:flex hidden">
            <Button
              size="icon"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={scrollPrev}
              data-testid="button-banner-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={scrollNext}
              data-testid="button-banner-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex ? "bg-white w-6" : "bg-white/50"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                data-testid={`button-banner-dot-${index}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
