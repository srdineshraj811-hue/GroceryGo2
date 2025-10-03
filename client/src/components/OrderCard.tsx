import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Clock } from "lucide-react";

interface OrderCardProps {
  id: string;
  orderNumber: string;
  date: string;
  status: "Placed" | "Processing" | "Shipped" | "Complete";
  itemCount: number;
  total: number;
  onViewDetails?: () => void;
  onReorder?: () => void;
  onRateOrder?: () => void;
}

const statusConfig = {
  Placed: { label: "Placed", color: "bg-chart-5 text-white" },
  Processing: { label: "Processing", color: "bg-chart-3 text-white" },
  Shipped: { label: "Shipped", color: "bg-primary text-primary-foreground" },
  Complete: { label: "Complete", color: "bg-chart-1 text-white" },
};

export function OrderCard({
  id,
  orderNumber,
  date,
  status,
  itemCount,
  total,
  onViewDetails,
  onReorder,
  onRateOrder,
}: OrderCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="p-4 hover-elevate cursor-pointer" data-testid={`card-order-${id}`} onClick={onViewDetails}>
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

      <div className="flex items-center justify-between pt-3 border-t">
        <div>
          <p className="text-sm text-muted-foreground">{itemCount} items</p>
          <p className="text-lg font-bold" data-testid={`text-total-${id}`}>
            ${total.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReorder}
            data-testid={`button-reorder-${id}`}
          >
            Reorder
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRateOrder}
            data-testid={`button-rate-order-${id}`}
          >
            Rate Order
          </Button>
        </div>
      </div>
    </Card>
  );
}
