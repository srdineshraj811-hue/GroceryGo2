import { DeliveryCard } from "../DeliveryCard";
import { useState } from "react";

export default function DeliveryCardExample() {
  const [status, setStatus] = useState<"pending" | "in_progress" | "delivered">("pending");

  return (
    <div className="p-4 max-w-md">
      <DeliveryCard
        id="1"
        orderNumber="12345"
        customerName="John Doe"
        customerPhone="+1 (555) 123-4567"
        address="123 Main St, Apt 4B, Dallas, TX 75201"
        itemCount={5}
        items={[
          { id: "1", name: "Organic Bananas", quantity: 2, price: 5.98 },
          { id: "2", name: "Fresh Strawberries", quantity: 1, price: 4.99 },
          { id: "3", name: "Roma Tomatoes", quantity: 3, price: 10.47 },
          { id: "4", name: "Avocados", quantity: 4, price: 7.96 },
          { id: "5", name: "Whole Milk", quantity: 1, price: 3.99 },
        ]}
        scheduledTime="2:00 PM - 3:00 PM"
        status={status}
        onStatusChange={(newStatus) => setStatus(newStatus as any)}
        onTakePhoto={() => console.log("Taking photo")}
      />
    </div>
  );
}
