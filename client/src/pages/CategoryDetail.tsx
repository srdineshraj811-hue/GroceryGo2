import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  unit: string;
}

interface Subcategory {
  id: string;
  name: string;
  products: Product[];
}

interface CategoryDetailProps {
  categoryId: string;
  categoryName: string;
  subcategories: Subcategory[];
  onBack: () => void;
}

export default function CategoryDetail({
  categoryId,
  categoryName,
  subcategories,
  onBack,
}: CategoryDetailProps) {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string>(
    subcategories[0]?.id || ""
  );
  const subcategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToSubcategory = (subcategoryId: string) => {
    setActiveSubcategoryId(subcategoryId);
    subcategoryRefs.current[subcategoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-subcategory-id");
            if (id) setActiveSubcategoryId(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(subcategoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [subcategories]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="p-4 flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={onBack}
            data-testid="button-back-to-categories"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold" data-testid="text-category-name">
            {categoryName}
          </h1>
        </div>

        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {subcategories.map((subcategory) => (
              <Badge
                key={subcategory.id}
                variant={
                  activeSubcategoryId === subcategory.id ? "default" : "outline"
                }
                className="cursor-pointer whitespace-nowrap px-4 py-2"
                onClick={() => scrollToSubcategory(subcategory.id)}
                data-testid={`badge-subcategory-${subcategory.id}`}
              >
                {subcategory.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            ref={(el) => (subcategoryRefs.current[subcategory.id] = el)}
            data-subcategory-id={subcategory.id}
            data-testid={`section-subcategory-${subcategory.id}`}
          >
            <h2 className="text-lg font-semibold mb-3">{subcategory.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {subcategory.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl}
                  unit={product.unit}
                  stock={50}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
