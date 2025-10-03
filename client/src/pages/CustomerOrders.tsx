import { OrderCard } from "@/components/OrderCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//todo: remove mock functionality
const orders = [
  {
    id: "1",
    orderNumber: "12345",
    date: "Mar 15, 2024",
    status: "out_for_delivery" as const,
    itemCount: 8,
    total: 45.99,
    deliveryTime: "2:00 PM - 3:00 PM",
    proofImage: "/proof.jpg"
  },
  {
    id: "2",
    orderNumber: "12344",
    date: "Mar 12, 2024",
    status: "delivered" as const,
    itemCount: 12,
    total: 67.50,
    proofImage: "/proof.jpg"
  },
  {
    id: "3",
    orderNumber: "12343",
    date: "Mar 10, 2024",
    status: "delivered" as const,
    itemCount: 6,
    total: 32.99,
    proofImage: "/proof.jpg"
  },
];

export default function CustomerOrders() {
  const currentOrders = orders.filter(o => o.status !== "delivered");
  const pastOrders = orders.filter(o => o.status === "delivered");

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
            currentOrders.map((order) => <OrderCard key={order.id} {...order} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No current orders</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4 space-y-4">
          {pastOrders.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
