import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { CustomerBottomNav } from "@/components/CustomerBottomNav";
import { CartProvider, useCart } from "@/contexts/CartContext";
import CustomerHome from "@/pages/CustomerHome";
import CustomerOrders from "@/pages/CustomerOrders";
import CustomerSpecials from "@/pages/CustomerSpecials";
import CustomerNotifications from "@/pages/CustomerNotifications";
import CustomerCart from "@/pages/CustomerCart";
import CustomerCheckout from "@/pages/CustomerCheckout";
import CustomerWishlist from "@/pages/CustomerWishlist";
import DriverDashboard from "@/pages/DriverDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

function CustomerView() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const { uniqueItemCount } = useCart();

  const renderView = () => {
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
    <>
      {renderView()}
      <CustomerBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={uniqueItemCount}
        notificationCount={2}
      />
    </>
  );
}

function App() {
  const [role, setRole] = useState<string>("customer");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <RoleSelector role={role} onRoleChange={setRole} />
            
            {role === "customer" && <CustomerView />}

            {role === "driver" && <DriverDashboard />}

            {role === "admin" && <AdminDashboard />}
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
