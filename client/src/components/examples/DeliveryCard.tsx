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
        itemCount={8}
        scheduledTime="2:00 PM - 3:00 PM"
        status={status}
        onStatusChange={(newStatus) => setStatus(newStatus as any)}
        onTakePhoto={() => console.log("Taking photo")}
      />
    </div>
  );
}
