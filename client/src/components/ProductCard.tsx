import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Heart } from "lucide-react";
import { useState, type MouseEvent } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  stock: number;
  onAddToCart?: (id: string, quantity: number) => void;
  onWishlistToggle?: (id: string) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ id, name, price, image, unit, stock, onAddToCart, onWishlistToggle, isInWishlist = false }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onAddToCart?.(id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart?.(id, newQuantity);
    }
  };

  const handleWishlistToggle = (e: MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle?.(id);
  };

  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="relative aspect-square bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleWishlistToggle}
          data-testid={`button-wishlist-${id}`}
        >
          <Heart 
            className={`h-4 w-4 ${isInWishlist ? 'fill-primary text-primary' : ''}`}
          />
        </Button>
        {stock < 10 && stock > 0 && (
          <div className="absolute top-2 left-2 bg-chart-2 text-white text-xs px-2 py-1 rounded-md">
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
            + ADD
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
