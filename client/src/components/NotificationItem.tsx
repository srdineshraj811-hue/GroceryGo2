import { Bell, Package, Truck, CheckCircle } from "lucide-react";

interface NotificationItemProps {
  id: string;
  type: "order" | "delivery" | "promo" | "delivered";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const iconMap = {
  order: Package,
  delivery: Truck,
  promo: Bell,
  delivered: CheckCircle,
};

export function NotificationItem({
  id,
  type,
  title,
  message,
  time,
  isRead,
}: NotificationItemProps) {
  const Icon = iconMap[type];

  return (
    <div
      className={`flex gap-3 p-4 hover-elevate active-elevate-2 cursor-pointer ${
        !isRead ? "bg-primary/5" : ""
      }`}
      data-testid={`notification-${id}`}
    >
      <div className={`p-2 rounded-full ${!isRead ? "bg-primary/10" : "bg-muted"} h-fit`}>
        <Icon className={`h-5 w-5 ${!isRead ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-sm" data-testid={`text-notification-title-${id}`}>
            {title}
          </h4>
          {!isRead && (
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-1" data-testid={`text-notification-message-${id}`}>
          {message}
        </p>
        <p className="text-xs text-muted-foreground" data-testid={`text-notification-time-${id}`}>
          {time}
        </p>
      </div>
    </div>
  );
}
