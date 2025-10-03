import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  onClick?: () => void;
}

export function CategoryCard({ id, name, image, itemCount, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer" 
      onClick={onClick}
      data-testid={`card-category-${id}`}
    >
      <div className="relative aspect-video bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
          <div className="flex items-center justify-between gap-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-0.5" data-testid={`text-category-name-${id}`}>
                {name}
              </h3>
              <p className="text-xs text-white/90" data-testid={`text-item-count-${id}`}>
                {itemCount} items
              </p>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          </div>
        </div>
      </div>
    </Card>
  );
}
