import { NotificationItem } from "@/components/NotificationItem";
import { Button } from "@/components/ui/button";

//todo: remove mock functionality
const notifications = [
  {
    id: "1",
    type: "delivery" as const,
    title: "Driver is nearby",
    message: "Your delivery driver will arrive in 15 minutes. Please be ready to receive your order.",
    time: "5 min ago",
    isRead: false,
  },
  {
    id: "2",
    type: "delivered" as const,
    title: "Order delivered",
    message: "Your order #12344 has been delivered successfully. Thank you for shopping with us!",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "3",
    type: "promo" as const,
    title: "Weekend Special Offers",
    message: "Check out our amazing deals on fresh produce. Up to 50% off this weekend only!",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: "4",
    type: "order" as const,
    title: "Order confirmed",
    message: "Your order #12345 has been confirmed and is being prepared for delivery.",
    time: "2 days ago",
    isRead: true,
  },
];

export default function CustomerNotifications() {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 border-b p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display font-bold text-2xl">Notifications</h1>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" data-testid="button-mark-all-read">
              Mark all read
            </Button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="divide-y">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
}
