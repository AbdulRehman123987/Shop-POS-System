"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  Calendar,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Dummy Data
const salesTrend = [
  { day: "Mon", sales: 8000 },
  { day: "Tue", sales: 12000 },
  { day: "Wed", sales: 15000 },
  { day: "Thu", sales: 10000 },
  { day: "Fri", sales: 17000 },
  { day: "Sat", sales: 14000 },
  { day: "Sun", sales: 18000 },
];

const categoryData = [
  { name: "Grains", value: 35, color: "#7C3AED" },
  { name: "Oil & Ghee", value: 20, color: "#10B981" },
  { name: "Dairy", value: 15, color: "#F59E0B" },
  { name: "Beverages", value: 12, color: "#3B82F6" },
  { name: "Bakery", value: 10, color: "#EC4899" },
  { name: "Others", value: 8, color: "#F43F5E" },
];

const topProducts = [
  { name: "Basmati Rice 5kg", sales: 320, revenue: 166400 },
  { name: "Cooking Oil 1L", sales: 270, revenue: 56700 },
  { name: "Sugar 1kg", sales: 250, revenue: 18750 },
  { name: "Tea Leaves 250g", sales: 180, revenue: 25200 },
];

const lowStock = [
  { name: "Tea Leaves 250g", stock: 8 },
  { name: "Cooking Oil 1L", stock: 12 },
  { name: "Bread", stock: 6 },
  { name: "Eggs (12 pcs)", stock: 10 },
];

export default function ReportsPage() {
  return (
    <div className="w-full h-[85vh] overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer">
            Export CSV
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Export Excel
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="daily" className="cursor-pointer">
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="cursor-pointer">
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="cursor-pointer">
            Monthly
          </TabsTrigger>
        </TabsList>

        {/* Daily Tab */}
        <TabsContent value="daily" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* <Card className="p-4"> */}
            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Sales</CardTitle>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹98,770</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> +12.5%
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Profit</CardTitle>
                <BarChart2 className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹23,250</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> 23.5% margin
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Transactions</CardTitle>
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">286</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> +8.2%
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Avg. Sale Value</CardTitle>
                <Users className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹345</p>
                <span className="text-red-600 flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" /> -2.1%
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesTrend}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4F46E5"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Selling */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Units Sold</th>
                      <th className="py-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">{p.sales}</td>
                        <td className="py-2">₹{p.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Low Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Stock Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">{p.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* You can add Weekly & Monthly content similarly */}
        <TabsContent value="weekly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* <Card className="p-4"> */}
            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Sales</CardTitle>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹98,770</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> +12.5%
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Profit</CardTitle>
                <BarChart2 className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹23,250</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> 23.5% margin
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Transactions</CardTitle>
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">286</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> +8.2%
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Avg. Sale Value</CardTitle>
                <Users className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹345</p>
                <span className="text-red-600 flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" /> -2.1%
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesTrend}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4F46E5"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Selling */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Units Sold</th>
                      <th className="py-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">{p.sales}</td>
                        <td className="py-2">₹{p.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Low Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Stock Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">{p.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
          {/* <p className="text-center text-gray-500">
            Weekly report coming soon...
          </p> */}
        </TabsContent>
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* <Card className="p-4"> */}
            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Sales</CardTitle>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹98,770</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> +12.5%
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Profit</CardTitle>
                <BarChart2 className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹23,250</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> 23.5% margin
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Transactions</CardTitle>
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">286</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" /> +8.2%
                </span>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Avg. Sale Value</CardTitle>
                <Users className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹345</p>
                <span className="text-red-600 flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" /> -2.1%
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesTrend}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4F46E5"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Selling */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Units Sold</th>
                      <th className="py-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">{p.sales}</td>
                        <td className="py-2">₹{p.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Low Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Stock Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">{p.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
          {/* <p className="text-center text-gray-500">
            Monthly report coming soon...
          </p> */}
        </TabsContent>
      </Tabs>

      {/* Bottom bar for all tabs */}
      <div className="w-full p-4 rounded-2xl bg-white grid gap-4 grid-cols-3 max-md:grid-cols-2 shadow-lg hover:shadow-xl transition-all duration-300">
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Credit Outstanding</CardTitle>
            <Users className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹4,450</p>
            <span className="text-green-600 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1" /> From 3 customers
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Low Stock Items</CardTitle>
            <Package className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <span className="text-green-600 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              Items needed restocking
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Best Day</CardTitle>
            <Calendar className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Jan 13</p>
            <span className="text-green-600 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1" /> 18,700 in sales
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
