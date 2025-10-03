import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Package, ShoppingCart, Users, Settings, Tag, MapPin, BarChart3 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

//todo: remove mock functionality
const stats = [
  { title: "Total Revenue", value: "$12,450", icon: BarChart3, trend: "+12.5%", trendUp: true },
  { title: "Total Orders", value: "348", icon: ShoppingCart, trend: "+8.2%", trendUp: true },
  { title: "Active Drivers", value: "12", icon: Users, trend: "+2", trendUp: true },
  { title: "Low Stock Items", value: "8", icon: Package, trend: "Needs attention", trendUp: false },
];

//todo: remove mock functionality
const recentOrders = [
  { id: "12347", customer: "John Doe", items: 8, total: 45.99, status: "pending" },
  { id: "12348", customer: "Jane Smith", items: 5, total: 32.50, status: "preparing" },
  { id: "12349", customer: "Bob Johnson", items: 12, total: 78.25, status: "out_for_delivery" },
];

const menuItems = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Products", icon: Package, id: "products" },
  { title: "Orders", icon: ShoppingCart, id: "orders" },
  { title: "Drivers", icon: Users, id: "drivers" },
  { title: "Specials & Banners", icon: Tag, id: "content" },
  { title: "Delivery Zones", icon: MapPin, id: "zones" },
  { title: "Settings", icon: Settings, id: "settings" },
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-display font-bold px-4 py-3">
                FreshCart Admin
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveMenu(item.id)}
                        isActive={activeMenu === item.id}
                        data-testid={`button-menu-${item.id}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {activeMenu === "dashboard" && (
                <>
                  <div>
                    <h1 className="font-display font-bold text-3xl mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your grocery delivery platform</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <StatsCard key={index} {...stat} />
                    ))}
                  </div>

                  <Card className="p-6">
                    <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
                    <div className="space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-elevate">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.customer}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold">${order.total.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{order.items} items</p>
                            </div>
                            <Badge>
                              {order.status.replace("_", " ")}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              )}

              {activeMenu === "products" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="font-display font-bold text-3xl mb-2">Product Management</h1>
                      <p className="text-muted-foreground">Manage categories, subcategories, and products</p>
                    </div>
                    <Button data-testid="button-add-category">Add Category</Button>
                  </div>

                  <Card className="p-6">
                    <h2 className="font-semibold text-lg mb-4">Categories</h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Fresh Vegetables</p>
                          <p className="text-sm text-muted-foreground">3 subcategories • 24 products</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {activeMenu === "content" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="font-display font-bold text-3xl mb-2">Specials & Banners</h1>
                      <p className="text-muted-foreground">Manage promotional banners and special offers</p>
                    </div>
                    <Button data-testid="button-add-banner">Add Banner</Button>
                  </div>

                  <Card className="p-6">
                    <h2 className="font-semibold text-lg mb-4">Active Banners</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <div className="w-32 h-20 bg-muted rounded overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=100&fit=crop" 
                            alt="Banner" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">50% OFF Fresh Produce</p>
                          <p className="text-sm text-muted-foreground">Links to: /specials/produce</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {activeMenu === "orders" && (
                <div>
                  <h1 className="font-display font-bold text-3xl mb-2">Orders</h1>
                  <p className="text-muted-foreground">Manage customer orders</p>
                </div>
              )}

              {activeMenu === "drivers" && (
                <div>
                  <h1 className="font-display font-bold text-3xl mb-2">Driver Management</h1>
                  <p className="text-muted-foreground">Manage delivery drivers</p>
                </div>
              )}

              {activeMenu === "zones" && (
                <div>
                  <h1 className="font-display font-bold text-3xl mb-2">Delivery Zones</h1>
                  <p className="text-muted-foreground">Configure delivery zones and ZIP codes</p>
                </div>
              )}

              {activeMenu === "settings" && (
                <div>
                  <h1 className="font-display font-bold text-3xl mb-2">Settings</h1>
                  <p className="text-muted-foreground">Configure platform settings</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
