import { DeliveryMap } from "@/components/DeliveryMap";
import { DeliveryCard } from "@/components/DeliveryCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

//todo: remove mock functionality
const initialDeliveries = [
  {
    id: "1",
    orderNumber: "12345",
    customerName: "John Doe",
    customerPhone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B, Dallas, TX 75201",
    itemCount: 8,
    items: [
      { id: "1", name: "Organic Bananas", quantity: 2, price: 5.98 },
      { id: "2", name: "Fresh Strawberries", quantity: 1, price: 4.99 },
      { id: "3", name: "Roma Tomatoes", quantity: 3, price: 10.47 },
      { id: "4", name: "Avocados", quantity: 4, price: 7.96 },
      { id: "5", name: "Whole Milk", quantity: 1, price: 3.99 },
    ],
    scheduledTime: "2:00 PM - 3:00 PM",
    status: "pending" as const,
  },
  {
    id: "2",
    orderNumber: "12346",
    customerName: "Jane Smith",
    customerPhone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Dallas, TX 75202",
    itemCount: 5,
    items: [
      { id: "1", name: "Greek Yogurt", quantity: 2, price: 7.98 },
      { id: "2", name: "Fresh Salmon", quantity: 1, price: 12.99 },
      { id: "3", name: "Mixed Greens", quantity: 1, price: 3.49 },
      { id: "4", name: "Sourdough Bread", quantity: 1, price: 5.99 },
    ],
    scheduledTime: "3:00 PM - 4:00 PM",
    status: "pending" as const,
  },
];

export default function DriverDashboard() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const handleStatusChange = (id: string, newStatus: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: newStatus as any } : d
    ));
    console.log(`Delivery ${id} status changed to ${newStatus}`);
  };

  const handleTakePhoto = () => {
    console.log("Opening camera for proof of delivery");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-xl">Driver Dashboard</h1>
              <p className="text-sm text-muted-foreground">{deliveries.length} deliveries today</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <DeliveryMap 
          deliveryCount={deliveries.length}
          onSetStartLocation={() => console.log("Setting start location")}
        />

        <div>
          <h2 className="font-semibold text-lg mb-4">Today's Deliveries</h2>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <DeliveryCard
                key={delivery.id}
                {...delivery}
                onStatusChange={(status) => handleStatusChange(delivery.id, status)}
                onTakePhoto={handleTakePhoto}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
