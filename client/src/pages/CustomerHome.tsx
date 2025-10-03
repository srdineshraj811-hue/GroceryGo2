import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PromoBanner } from "@/components/PromoBanner";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

//todo: remove mock functionality
const categories = [
  { id: "1", name: "Fresh Vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop", itemCount: 48 },
  { id: "2", name: "Fresh Fruits", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop", itemCount: 35 },
  { id: "3", name: "Dairy & Eggs", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=400&fit=crop", itemCount: 24 },
  { id: "4", name: "Meat & Seafood", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop", itemCount: 42 },
];

//todo: remove mock functionality
const products = [
  { id: "1", name: "Organic Bananas", price: 2.99, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", unit: "lb", stock: 25 },
  { id: "2", name: "Fresh Strawberries", price: 4.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", unit: "lb", stock: 8 },
  { id: "3", name: "Roma Tomatoes", price: 3.49, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop", unit: "lb", stock: 18 },
  { id: "4", name: "Avocados", price: 1.99, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", unit: "each", stock: 30 },
];

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="p-4">
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
        <PromoBanner
          title="50% OFF Fresh Produce"
          description="Save big on organic fruits and vegetables this weekend only!"
          image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop"
          ctaText="Shop Now"
        />

        <section>
          <h2 className="font-semibold text-lg mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-4">Popular Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
