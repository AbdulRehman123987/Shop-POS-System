// app/customers/[id]/page.tsx (Next.js 13+ with App Router)

"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CustomerOrdersPage() {
  // Dummy customer + orders data
  const [customer] = useState({
    id: 1,
    name: "Ali Ahmed",
    phone: "0301-1234567",
    totalOutstanding: 850,
    totalPaid: 4350,
    orders: [
      {
        id: "ORD-1001",
        date: "2025-08-20",
        products: [
          { name: "Sugar 5kg", qty: 1, price: 750 },
          { name: "Flour 10kg", qty: 2, price: 1200 },
        ],
        total: 1950,
        paid: 1500,
        outstanding: 450,
      },
      {
        id: "ORD-1002",
        date: "2025-08-24",
        products: [
          { name: "Oil 5L", qty: 1, price: 2300 },
          { name: "Rice 10kg", qty: 1, price: 950 },
        ],
        total: 3250,
        paid: 2850,
        outstanding: 400,
      },
    ],
  });

  return (
    <div className="w-full h-[85vh] mx-auto p-0">
      {/* Customer Header */}
      <div className="w-full mb-2 flex flex-col justify-center p-2 shadow-lg rounded-2xl">
        <div>
          <h1 className="text-xl font-bold">{customer.name}</h1>
          <p className="text-lg font-normal">{customer.phone}</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-100 text-green-700 px-2 py-2 rounded-xl shadow">
            Total Paid:{" "}
            <span className="font-bold">Rs {customer.totalPaid}</span>
          </div>
          <div className="bg-red-100 text-red-700 px-2 py-2 rounded-xl shadow">
            Outstanding:{" "}
            <span className="font-bold">Rs {customer.totalOutstanding}</span>
          </div>
        </div>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="orders">
        <div className="w-full  flex justify-between items-start">
          <TabsList className="mb-3 flex gap-4">
            <TabsTrigger value="orders" className="cursor-pointer">
              Orders
            </TabsTrigger>
            <TabsTrigger value="outstanding" className="cursor-pointer">
              Outstanding Only
            </TabsTrigger>
          </TabsList>

          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-black" />
            <Input
              placeholder="Search order by id..."
              className="
          pl-10 pr-4 py-2
          rounded-md
          border border-gray-200
          shadow-lg
          bg-white/80 backdrop-blur-sm
          hover:shadow-xl
         focus:ring-primary/30
          transition-all duration-300
        "
            />
          </div>
        </div>
        <div className="w-full h-[330px] overflow-y-auto">
          {/* All Orders */}
          <TabsContent value="orders">
            {customer.orders.map((order) => (
              <Card
                key={order.id}
                className="mb-6 border rounded-2xl shadow-md"
              >
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Order #{order.id} - {order.date}
                  </CardTitle>
                  <Badge
                    variant={order.outstanding > 0 ? "destructive" : "default"}
                  >
                    {order.outstanding > 0 ? "Outstanding" : "Paid"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.products.map((p, i) => (
                        <TableRow key={i}>
                          <TableCell>{p.name}</TableCell>
                          <TableCell>{p.qty}</TableCell>
                          <TableCell>Rs {p.price}</TableCell>
                          <TableCell>Rs {p.qty * p.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center mt-4 font-semibold">
                    <p>Total: Rs {order.total}</p>
                    <p>Paid: Rs {order.paid}</p>
                    <p
                      className={
                        order.outstanding > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      Outstanding: Rs {order.outstanding}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Outstanding Only */}
          <TabsContent value="outstanding">
            {customer.orders
              .filter((o) => o.outstanding > 0)
              .map((order) => (
                <Card
                  key={order.id}
                  className="mb-6 border rounded-2xl shadow-md"
                >
                  <CardHeader>
                    <CardTitle>
                      Order #{order.id} - {order.date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-600 font-bold">
                      Outstanding Balance: Rs {order.outstanding}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </div>
      </Tabs>
      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline">Go Back</Button>
        <Button>Record New Order</Button>
      </div>
    </div>
  );
}
