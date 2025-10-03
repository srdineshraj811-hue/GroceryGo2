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

//todo: remove mock functionality
const mockBanners: SpecialBanner[] = [
  {
    id: "1",
    title: "50% OFF Fresh Produce",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
    linkUrl: "/specials/produce",
    sortOrder: 0,
    isActive: true,
  },
  {
    id: "2",
    title: "Weekend Special: Fresh Meat",
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=400&fit=crop",
    linkUrl: "/specials/meat",
    sortOrder: 1,
    isActive: true,
  },
];

//todo: remove mock functionality
const categories = [
  { id: "1", name: "Batters, Dairy & Poultry", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=400&fit=crop", itemCount: 48 },
  { id: "2", name: "Beverages", image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&h=400&fit=crop", itemCount: 35 },
  { id: "3", name: "Breakfast Cereals", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", itemCount: 24 },
  { id: "4", name: "Food Grains, Oils & Masala", image: "https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=600&h=400&fit=crop", itemCount: 42 },
  { id: "5", name: "Fresh Made Food", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop", itemCount: 28 },
  { id: "6", name: "Frozen", image: "https://images.unsplash.com/photo-1628773822990-202f6816fed8?w=600&h=400&fit=crop", itemCount: 56 },
  { id: "7", name: "Fruits & Vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop", itemCount: 64 },
  { id: "8", name: "Meat", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop", itemCount: 38 },
  { id: "9", name: "Personal & Home Care", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop", itemCount: 72 },
  { id: "10", name: "Pooja & Festival Items", image: "https://images.unsplash.com/photo-1603046891726-36bfd957e4f0?w=600&h=400&fit=crop", itemCount: 45 },
  { id: "11", name: "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=400&fit=crop", itemCount: 58 },
  { id: "12", name: "Sports & Miscellaneous", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop", itemCount: 32 },
];

//todo: remove mock functionality
const products = [
  { id: "1", name: "Organic Bananas", price: 2.99, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", unit: "lb", stock: 25 },
  { id: "2", name: "Fresh Strawberries", price: 4.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", unit: "lb", stock: 8 },
  { id: "3", name: "Roma Tomatoes", price: 3.49, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop", unit: "lb", stock: 18 },
  { id: "4", name: "Avocados", price: 1.99, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", unit: "each", stock: 30 },
  { id: "5", name: "Fresh Broccoli", price: 2.49, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop", unit: "lb", stock: 20 },
  { id: "6", name: "Blueberries", price: 5.99, image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop", unit: "pint", stock: 15 },
];

//todo: remove mock functionality
const previouslyOrderedItems = [
  { id: "p1", name: "Whole Milk", price: 4.49, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop", unit: "gal", stock: 25 },
  { id: "p2", name: "Organic Bananas", price: 2.99, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", unit: "lb", stock: 25 },
  { id: "p3", name: "Brown Eggs", price: 3.99, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", unit: "dozen", stock: 30 },
  { id: "p4", name: "Fresh Bread", price: 2.99, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", unit: "loaf", stock: 18 },
  { id: "p5", name: "Greek Yogurt", price: 4.99, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", unit: "32 oz", stock: 22 },
  { id: "p6", name: "Orange Juice", price: 3.49, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop", unit: "64 oz", stock: 28 },
];

//todo: remove mock functionality
const mockSubcategories = [
  {
    id: "1",
    name: "Leafy Greens",
    products: [
      { id: "p1", name: "Spinach", price: 2.99, imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", unit: "bunch" },
      { id: "p2", name: "Lettuce", price: 1.99, imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop", unit: "head" },
    ],
  },
  {
    id: "2",
    name: "Root Vegetables",
    products: [
      { id: "p3", name: "Carrots", price: 2.49, imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", unit: "lb" },
      { id: "p4", name: "Potatoes", price: 3.99, imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop", unit: "5 lb bag" },
    ],
  },
];

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const previouslyOrderedRef = useRef<ProductCarouselHandle>(null);
  const popularProductsRef = useRef<ProductCarouselHandle>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  if (selectedCategoryId && selectedCategory) {
    return (
      <CategoryDetail
        categoryId={selectedCategoryId}
        categoryName={selectedCategory.name}
        subcategories={mockSubcategories}
        onBack={() => setSelectedCategoryId(null)}
        onAddToCart={(productId) => console.log("Add to cart:", productId)}
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
        <PromoBanner banners={mockBanners} />

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
            {products.map((product) => (
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
