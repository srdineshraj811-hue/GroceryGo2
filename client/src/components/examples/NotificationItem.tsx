import { NotificationItem } from "../NotificationItem";

export default function NotificationItemExample() {
  return (
    <div className="max-w-md">
      <NotificationItem
        id="1"
        type="delivery"
        title="Driver is nearby"
        message="Your delivery driver will arrive in 15 minutes. Please be ready to receive your order."
        time="5 min ago"
        isRead={false}
      />
    </div>
  );
}
