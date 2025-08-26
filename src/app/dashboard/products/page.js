"use client";
import { useState } from "react";
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
  PackageCheck,
  PackageMinus,
  PackageX,
  FunnelPlus,
  RotateCcw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    barcode: "1234567878790123",
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
    barcode: "1230904567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2345555678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456788889012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "12345679899890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "23498085678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3451231326789012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "9091234567890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "2341215678901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789879012345",
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: 25,
    costPrice: 450,
    sellingPrice: 520,
    barcode: "1234567980890123",
  },
  {
    name: "Cooking Oil 1L",
    category: "Oil & Ghee",
    stock: 15,
    costPrice: 180,
    sellingPrice: 210,
    barcode: "234567823901234",
  },
  {
    name: "Sugar 1kg",
    category: "Sweeteners",
    stock: 30,
    costPrice: 65,
    sellingPrice: 75,
    barcode: "3456789018782345",
  },
];

const filters = [
  {
    key: "low-stock",
    label: "Low Stock",
    icon: PackageMinus,
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  },
  {
    key: "out-stock",
    label: "Out of Stock",
    icon: PackageX,
    color: "bg-red-400 text-red-900 hover:bg-red-300",
  },
];

export default function ProductsPage() {
  const [active, setActive] = useState("in-stock");
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.stock < 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const categories = new Set(products.map((p) => p.category)).size;
  const rowsPerPage = 8;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="px-6 py-4 space-y-4 w-full h-[calc(100vh-90px)] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your inventory and product catalog
          </p>
        </div>
        <Button className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-0">
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
          <CardHeader className="pb-0">
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
          <CardHeader className="pb-0">
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
          <CardHeader className="pb-0">
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
      </div>

      {/* Search */}

      <div className="w-full flex justify-between items-center">
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

        <div className="w-full max-w-sm flex items-center gap-2 p-1 rounded-lg shadow-md bg-white border border-gray-200">
          {/* Filter title button */}
          <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-medium shadow-sm">
            <FunnelPlus className="w-4 h-4" />
            <span>Filter</span>
          </div>

          {/* Stock buttons */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = active === filter.key;
              return (
                <Button
                  key={filter.key}
                  variant="ghost"
                  onClick={() => setActive(filter.key)}
                  className={`
            flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all text-sm font-medium
            ${
              isActive
                ? filter.color + " shadow-md scale-105"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
          <RotateCcw className="w-4 h-4 cursor-pointer text-gray-500" />
        </div>
      </div>

      {/* Table */}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-indigo-50">
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
          <TableBody className="overflow-y-auto">
            {paginatedProducts.map((product) => {
              const profit = product.sellingPrice - product.costPrice;
              return (
                <TableRow key={product.barcode}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.stock === 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : product.stock < 10 ? (
                      <Badge className="bg-red-500 text-white">Low Stock</Badge>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end p-3">
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : " cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
