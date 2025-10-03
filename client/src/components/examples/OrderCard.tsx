import { OrderCard } from "../OrderCard";

export default function OrderCardExample() {
  return (
    <div className="p-4 max-w-md">
      <OrderCard
        id="1"
        orderNumber="12345"
        date="Mar 15, 2024"
        status="out_for_delivery"
        itemCount={8}
        total={45.99}
        deliveryTime="2:00 PM - 3:00 PM"
        proofImage="/proof.jpg"
      />
    </div>
  );
}
