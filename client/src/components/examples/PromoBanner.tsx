import { PromoBanner } from "../PromoBanner";

export default function PromoBannerExample() {
  return (
    <div className="p-4">
      <PromoBanner
        title="50% OFF Fresh Produce"
        description="Save big on organic fruits and vegetables this weekend only!"
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop"
        ctaText="Shop Now"
      />
    </div>
  );
}
