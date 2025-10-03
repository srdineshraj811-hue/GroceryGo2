import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { CustomerBottomNav } from "@/components/CustomerBottomNav";
import CustomerHome from "@/pages/CustomerHome";
import CustomerOrders from "@/pages/CustomerOrders";
import CustomerSpecials from "@/pages/CustomerSpecials";
import CustomerNotifications from "@/pages/CustomerNotifications";
import CustomerCart from "@/pages/CustomerCart";
import CustomerCheckout from "@/pages/CustomerCheckout";
import DriverDashboard from "@/pages/DriverDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

function App() {
  const [role, setRole] = useState<string>("customer");
  const [activeTab, setActiveTab] = useState<string>("home");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const renderCustomerView = () => {
    switch (activeTab) {
      case "home":
        return <CustomerHome />;
      case "orders":
        return <CustomerOrders />;
      case "specials":
        return <CustomerSpecials />;
      case "notifications":
        return <CustomerNotifications />;
      case "cart":
        return <CustomerCart onProceedToCheckout={() => setActiveTab("checkout")} />;
      case "checkout":
        return <CustomerCheckout onBack={() => setActiveTab("cart")} />;
      default:
        return <CustomerHome />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <RoleSelector role={role} onRoleChange={setRole} />
          
          {role === "customer" && (
            <>
              {renderCustomerView()}
              <CustomerBottomNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                cartCount={3}
                notificationCount={2}
              />
            </>
          )}

          {role === "driver" && <DriverDashboard />}

          {role === "admin" && <AdminDashboard />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
