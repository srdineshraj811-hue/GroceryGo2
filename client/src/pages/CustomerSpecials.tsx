import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { PromoBanner } from "@/components/PromoBanner";
import type { SpecialBanner } from "@shared/schema";

//todo: remove mock functionality
const specialBanners: SpecialBanner[] = [
  {
    id: "sp1",
    title: "Weekend Sale - Up to 50% OFF!",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
    linkUrl: "/specials",
    sortOrder: 0,
    isActive: true,
  },
  {
    id: "sp2",
    title: "Fresh Produce Special",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=400&fit=crop",
    linkUrl: "/specials",
    sortOrder: 1,
    isActive: true,
  },
];

const specialProducts = [
  { id: "1", name: "Organic Bananas", price: 1.99, originalPrice: 2.99, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", unit: "lb", stock: 25, discount: "33% OFF" },
  { id: "2", name: "Fresh Strawberries", price: 3.49, originalPrice: 4.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", unit: "lb", stock: 8, discount: "30% OFF" },
  { id: "3", name: "Whole Milk Gallon", price: 2.99, originalPrice: 4.49, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop", unit: "gal", stock: 15, discount: "33% OFF" },
  { id: "4", name: "Fresh Salmon Fillet", price: 8.99, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&h=400&fit=crop", unit: "lb", stock: 10, discount: "31% OFF" },
];

export default function CustomerSpecials() {
  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <h1 className="font-display font-bold text-2xl mb-2">Special Offers</h1>
        <p className="text-sm text-muted-foreground">Limited time deals on fresh products</p>
      </div>

      <div className="p-4 space-y-6">
        <PromoBanner banners={specialBanners} />

        <div className="grid grid-cols-2 gap-4">
          {specialProducts.map((product) => (
            <div key={product.id} className="relative">
              <Badge className="absolute -top-2 left-2 z-10 bg-chart-2 text-white">
                {product.discount}
              </Badge>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
