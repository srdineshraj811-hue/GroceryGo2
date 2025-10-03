import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const TAX_RATE = 0.08;

interface CustomerCartProps {
  onProceedToCheckout?: () => void;
}

export default function CustomerCart({ onProceedToCheckout }: CustomerCartProps) {
  const { items: cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleIncrease = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <h1 className="font-display font-bold text-2xl" data-testid="text-cart-title">My Cart</h1>
        {cartItems.length > 0 && (
          <p className="text-sm text-muted-foreground">{cartItems.length} items</p>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="p-4 space-y-6">
          <div>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>

          <Card className="p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span>
                <span data-testid="text-tax">${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span data-testid="text-total">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={onProceedToCheckout}
              data-testid="button-proceed-to-pay"
            >
              Proceed to Pay
            </Button>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4" data-testid="text-empty-cart">Your cart is empty</p>
          <Button data-testid="button-start-shopping">Start Shopping</Button>
        </div>
      )}
    </div>
  );
}
