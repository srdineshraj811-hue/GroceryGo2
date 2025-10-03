import { CategoryCard } from "../CategoryCard";

export default function CategoryCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <CategoryCard
        id="1"
        name="Fresh Vegetables"
        image="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop"
        itemCount={48}
      />
    </div>
  );
}
