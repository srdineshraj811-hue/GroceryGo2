import { DeliveryMap } from "@/components/DeliveryMap";
import { DeliveryCard } from "@/components/DeliveryCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useMemo } from "react";
import { Menu, ShoppingCart, Package, History, Clock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type PurchaseFilterType = "order" | "items";
type DateFilterType = "today" | "tomorrow" | "custom";

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
    deliveryDate: "today",
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
    deliveryDate: "today",
    status: "pending" as const,
  },
  {
    id: "3",
    orderNumber: "12347",
    customerName: "Bob Miller",
    customerPhone: "+1 (555) 234-5678",
    address: "789 Maple Dr, Dallas, TX 75203",
    itemCount: 6,
    items: [
      { id: "1", name: "Chicken Breast", quantity: 2, price: 17.98 },
      { id: "2", name: "Organic Bananas", quantity: 1, price: 2.99 },
      { id: "3", name: "Bell Peppers", quantity: 3, price: 5.37 },
    ],
    scheduledTime: "1:00 PM - 2:00 PM",
    deliveryDate: "tomorrow",
    status: "pending" as const,
  },
];

const pastDeliveries = [
  {
    id: "past-1",
    orderNumber: "12320",
    customerName: "Sarah Johnson",
    address: "789 Elm St, Dallas, TX 75203",
    itemCount: 6,
    deliveredAt: "Yesterday, 3:45 PM",
    status: "complete" as const,
  },
  {
    id: "past-2",
    orderNumber: "12315",
    customerName: "Mike Williams",
    address: "321 Pine Ave, Dallas, TX 75204",
    itemCount: 4,
    deliveredAt: "Yesterday, 2:30 PM",
    status: "complete" as const,
  },
];

