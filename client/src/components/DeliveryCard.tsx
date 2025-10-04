import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Package, Clock, Camera, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  availabilityStatus?: "available" | "unavailable";
  isPurchased?: boolean;
}

interface DeliveryCardProps {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  itemCount: number;
  items?: OrderItem[];
  scheduledTime: string;
  status: "pending" | "purchasing" | "in_progress" | "delivered";
  onStatusChange: (status: string) => void;
  onTakePhoto: () => void;
}

export function DeliveryCard({
  id,
  orderNumber,
  customerName,
  customerPhone,
  address,
  itemCount,
  items = [],
  scheduledTime,
  status,
  onStatusChange,
  onTakePhoto,
}: DeliveryCardProps) {
  const [showItems, setShowItems] = useState(false);

  return (
    <Card className="p-4" data-testid={`card-delivery-${id}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold" data-testid={`text-delivery-order-${id}`}>
            Order #{orderNumber}
          </p>
          <p className="text-sm text-muted-foreground">{customerName}</p>
        </div>
        <Badge
          className={
            status === "delivered"
              ? "bg-chart-1 text-white"
              : status === "in_progress"
              ? "bg-primary text-primary-foreground"
              : status === "purchasing"
              ? "bg-chart-2 text-white"
              : "bg-muted text-muted-foreground"
          }
          data-testid={`badge-delivery-status-${id}`}
        >
          {status === "delivered"
            ? "Delivered"
            : status === "in_progress"
            ? "In Progress"
            : status === "purchasing"
            ? "Purchasing"
            : "Pending"}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span className="flex-1" data-testid={`text-delivery-address-${id}`}>
            {address}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <a 
            href={`tel:${customerPhone}`}
            className="text-primary hover:underline"
            data-testid={`phone-delivery-${id}`}
          >
            {customerPhone}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span data-testid={`text-scheduled-time-${id}`}>{scheduledTime}</span>
        </div>
        
        <button
          onClick={() => setShowItems(!showItems)}
          className="flex items-center gap-2 text-sm w-full py-2 hover-elevate active-elevate-2 rounded-md"
          data-testid={`button-toggle-items-${id}`}
        >
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 text-left">{itemCount} items</span>
          {showItems ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {showItems && items.length > 0 && (
          <div className="ml-6 space-y-1 pt-2 border-t" data-testid={`order-items-${id}`}>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {status === "pending" && (
          <Button
            className="flex-1"
            onClick={() => onStatusChange("in_progress")}
            data-testid={`button-start-delivery-${id}`}
          >
            Start Delivery
          </Button>
        )}
        {status === "in_progress" && (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onTakePhoto}
              data-testid={`button-take-photo-${id}`}
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
            <Button
              className="flex-1"
              onClick={() => onStatusChange("delivered")}
              data-testid={`button-complete-delivery-${id}`}
            >
              Complete
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
