import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

//todo: remove mock functionality
const initialCartItems = [
  { id: "1", name: "Organic Bananas", price: 2.99, quantity: 2, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", unit: "lb" },
  { id: "2", name: "Fresh Strawberries", price: 4.99, quantity: 1, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", unit: "lb" },
  { id: "3", name: "Roma Tomatoes", price: 3.49, quantity: 1, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop", unit: "lb" },
];

const TAX_RATE = 0.08;

interface CustomerCartProps {
  onProceedToCheckout?: () => void;
}

export default function CustomerCart({ onProceedToCheckout }: CustomerCartProps) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleIncrease = (id: string) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id: string) => {
    setCartItems(items => items.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
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
