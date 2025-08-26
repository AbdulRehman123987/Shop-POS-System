"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Sidebar() {
  const [active, setActive] = useState("Sales");

  const menuItems = [
    { name: "Sales", icon: ShoppingCart, path: "/dashboard/sales" },
    { name: "Products", icon: Package, path: "/dashboard/products" },
    { name: "Customers", icon: Users, path: "/dashboard/customers" },
    { name: "Reports", icon: BarChart2, path: "/dashboard/reports" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-56 border-r h-[calc(100vh-70px)]  p-4 flex flex-col justify-between">
      {/* Top Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <Button
              variant="ghost"
              onClick={() => setActive(item.name)}
              className={`w-full justify-start gap-2 transition-colors cursor-pointer 
        ${active === item.name ? "bg-black text-white" : "hover:bg-gray-100"}
      `}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-[15px]">{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-center gap-2 hover:bg-red-100 hover:text-red-600 bg-black text-white"
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </aside>
  );
}
