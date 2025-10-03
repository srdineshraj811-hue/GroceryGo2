import { OrderCard } from "@/components/OrderCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CustomerOrderDetail from "./CustomerOrderDetail";
import { useState } from "react";

//todo: remove mock functionality
const orders = [
  {
    id: "1",
    orderNumber: "12345",
    date: "Mar 15, 2024 2:30 PM",
    status: "Shipped" as const,
    itemCount: 8,
    total: 45.99,
  },
  {
    id: "2",
    orderNumber: "12344",
    date: "Mar 12, 2024 1:15 PM",
    status: "Complete" as const,
    itemCount: 12,
    total: 67.50,
  },
  {
    id: "3",
    orderNumber: "12343",
    date: "Mar 10, 2024 11:45 AM",
    status: "Complete" as const,
    itemCount: 6,
    total: 32.99,
  },
  {
    id: "4",
    orderNumber: "12342",
    date: "Mar 8, 2024 3:20 PM",
    status: "Processing" as const,
    itemCount: 5,
    total: 28.75,
  },
];

export default function CustomerOrders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const currentOrders = orders.filter(o => o.status !== "Complete");
  const pastOrders = orders.filter(o => o.status === "Complete");

  const handleReorder = (orderId: string) => {
    console.log("Reorder:", orderId);
  };

  const handleRateOrder = (orderId: string) => {
    console.log("Rate order:", orderId);
  };

  if (selectedOrderId) {
    return (
      <CustomerOrderDetail
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <h1 className="font-display font-bold text-2xl">My Orders</h1>
      </div>

      <Tabs defaultValue="current" className="p-4">
        <TabsList className="w-full">
          <TabsTrigger value="current" className="flex-1" data-testid="tab-current-orders">
            Current
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1" data-testid="tab-past-orders">
            Past Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4 space-y-4">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderCard
                key={order.id}
                {...order}
                onViewDetails={() => setSelectedOrderId(order.id)}
                onReorder={() => handleReorder(order.id)}
                onRateOrder={() => handleRateOrder(order.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No current orders</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4 space-y-4">
          {pastOrders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
              onViewDetails={() => setSelectedOrderId(order.id)}
              onReorder={() => handleReorder(order.id)}
              onRateOrder={() => handleRateOrder(order.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
