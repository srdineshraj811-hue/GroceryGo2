import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { RateOrderDialog } from "@/components/RateOrderDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { allProducts, Product } from "@/data/products";

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  availabilityStatus?: "available" | "unavailable" | "replaced";
  replacementProductId?: string;
  replacementProductName?: string;
  replacementPrice?: number;
  categoryId?: string;
}

const mockOrderData = {
  id: "12345",
  status: "Purchasing",
  createdAt: "2024-10-01T14:30:00",
  deliveryMode: "2 hour delivery",
  deliveryAddress: "123 Main St, Apt 4B, Dallas, TX 75201",
  items: [
    { 
      id: "1", 
      name: "Organic Bananas", 
      quantity: 2, 
      price: 2.99,
      availabilityStatus: "available" as const,
      categoryId: "fresh-produce",
    },
    { 
      id: "2", 
      name: "Fresh Strawberries", 
      quantity: 1, 
      price: 4.99,
      availabilityStatus: "unavailable" as const,
      categoryId: "fresh-produce",
    },
    { 
      id: "3", 
      name: "Roma Tomatoes", 
      quantity: 1, 
      price: 3.49,
      availabilityStatus: "available" as const,
      categoryId: "fresh-produce",
    },
  ] as OrderItem[],
  subtotal: 14.46,
  tax: 1.16,
  total: 15.62,
};

const statusSteps = [
  { label: "Order Placed", key: "Order Placed" },
  { label: "Purchasing", key: "Purchasing" },
  { label: "Out for Delivery", key: "Out for Delivery" },
  { label: "Complete", key: "Complete" },
];

export default function CustomerOrderDetail({ orderId, onBack }: OrderDetailProps) {
  const [order, setOrder] = useState(mockOrderData);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const { toast } = useToast();
  
  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);
  const unavailableItems = order.items.filter((item: OrderItem) => item.availabilityStatus === "unavailable");
  const isPurchasing = order.status === "Purchasing";

  const calculateTotals = () => {
    const subtotal = order.items.reduce((sum, item) => {
      const effectivePrice = item.availabilityStatus === "replaced" 
        ? (item.replacementPrice || item.price) 
        : item.price;
      return sum + (effectivePrice * item.quantity);
    }, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const totals = calculateTotals();

  const handleSelectReplacement = (itemId: string, replacementId: string) => {
    const replacement = allProducts.find(p => p.id === replacementId);
    if (!replacement) return;

    setOrder(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? {
              ...item,
              availabilityStatus: "replaced" as const,
              replacementProductId: replacement.id,
              replacementProductName: replacement.name,
              replacementPrice: replacement.price,
            }
          : item
      ),
    }));

    toast({
      title: "Replacement Selected",
      description: `${replacement.name} will be delivered instead.`,
    });
  };

  const handleSubmitRating = (rating: number, review: string) => {
    console.log("Rating submitted:", { orderId: order.id, rating, review });
    toast({
      title: "Rating Submitted",
      description: "Thank you for your feedback!",
    });
    setShowRatingDialog(false);
  };

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return "completed";
    if (index === currentStepIndex) return "current";
    return "pending";
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back-to-orders"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-2xl" data-testid="text-order-id">
              Order #{order.id}
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Order Status</h2>
            <Badge
              variant={order.status === "Complete" ? "default" : "secondary"}
              data-testid="badge-order-status"
            >
              {order.status}
            </Badge>
          </div>

          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const status = getStepStatus(index);
              const isLast = index === statusSteps.length - 1;

              return (
                <div key={step.key} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          status === "completed"
                            ? "bg-primary border-primary text-primary-foreground"
                            : status === "current"
                            ? "bg-background border-primary text-primary"
                            : "bg-background border-border text-muted-foreground"
                        }`}
                        data-testid={`step-${step.key.toLowerCase()}`}
                      >
                        {status === "completed" ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 h-12 mt-1 ${
                            status === "completed" ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p
                        className={`font-medium ${
                          status === "pending" ? "text-muted-foreground" : ""
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {isPurchasing && unavailableItems.length > 0 && (
          <Alert variant="destructive" data-testid="alert-unavailable-items">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {unavailableItems.length} {unavailableItems.length === 1 ? 'item is' : 'items are'} currently unavailable. Please select replacements below.
            </AlertDescription>
          </Alert>
        )}

        <Card className="p-4">
          <h2 className="font-semibold text-lg mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => {
              const isUnavailable = item.availabilityStatus === "unavailable";
              const isReplaced = item.availabilityStatus === "replaced";
              const categoryProducts = allProducts.filter(
                (p: Product) => p.categoryId === item.categoryId && p.name !== item.name
              );

              return (
                <div
                  key={item.id}
                  className="space-y-3"
                  data-testid={`order-item-${item.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-medium ${isUnavailable ? 'line-through text-muted-foreground' : ''}`}>
                          {item.name}
                        </p>
                        {isUnavailable && (
                          <Badge variant="destructive" data-testid={`badge-unavailable-${item.id}`}>
                            Unavailable
                          </Badge>
                        )}
                        {isReplaced && (
                          <Badge variant="secondary" data-testid={`badge-replaced-${item.id}`}>
                            Replaced
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      
                      {isReplaced && item.replacementProductName && (
                        <div className="mt-2 p-2 bg-muted rounded-md" data-testid={`replacement-info-${item.id}`}>
                          <p className="text-sm font-medium text-primary">
                            Replacement: {item.replacementProductName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.replacementPrice?.toFixed(2)} × {item.quantity} = ${((item.replacementPrice || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                    <p className={`font-semibold ${isUnavailable ? 'line-through text-muted-foreground' : ''}`}>
                      ${((isReplaced ? (item.replacementPrice || item.price) : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {isPurchasing && isUnavailable && categoryProducts.length > 0 && (
                    <div className="pl-4 border-l-2 border-destructive space-y-2">
                      <p className="text-sm font-medium">Select a replacement:</p>
                      <Select onValueChange={(value) => handleSelectReplacement(item.id, value)}>
                        <SelectTrigger className="w-full" data-testid={`select-replacement-${item.id}`}>
                          <SelectValue placeholder="Choose replacement item" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryProducts.slice(0, 5).map((product) => (
                            <SelectItem 
                              key={product.id} 
                              value={product.id}
                              data-testid={`replacement-option-${product.id}`}
                            >
                              {product.name} - ${product.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              );
            })}
            <Separator className="my-3" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span data-testid="text-subtotal">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span data-testid="text-tax">${totals.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span data-testid="text-order-total">${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-lg mb-3">Delivery Information</h2>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Delivery Mode</p>
              <p className="font-medium">{order.deliveryMode}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium" data-testid="text-delivery-address">
                {order.deliveryAddress}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" data-testid="button-reorder">
            Reorder
          </Button>
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => setShowRatingDialog(true)}
            disabled={order.status !== "Complete"}
            data-testid="button-rate-order"
          >
            Rate Order
          </Button>
        </div>
      </div>

      <RateOrderDialog
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        orderNumber={order.id}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}
