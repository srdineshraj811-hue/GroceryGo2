import { CustomerBottomNav } from "../CustomerBottomNav";
import { useState } from "react";

export default function CustomerBottomNavExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="h-20">
      <CustomerBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={3}
        notificationCount={2}
      />
    </div>
  );
}
