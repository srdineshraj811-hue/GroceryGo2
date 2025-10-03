import { ProductCard } from "../ProductCard";

export default function ProductCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <ProductCard
        id="1"
        name="Organic Bananas"
        price={2.99}
        image="https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop"
        unit="lb"
        stock={25}
      />
    </div>
  );
}
