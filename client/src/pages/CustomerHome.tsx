import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromoBanner } from "@/components/PromoBanner";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductCarousel, type ProductCarouselHandle } from "@/components/ProductCarousel";
import CategoryDetail from "./CategoryDetail";
import { useState, useRef } from "react";
import type { SpecialBanner } from "@shared/schema";
import { categories, popularProducts, previouslyOrderedItems, subcategories } from "@/data/products";

interface CustomerHomeProps {
  onCategoryNavigate?: (categoryId: string) => void;
}

//todo: remove mock functionality
const mockBanners: SpecialBanner[] = [
  {
    id: "1",
    title: "50% OFF Fresh Produce",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
    linkUrl: "fresh-produce",
    sortOrder: 0,
    isActive: true,
  },
  {
    id: "2",
    title: "Weekend Special: Meat & Seafood",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=400&fit=crop",
    linkUrl: "meat-seafood",
    sortOrder: 1,
    isActive: true,
  },
];

export default function CustomerHome({ onCategoryNavigate }: CustomerHomeProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const previouslyOrderedRef = useRef<ProductCarouselHandle>(null);
  const popularProductsRef = useRef<ProductCarouselHandle>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    if (onCategoryNavigate) {
      onCategoryNavigate(categoryId);
    }
  };
  
  const handleBannerClick = (banner: SpecialBanner) => {
    handleCategoryClick(banner.linkUrl);
  };

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);
  const categorySubcategories = subcategories.filter(sub => sub.categoryId === selectedCategoryId);

  if (selectedCategoryId && selectedCategory) {
    return (
      <CategoryDetail
        categoryId={selectedCategoryId}
        categoryName={selectedCategory.name}
        subcategories={categorySubcategories}
        onBack={() => setSelectedCategoryId(null)}
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span data-testid="text-service-location">Dallas, TX - Delivery Available</span>
          </div>
          <h1 className="font-display font-bold text-2xl mb-4">FreshCart</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <PromoBanner banners={mockBanners} onBannerClick={handleBannerClick} />

        <section>
          <h2 className="font-semibold text-lg mb-4">Shop by Category</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg" data-testid="text-previously-ordered-title">Previously Ordered</h2>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => previouslyOrderedRef.current?.scrollLeft()}
                data-testid="button-previously-ordered-prev"
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => previouslyOrderedRef.current?.scrollRight()}
                data-testid="button-previously-ordered-next"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <ProductCarousel ref={previouslyOrderedRef}>
            {previouslyOrderedItems.map((product) => (
              <div key={product.id} className="w-44 flex-shrink-0 snap-start">
                <ProductCard {...product} />
              </div>
            ))}
          </ProductCarousel>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg" data-testid="text-popular-products-title">Popular Products</h2>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => popularProductsRef.current?.scrollLeft()}
                data-testid="button-popular-products-prev"
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => popularProductsRef.current?.scrollRight()}
                data-testid="button-popular-products-next"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <ProductCarousel ref={popularProductsRef}>
            {popularProducts.map((product) => (
              <div key={product.id} className="w-44 flex-shrink-0 snap-start">
                <ProductCard {...product} />
              </div>
            ))}
          </ProductCarousel>
        </section>
      </div>
    </div>
  );
}
