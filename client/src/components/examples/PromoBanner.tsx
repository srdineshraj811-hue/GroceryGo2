import { PromoBanner } from "../PromoBanner";
import type { SpecialBanner } from "@shared/schema";

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

export default function PromoBannerExample() {
  return (
    <div className="p-4">
      <PromoBanner
        banners={mockBanners}
        onBannerClick={(banner) => console.log("Clicked:", banner)}
      />
    </div>
  );
}