export default function ShopperDashboard() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [purchaseFilter, setPurchaseFilter] = useState<PurchaseFilterType>("order");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("today");
  const [showPastDeliveries, setShowPastDeliveries] = useState(false);

  const handleStatusChange = (id: string, newStatus: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: newStatus as any } : d
    ));
    console.log(`Delivery ${id} status changed to ${newStatus}`);
  };

  const handleTakePhoto = () => {
    console.log("Opening camera for proof of delivery");
  };

  const sortedDeliveries = useMemo(() => {
    const filtered = deliveries.filter(delivery => {
      if (dateFilter === "custom") return true;
      return delivery.deliveryDate === dateFilter;
    });
    
    return [...filtered].sort((a, b) => {
      const timeA = a.scheduledTime.split(' - ')[0];
      const timeB = b.scheduledTime.split(' - ')[0];
      
      const parseTime = (timeStr: string) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) {
          hours += 12;
        } else if (period === 'AM' && hours === 12) {
          hours = 0;
        }
        
        return hours * 60 + minutes;
      };
      
      return parseTime(timeA) - parseTime(timeB);
    });
  }, [deliveries, dateFilter]);

  const purchaseList = useMemo(() => {
    const items = sortedDeliveries.flatMap((delivery, deliveryIndex) =>
      (delivery.items || []).map(item => ({
        ...item,
        deliveryId: delivery.id,
        deliveryOrder: deliveryIndex + 1,
        orderNumber: delivery.orderNumber,
        customerName: delivery.customerName,
        itemKey: `${delivery.id}-${item.id}`,
      }))
    );
    
    if (purchaseFilter === "items") {
      const groupedByName: Record<string, typeof items> = {};
      items.forEach(item => {
        if (!groupedByName[item.name]) {
          groupedByName[item.name] = [];
        }
        groupedByName[item.name].push(item);
      });
      
      return Object.entries(groupedByName).map(([itemName, groupItems]) => {
        const totalQuantity = groupItems.reduce((sum, item) => sum + item.quantity, 0);
        const firstItem = groupItems[0];
        const allPurchased = groupItems.every(gi => purchasedItems[gi.itemKey]);
        const anyPurchased = groupItems.some(gi => purchasedItems[gi.itemKey]);
        
        return {
          ...firstItem,
          quantity: totalQuantity,
          itemKey: `grouped-${itemName}`,
          groupedItems: groupItems,
          isGroupedPurchased: allPurchased,
        };
      });
    }
    
    return items;
  }, [sortedDeliveries, purchaseFilter, purchasedItems]);

  const handleTogglePurchased = (itemKey: string, groupedItems?: any[]) => {
    if (groupedItems) {
      const allChecked = groupedItems.every(gi => purchasedItems[gi.itemKey]);
      const newState = !allChecked;
      setPurchasedItems(prev => {
        const updated = { ...prev };
        groupedItems.forEach(gi => {
          updated[gi.itemKey] = newState;
        });
        return updated;
      });
    } else {
      setPurchasedItems(prev => ({
        ...prev,
        [itemKey]: !prev[itemKey]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={showPastDeliveries} onOpenChange={setShowPastDeliveries}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>View past deliveries and settings</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <History className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold">Past Deliveries</h3>
                    </div>
                    <div className="space-y-3">
                      {pastDeliveries.map((delivery) => (
                        <Card key={delivery.id} className="p-3" data-testid={`past-delivery-${delivery.id}`}>
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">Order #{delivery.orderNumber}</p>
                              <p className="text-sm text-muted-foreground">{delivery.customerName}</p>
                              <p className="text-xs text-muted-foreground">{delivery.deliveredAt}</p>
                              <p className="text-xs text-muted-foreground">{delivery.itemCount} items</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="font-display font-bold text-xl">Shopper Dashboard</h1>
              <p className="text-sm text-muted-foreground">{deliveries.length} deliveries today</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <DeliveryMap 
          deliveryCount={sortedDeliveries.length}
          onSetStartLocation={() => console.log("Setting start location")}
        />

        <Tabs defaultValue="purchase" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="purchase" className="flex-1 gap-2" data-testid="tab-purchase">
              <ShoppingCart className="h-4 w-4" />
              Items to Purchase
            </TabsTrigger>
            <TabsTrigger value="deliveries" className="flex-1 gap-2" data-testid="tab-deliveries">
              <Package className="h-4 w-4" />
              Deliveries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchase" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-semibold text-lg">Shopping List</h2>
                <div className="flex items-center gap-3">
                  <Select value={purchaseFilter} onValueChange={(v) => setPurchaseFilter(v as PurchaseFilterType)}>
                    <SelectTrigger className="w-[140px]" data-testid="select-purchase-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">By Order #</SelectItem>
                      <SelectItem value="items">By Items</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilterType)}>
                    <SelectTrigger className="w-[140px]" data-testid="select-date-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="custom">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{purchaseList.length} {purchaseFilter === "items" ? "unique items" : "items"}</p>
              
              {purchaseList.map((item, index) => {
                const itemKey = (item as any).itemKey;
                const groupedItems = (item as any).groupedItems;
                const isGroupedPurchased = (item as any).isGroupedPurchased;
                const isPurchased = groupedItems ? isGroupedPurchased : purchasedItems[itemKey];
                
                return (
                  <Card
                    key={itemKey}
                    className={`p-4 cursor-pointer transition-opacity ${isPurchased ? 'opacity-50' : 'opacity-100'}`}
                    data-testid={`purchase-item-${itemKey}`}
                    onClick={() => handleTogglePurchased(itemKey, groupedItems)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isPurchased}
                        onCheckedChange={() => handleTogglePurchased(itemKey, groupedItems)}
                        className="mt-1 pointer-events-none"
                        data-testid={`checkbox-purchased-${itemKey}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`font-medium ${isPurchased ? 'line-through' : ''}`}>
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                            {purchaseFilter === "order" && (
                              <>
                                <p className="text-sm text-muted-foreground">
                                  Order #{item.orderNumber}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Delivery #{item.deliveryOrder} • {item.customerName}
                                </p>
                              </>
                            )}
                            {purchaseFilter === "items" && groupedItems && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {groupedItems.length} order{groupedItems.length > 1 ? 's' : ''}: {groupedItems.map((gi: any) => `#${gi.orderNumber}`).join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="deliveries" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-semibold text-lg">Delivery Route</h2>
                <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilterType)}>
                  <SelectTrigger className="w-[140px]" data-testid="select-delivery-date-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="custom">Custom Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">Optimized by route</p>
              {sortedDeliveries.map((delivery, index) => (
                <div key={delivery.id}>
                  <p className="text-sm text-muted-foreground mb-2">Stop #{index + 1}</p>
                  <DeliveryCard
                    {...delivery}
                    onStatusChange={(status) => handleStatusChange(delivery.id, status)}
                    onTakePhoto={handleTakePhoto}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
