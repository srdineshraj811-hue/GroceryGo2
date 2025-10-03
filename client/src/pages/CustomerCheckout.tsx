import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const TAX_RATE = 0.08;

interface CustomerCheckoutProps {
  onBack?: () => void;
}

const mockCartItems = [
  { id: "1", name: "Organic Bananas", price: 2.99, quantity: 2 },
  { id: "2", name: "Fresh Strawberries", price: 4.99, quantity: 1 },
  { id: "3", name: "Roma Tomatoes", price: 3.49, quantity: 1 },
];

export default function CustomerCheckout({ onBack }: CustomerCheckoutProps) {
  const [deliveryMode, setDeliveryMode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [applyRewards, setApplyRewards] = useState<boolean>(false);

  const rewardsBalance = 15.50;
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const rewardsDiscount = applyRewards ? Math.min(rewardsBalance, subtotal) : 0;
  const total = subtotal + tax - rewardsDiscount;

  const handlePlaceOrder = () => {
    console.log("Order placed:", { deliveryMode, address, total });
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back-to-cart"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="font-display font-bold text-2xl" data-testid="text-checkout-title">
            Checkout
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card className="p-4">
          <Label htmlFor="delivery-mode" className="text-base font-semibold mb-3 block">
            Delivery Mode
          </Label>
          <Select value={deliveryMode} onValueChange={setDeliveryMode}>
            <SelectTrigger id="delivery-mode" data-testid="select-delivery-mode">
              <SelectValue placeholder="Select delivery mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery" data-testid="option-delivery">Delivery</SelectItem>
              <SelectItem value="2hour" data-testid="option-2hour">2 hour delivery</SelectItem>
              <SelectItem value="pickup" data-testid="option-pickup">Pickup</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-4">
          <Label htmlFor="address" className="text-base font-semibold mb-3 block">
            Address
          </Label>
          <Input
            id="address"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            data-testid="input-address"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Label className="text-base font-semibold">MHG Rewards</Label>
              <p className="text-sm text-muted-foreground">
                Available balance: ${rewardsBalance.toFixed(2)}
              </p>
            </div>
            <Switch
              checked={applyRewards}
              onCheckedChange={setApplyRewards}
              data-testid="switch-apply-rewards"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
              <span data-testid="text-tax">${tax.toFixed(2)}</span>
            </div>
            {rewardsDiscount > 0 && (
              <div className="flex justify-between text-sm text-primary">
                <span>Rewards Applied</span>
                <span data-testid="text-rewards-discount">-${rewardsDiscount.toFixed(2)}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span data-testid="text-total">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handlePlaceOrder}
            disabled={!deliveryMode || !address}
            data-testid="button-pay-place-order"
          >
            Pay & Place Order
          </Button>
        </Card>
      </div>
    </div>
  );
}
