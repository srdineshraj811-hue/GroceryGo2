import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";

interface ProductCarouselProps {
  children: React.ReactNode;
}

export interface ProductCarouselHandle {
  scrollLeft: () => void;
  scrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export const ProductCarousel = forwardRef<ProductCarouselHandle, ProductCarouselProps>(
  ({ children }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollability = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    };

    useEffect(() => {
      checkScrollability();
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener("scroll", checkScrollability);
        window.addEventListener("resize", checkScrollability);
        return () => {
          container.removeEventListener("scroll", checkScrollability);
          window.removeEventListener("resize", checkScrollability);
        };
      }
    }, [children]);

    const scroll = (direction: "left" | "right") => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollAmount = 300;
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    };

    useImperativeHandle(ref, () => ({
      scrollLeft: () => scroll("left"),
      scrollRight: () => scroll("right"),
      canScrollLeft,
      canScrollRight,
    }));

    return (
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
    );
  }
);

ProductCarousel.displayName = "ProductCarousel";
