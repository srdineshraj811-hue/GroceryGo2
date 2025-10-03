import { Home, Package, Tag, Bell, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CustomerBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
  notificationCount?: number;
}

export function CustomerBottomNav({
  activeTab,
  onTabChange,
  cartCount = 0,
  notificationCount = 0,
}: CustomerBottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "orders", label: "Orders", icon: Package },
    { id: "specials", label: "Specials", icon: Tag },
    { id: "notifications", label: "Alerts", icon: Bell, badge: notificationCount },
    { id: "cart", label: "Cart", icon: ShoppingCart, badge: cartCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-3 px-4 flex-1 hover-elevate active-elevate-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`button-nav-${tab.id}`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {tab.badge && tab.badge > 0 ? (
                  <Badge
                    className="absolute -top-2 -right-2 h-4 min-w-[1rem] px-1 flex items-center justify-center bg-destructive text-white text-xs"
                    data-testid={`badge-${tab.id}-count`}
                  >
                    {tab.badge}
                  </Badge>
                ) : null}
              </div>
              <span className={`text-xs ${isActive ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
