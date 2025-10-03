import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

const mockOrderData = {
  id: "12345",
  status: "Shipped",
  createdAt: "2024-10-01T14:30:00",
  deliveryMode: "2 hour delivery",
  deliveryAddress: "123 Main St, Apt 4B, Dallas, TX 75201",
  items: [
    { id: "1", name: "Organic Bananas", quantity: 2, price: 2.99 },
    { id: "2", name: "Fresh Strawberries", quantity: 1, price: 4.99 },
    { id: "3", name: "Roma Tomatoes", quantity: 1, price: 3.49 },
  ],
  subtotal: 14.46,
  tax: 1.16,
  total: 15.62,
};

const statusSteps = [
  { label: "Order Placed", key: "Placed" },
  { label: "Processing", key: "Processing" },
  { label: "Shipped", key: "Shipped" },
  { label: "Complete", key: "Complete" },
];

export default function CustomerOrderDetail({ orderId, onBack }: OrderDetailProps) {
  const [order] = useState(mockOrderData);
  
  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

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

        <Card className="p-4">
          <h2 className="font-semibold text-lg mb-4">Items</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between"
                data-testid={`order-item-${item.id}`}
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator className="my-3" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span data-testid="text-order-total">${order.total.toFixed(2)}</span>
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
          <Button variant="outline" className="flex-1" data-testid="button-rate-order">
            Rate Order
          </Button>
        </div>
      </div>
    </div>
  );
}
