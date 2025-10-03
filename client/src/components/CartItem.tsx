import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  unit,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b" data-testid={`cart-item-${id}`}>
      <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2 mb-1" data-testid={`text-cart-item-name-${id}`}>
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          ${price.toFixed(2)}/{unit}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={onDecrease}
              data-testid={`button-decrease-cart-${id}`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-semibold min-w-[2rem] text-center" data-testid={`text-cart-quantity-${id}`}>
              {quantity}
            </span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={onIncrease}
              data-testid={`button-increase-cart-${id}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive"
            onClick={onRemove}
            data-testid={`button-remove-cart-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold" data-testid={`text-cart-item-total-${id}`}>
          ${(price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
