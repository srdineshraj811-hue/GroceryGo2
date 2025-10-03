import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  stock: number;
}

export function ProductCard({ id, name, price, image, unit, stock }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      console.log(`Added ${name} to cart`);
    }
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      console.log(`Removed ${name} from cart`);
    }
  };

  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="relative aspect-square bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {stock < 10 && stock > 0 && (
          <div className="absolute top-2 right-2 bg-chart-2 text-white text-xs px-2 py-1 rounded-md">
            Low Stock
          </div>
        )}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 mb-1" data-testid={`text-product-name-${id}`}>
          {name}
        </h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-lg font-bold" data-testid={`text-price-${id}`}>
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">/{unit}</span>
        </div>
        {quantity === 0 ? (
          <Button
            size="sm"
            className="w-full"
            onClick={handleAdd}
            disabled={stock === 0}
            data-testid={`button-add-${id}`}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={handleRemove}
              data-testid={`button-decrease-${id}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold min-w-[2rem] text-center" data-testid={`text-quantity-${id}`}>
              {quantity}
            </span>
            <Button
              size="icon"
              onClick={handleAdd}
              disabled={quantity >= stock}
              data-testid={`button-increase-${id}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
