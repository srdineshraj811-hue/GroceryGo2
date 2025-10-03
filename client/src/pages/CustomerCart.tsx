import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Clock } from "lucide-react";
import { useState } from "react";

//todo: remove mock functionality
const initialCartItems = [
  { id: "1", name: "Organic Bananas", price: 2.99, quantity: 2, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", unit: "lb" },
  { id: "2", name: "Fresh Strawberries", price: 4.99, quantity: 1, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", unit: "lb" },
  { id: "3", name: "Roma Tomatoes", price: 3.49, quantity: 1, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop", unit: "lb" },
];

//todo: remove mock functionality
const coupons = [
  { id: "1", code: "FRESH10", discount: 10, description: "10% off your order" },
  { id: "2", code: "SAVE5", discount: 5, description: "$5 off orders over $30" },
];

//todo: remove mock functionality
const deliverySlots = [
  "Today 2:00 PM - 3:00 PM",
  "Today 4:00 PM - 5:00 PM",
  "Tomorrow 10:00 AM - 11:00 AM",
  "Tomorrow 2:00 PM - 3:00 PM",
];

export default function CustomerCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = selectedCoupon === "1" ? subtotal * 0.1 : selectedCoupon === "2" ? 5 : 0;
  const total = subtotal - discount;

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
        <h1 className="font-display font-bold text-2xl">Cart</h1>
        <p className="text-sm text-muted-foreground">{cartItems.length} items</p>
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
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Available Coupons</h3>
            </div>
            <RadioGroup value={selectedCoupon} onValueChange={setSelectedCoupon}>
              {coupons.map((coupon) => (
                <div key={coupon.id} className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value={coupon.id} id={coupon.id} data-testid={`radio-coupon-${coupon.id}`} />
                  <Label htmlFor={coupon.id} className="flex-1 cursor-pointer">
                    <span className="font-medium">{coupon.code}</span>
                    <span className="text-sm text-muted-foreground ml-2">{coupon.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Delivery Time</h3>
            </div>
            <Select value={deliverySlot} onValueChange={setDeliverySlot}>
              <SelectTrigger data-testid="select-delivery-slot">
                <SelectValue placeholder="Select delivery time" />
              </SelectTrigger>
              <SelectContent>
                {deliverySlots.map((slot, index) => (
                  <SelectItem key={index} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-chart-1">
                  <span>Discount</span>
                  <span data-testid="text-discount">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span data-testid="text-total">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              disabled={!deliverySlot}
              data-testid="button-checkout"
            >
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button data-testid="button-start-shopping">Start Shopping</Button>
        </div>
      )}
    </div>
  );
}
