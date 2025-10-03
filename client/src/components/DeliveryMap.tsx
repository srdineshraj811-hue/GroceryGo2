import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface DeliveryMapProps {
  deliveryCount: number;
  onSetStartLocation: () => void;
}

export function DeliveryMap({ deliveryCount, onSetStartLocation }: DeliveryMapProps) {
  return (
    <Card className="relative h-[400px] overflow-hidden bg-muted">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground mb-4">
            Map integration will show {deliveryCount} delivery locations
          </p>
          <Button onClick={onSetStartLocation} data-testid="button-set-start-location">
            <Navigation className="h-4 w-4 mr-2" />
            Set Start Location
          </Button>
        </div>
      </div>
    </Card>
  );
}
