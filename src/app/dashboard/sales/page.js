"use client";
import { useState } from "react";
import { Search, ShoppingCart, Barcode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

const productsData = [
  {
    id: 1,
    name: "Basmati Rice 5kg",
    category: "Grains",
    price: 520,
    stock: 25,
    barcode: "1234567890123",
  },
  {
    id: 2,
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    price: 210,
    stock: 15,
    barcode: "2345678901234",
  },
  {
    id: 3,
    name: "Sugar 1kg",
    category: "Sweeteners",
    price: 75,
    stock: 30,
    barcode: "3456789012345",
  },
  {
    id: 4,
    name: "Tea Leaves 250g",
    category: "Beverages",
    price: 140,
    stock: 8,
    barcode: "4567890123456",
  },
  {
    id: 5,
    name: "Wheat Flour 10kg",
    category: "Grains",
    price: 420,
    stock: 12,
    barcode: "5678901234567",
  },
  {
    id: 6,
    name: "Milk 1L",
    category: "Dairy",
    price: 55,
    stock: 20,
    barcode: "6789012345678",
  },
  {
    id: 7,
    name: "Bread",
    category: "Bakery",
    price: 25,
    stock: 18,
    barcode: "7890123456789",
  },
  {
    id: 8,
    name: "Eggs (12 pcs)",
    category: "Dairy",
    price: 84,
    stock: 24,
    barcode: "8901234567890",
  },
  {
    id: 10,
    name: "Wheat Flour 10kg",
    category: "Grains",
    price: 420,
    stock: 12,
    barcode: "56783901234567",
  },
  {
    id: 11,
    name: "Milk 1L",
    category: "Dairy",
    price: 55,
    stock: 20,
    barcode: "67892012345678",
  },
  {
    id: 12,
    name: "Bread",
    category: "Bakery",
    price: 25,
    stock: 18,
    barcode: "78901123456789",
  },
  {
    id: 13,
    name: "Eggs (12 pcs)",
    category: "Dairy",
    price: 84,
    stock: 24,
    barcode: "89012234567890",
  },
  {
    id: 14,
    name: "Tea Leaves 250g",
    category: "Beverages",
    price: 140,
    stock: 8,
    barcode: "45673890123456",
  },
  {
    id: 15,
    name: "Wheat Flour 10kg",
    category: "Grains",
    price: 420,
    stock: 12,
    barcode: "56782901234567",
  },
  {
    id: 16,
    name: "Milk 1L",
    category: "Dairy",
    price: 55,
    stock: 20,
    barcode: "611789012345678",
  },
  {
    id: 17,
    name: "Bread",
    category: "Bakery",
    price: 25,
    stock: 18,
    barcode: "789110123456789",
  },
  {
    id: 18,
    name: "Eggs (12 pcs)",
    category: "Dairy",
    price: 84,
    stock: 24,
    barcode: "890123114567890",
  },
];

export default function SalePage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 bg-gray-50">
        {/* Cart Section */}
        {/* Cart Section */}
        <Card className="lg:col-span-1 h-[500px] shadow-xl border border-gray-200 rounded-2xl">
          <CardHeader className="flex flex-col gap-2 border-b pb-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg font-semibold">
                  Cart ({cart.length} items)
                </CardTitle>
              </div>
              {/* 👉 Total Price */}
              <span className="text-lg font-bold text-gray-800">
                ₹
                {cart.reduce((total, item) => total + item.price * item.qty, 0)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="mt-1 space-y-2 h-[calc(100vh-200px)] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <img src="/empty_cart.png" />
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-xl"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">
                    {item.qty} × ₹{item.price}
                  </span>
                  <button
                    onClick={() =>
                      setCart(cart.filter((_, i) => i !== item.id))
                    }
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search & Actions */}
          <div className="flex items-center w-[95%] gap-3 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 py-2 rounded-xl"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl flex items-center gap-2 cursor-pointer"
              onClick={() => {
                // 👉 open scanner modal or trigger barcode scanner here
                console.log("Open barcode scanner");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7V4a1 1 0 011-1h3M4 17v3a1 1 0 001 1h3m10-3v3a1 1 0 01-1 1h-3m4-13V4a1 1 0 00-1-1h-3M7 7h.01M7 17h.01M17 7h.01M17 17h.01"
                />
              </svg>
              Scan
            </Button>
            <Button className="px-6 py-2 rounded-xl">Add</Button>
            <Button variant="outline" className="rounded-xl">
              All
            </Button>
          </div>

          {/* Products */}
          <div className="flex flex-wrap gap-4 h-[450px] overflow-y-auto">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                onClick={() => addToCart(product)}
                className="w-[200px] h-[150px] py-0 px-2 cursor-pointer bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100"
              >
                <CardContent className="p-2 space-y-0">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-xl font-bold text-primary">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-600">{product.barcode}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock} left
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
