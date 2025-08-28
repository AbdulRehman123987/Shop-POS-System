"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Eye,
  CreditCard,
  MoreVertical,
  Phone,
  Search,
  FunnelPlus,
  PackageMinus,
  PackageX,
  RotateCcw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filters = [
  {
    key: "paid",
    label: "Paid",
    icon: PackageMinus,
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  },
  {
    key: "unpaid",
    label: "UnPaid",
    icon: PackageX,
    color: "bg-red-100 text-red-700 hover:bg-red-200",
  },
];

const orders = [
  {
    orderId: "ORD-1001",
    date: "2025-08-01",
    total: 2500,
    totalPaid: 2000,
    outstanding: 500,
    products: [
      { name: "Sugar 5kg", qty: 1, price: 750 },
      { name: "Flour 10kg", qty: 2, price: 1200 },
    ],
  },
  {
    orderId: "ORD-1002",
    date: "2025-08-02",
    total: 1800,
    totalPaid: 1800,
    outstanding: 0,
    products: [{ name: "Oil 5L", qty: 1, price: 1800 }],
  },
  {
    orderId: "ORD-1003",
    date: "2025-08-03",
    total: 3200,
    totalPaid: 2700,
    outstanding: 500,
    products: [
      { name: "Rice 10kg", qty: 1, price: 950 },
      { name: "Oil 3L", qty: 2, price: 2250 },
    ],
  },
];

export default function CustomerOrdersPage() {
  const [active, setActive] = useState("paid");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [payModal, setPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const totalPages = Math.ceil(orders.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full h-[85vh] mx-auto p-2">
      {/* Customer Header */}
      <div className="w-full mb-4 flex flex-col justify-center p-3 shadow-md rounded-xl bg-white">
        <h1 className="text-xl font-bold">Ali Ahmed</h1>
        <div className="flex items-center gap-2 mb-2">
          <Phone size={18} />
          <p className="text-lg font-normal">0301-1234567</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg shadow text-sm">
            Total Paid: <span className="font-bold">Rs 4350</span>
          </div>
          <div className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg shadow text-sm">
            Outstanding: <span className="font-bold">Rs 850</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-black" />
          <Input
            placeholder="Search Order by id..."
            className="pl-10 pr-4 py-2"
          />
        </div>

        <div className="w-full mb-3 max-w-xs flex items-center gap-2 p-1 rounded-lg shadow-md bg-white border border-gray-200">
          <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-medium shadow-sm">
            <FunnelPlus className="w-4 h-4" />
            <span>Filter</span>
          </div>
          {/* Stock buttons */}
          <div className="flex justify-between gap-2 overflow-x-auto scrollbar-hide">
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
      <div className="rounded-md border overflow-y-auto max-h-[370px]">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-indigo-50 items-center">
              <TableHead>Order ID</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Paid</TableHead>
              <TableHead className="text-center">Outstanding</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((o) => (
              <TableRow key={o.orderId}>
                <TableCell className="font-medium">{o.orderId}</TableCell>
                <TableCell className="text-gray-700 text-center">
                  {o.date}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {o.total}
                </TableCell>
                <TableCell className="text-center">{o.totalPaid}</TableCell>
                <TableCell className="text-center">
                  {o.outstanding > 0 ? (
                    <Badge variant="destructive">
                      ₹{o.outstanding.toLocaleString()}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white hover:bg-green-600">
                      Paid
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
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
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedOrder(o);
                          setViewModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-black cursor-pointer"
                        onClick={() => {
                          setSelectedOrder(o);
                          setPayModal(true);
                        }}
                      >
                        <CreditCard className="h-4 w-4 mr-2" /> Pay
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Order Modal */}
      <Dialog open={viewModal} onOpenChange={setViewModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderId}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>Date: {selectedOrder?.date}</p>
            <p>Total: Rs {selectedOrder?.total}</p>
            <p>Paid: Rs {selectedOrder?.totalPaid}</p>
            <p>Outstanding: Rs {selectedOrder?.outstanding}</p>
            <h3 className="font-semibold mt-3">Products:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {selectedOrder?.products?.map((p, i) => (
                <li key={i}>
                  {p.name} - Qty: {p.qty} × Rs {p.price}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              onClick={() => setViewModal(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay Modal */}
      <Dialog open={payModal} onOpenChange={setPayModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pay Outstanding</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p>
              Order:{" "}
              <span className="font-semibold">{selectedOrder?.orderId}</span>
            </p>
            <p>
              Outstanding:{" "}
              <span className="font-bold text-red-600">
                Rs {selectedOrder?.outstanding}
              </span>
            </p>
            <Input
              type="number"
              placeholder="Enter amount..."
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              onClick={() => {
                console.log(
                  "Paid:",
                  payAmount,
                  "for order:",
                  selectedOrder?.orderId
                );
                setPayModal(false);
                setPayAmount("");
              }}
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="flex justify-end p-3">
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {page > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>

            {page < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
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
