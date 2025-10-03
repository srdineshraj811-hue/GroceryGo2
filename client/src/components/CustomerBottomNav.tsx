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
    { id: "notifications", label: "Notifications", icon: Bell, badge: notificationCount },
    { id: "cart", label: "Cart", icon: ShoppingCart, badge: cartCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-50 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 flex-1 min-w-0 hover-elevate active-elevate-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`button-nav-${tab.id}`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {tab.badge && tab.badge > 0 ? (
                  <div
                    className="absolute -top-1 -right-1 h-4 min-w-[1rem] px-1 flex items-center justify-center bg-destructive text-white text-[10px] font-semibold rounded-full"
                    data-testid={`badge-${tab.id}-count`}
                  >
                    {tab.badge}
                  </div>
                ) : null}
              </div>
              <span className={`text-[10px] leading-tight ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
