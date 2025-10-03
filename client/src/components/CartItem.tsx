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
    <div className="flex gap-3 py-4 border-b" data-testid={`cart-item-${id}`}>
      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2 mb-1">
          <h3 className="font-medium text-sm line-clamp-2 flex-1" data-testid={`text-cart-item-name-${id}`}>
            {name}
          </h3>
          <p className="font-bold text-sm flex-shrink-0" data-testid={`text-cart-item-total-${id}`}>
            ${(price * quantity).toFixed(2)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          ${price.toFixed(2)}/{unit}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              onClick={onDecrease}
              data-testid={`button-decrease-cart-${id}`}
            >
              <Minus />
            </Button>
            <span className="font-semibold min-w-[2rem] text-center text-sm" data-testid={`text-cart-quantity-${id}`}>
              {quantity}
            </span>
            <Button
              size="icon"
              onClick={onIncrease}
              data-testid={`button-increase-cart-${id}`}
            >
              <Plus />
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive ml-auto"
            onClick={onRemove}
            data-testid={`button-remove-cart-${id}`}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
