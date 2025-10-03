import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Clock } from "lucide-react";

interface OrderCardProps {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "preparing" | "out_for_delivery" | "delivered";
  itemCount: number;
  total: number;
  deliveryTime?: string;
  proofImage?: string;
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-chart-5 text-white" },
  preparing: { label: "Preparing", color: "bg-chart-3 text-white" },
  out_for_delivery: { label: "Out for Delivery", color: "bg-primary text-primary-foreground" },
  delivered: { label: "Delivered", color: "bg-chart-1 text-white" },
};

export function OrderCard({
  id,
  orderNumber,
  date,
  status,
  itemCount,
  total,
  deliveryTime,
  proofImage,
}: OrderCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="p-4" data-testid={`card-order-${id}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold" data-testid={`text-order-number-${id}`}>
            Order #{orderNumber}
          </p>
          <p className="text-sm text-muted-foreground" data-testid={`text-order-date-${id}`}>
            {date}
          </p>
        </div>
        <Badge className={config.color} data-testid={`badge-status-${id}`}>
          {config.label}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span data-testid={`text-item-count-${id}`}>{itemCount} items</span>
        </div>
        {deliveryTime && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span data-testid={`text-delivery-time-${id}`}>{deliveryTime}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold" data-testid={`text-total-${id}`}>
            ${total.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2">
          {proofImage && (
            <Button variant="outline" size="sm" data-testid={`button-view-proof-${id}`}>
              View Proof
            </Button>
          )}
          <Button variant="outline" size="sm" data-testid={`button-view-details-${id}`}>
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
