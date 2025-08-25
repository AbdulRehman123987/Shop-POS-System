"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Plus,
  Package,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789012345",
  },
  {
    name: "Tea Leaves 250g",
    category: "Beverages",
    stock: 8,
    costPrice: 120,
    sellingPrice: 140,
    barcode: "4567890123456",
  },
  {
    name: "Wheat Flour 10kg",
    category: "Grains",
    stock: 12,
    costPrice: 380,
    sellingPrice: 420,
    barcode: "5678901234567",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345678901090234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "345679012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789012345",
  },
];

export default function ProductsPage() {
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.stock < 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const categories = new Set(products.map((p) => p.category)).size;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your inventory and product catalog
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Package className="h-5 w-5" />
              </div>
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-900">
              {totalProducts}
            </p>
            <p className="text-xs text-gray-500 mt-1">Updated just now</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Package className="h-5 w-5" />
              </div>
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-900">{lowStock}</p>
            <p className="text-xs text-gray-500 mt-1">Updated just now</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Package className="h-5 w-5" />
              </div>
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-900">
              {outOfStock}
            </p>
            <p className="text-xs text-gray-500 mt-1">Updated just now</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Package className="h-5 w-5" />
              </div>
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-900">
              {categories}
            </p>
            <p className="text-xs text-gray-500 mt-1">Updated just now</p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" /> Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Search */}
      {/* <div className="max-w-sm">
        <Input placeholder="Search products..." />
      </div> */}

      <div className="relative max-w-sm w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-black" />
        <Input
          placeholder="Search products..."
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

      {/* Table */}

      <div className="rounded-md border overflow-y-auto max-h-[370px]">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10">
              <TableHead className="w-[20%]">Product Name</TableHead>
              <TableHead className="w-[10%]">Category</TableHead>
              <TableHead className="w-[10%]">Stock</TableHead>
              <TableHead className="w-[10%]">Cost Price</TableHead>
              <TableHead className="w-[10%]">Selling Price</TableHead>
              <TableHead className="w-[10%]">Profit</TableHead>
              <TableHead className="w-[10%]">Barcode</TableHead>
              <TableHead className="w-[5%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const profit = product.sellingPrice - product.costPrice;
              return (
                <TableRow key={product.barcode}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.stock === 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : product.stock < 10 ? (
                      <Badge variant="secondary">Low Stock</Badge>
                    ) : (
                      <Badge>In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell>₹{product.costPrice.toFixed(2)}</TableCell>
                  <TableCell>₹{product.sellingPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-green-600">
                    ₹{profit.toFixed(2)}
                  </TableCell>
                  <TableCell>{product.barcode}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  {/* <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
