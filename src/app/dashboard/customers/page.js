"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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
  Pencil,
  Trash2,
  Search,
  FunnelPlus,
  Eye,
  CreditCard,
  IndianRupee,
  Calendar,
  Users,
  PackageMinus,
  PackageX,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
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

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

export default function CustomersPage() {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [customers, setAllCustomers] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchCustomer.toLowerCase());

    const matchesPaid =
      active === "unpaid"
        ? c.pendingAmount > 0
        : active === "paid"
        ? c.pendingAmount === 0
        : true;

    return matchesSearch && matchesPaid;
  });

  const totalCustomers = filteredCustomers.length;
  const creditCustomers = customers.filter((c) => c.pendingAmount > 0).length;
  const totalOutstanding = customers.reduce(
    (acc, c) => acc + c.pendingAmount,
    0
  );
  const activeThisMonth = customers.filter(
    (c) => new Date(c.lastPurchaseDate).getMonth() === new Date().getMonth()
  ).length;

  // pagination
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(11, "Phone number is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      form.reset();
      setOpenCustomerModal(false);
      fetchAllCustomers();
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  }

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      setAllCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <div className="px-6 py-4 space-y-4 w-full h-[calc(100vh-90px)] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">
            Manage customers account and credit transactions
          </p>
        </div>
        <Dialog open={openCustomerModal} onOpenChange={setOpenCustomerModal}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpenCustomerModal(true)}
            >
              <Plus className="h-4 w-4" /> Add Customer
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg max-w-[95%]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Add New Customer
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter customer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter customer email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="03000xxxxx"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setOpenCustomerModal(false);
                    }}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-800 cursor-pointer"
                  >
                    Add Customer
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <Users className="h-5 w-5 bg-indigo-100 p-1 rounded-lg" />
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalCustomers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <CreditCard className="h-5 w-5 bg-indigo-100 p-1 rounded-lg" />
              Credit Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{creditCustomers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <IndianRupee className="h-5 w-5 bg-indigo-100 p-1 rounded-lg" />
              Total Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ₹{totalOutstanding ? totalOutstanding : 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-indigo-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-700">
              <Calendar className="h-5 w-5 bg-indigo-100 p-1 rounded-lg" />
              Active This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeThisMonth}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="w-full flex justify-between items-center">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-black" />
          <Input
            placeholder="Search Customers..."
            className="pl-10 pr-4 py-2"
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
          />
        </div>

        <div className="w-full max-w-xs flex items-center gap-2 p-1 rounded-lg shadow-md bg-white border border-gray-200">
          {/* Filter title button */}
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
          <RotateCcw
            className="w-4 h-4 cursor-pointer text-gray-500"
            onClick={() => setActive("")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-y-auto max-h-[370px]">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-indigo-50">
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Total Purchases</TableHead>
              <TableHead className="text-center">Total Paid</TableHead>
              <TableHead className="text-center">Outstanding</TableHead>
              <TableHead className="text-center">Last Purchase</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((c) => (
              <TableRow key={c._id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-gray-700 text-center">
                  {c.email}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {c.phone}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  ₹{c.totalSpent ? c.totalSpent.toLocaleString() : 0}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  ₹{c.totalPaid ? c.totalPaid.toLocaleString() : 0}
                </TableCell>
                <TableCell className="text-center">
                  {c.pendingAmount > 0 ? (
                    <Badge variant="destructive">
                      ₹{c.pendingAmount.toLocaleString()}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white hover:bg-green-600">
                      Paid
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {c.lastPurchaseDate ? (
                    formatDate(c.lastPurchaseDate)
                  ) : (
                    <Badge className="bg-green-500 text-white hover:bg-green-600">
                      New
                    </Badge>
                  )}
                </TableCell>
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
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/dashboard/customers/${c._id}`)
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 cursor-pointer">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
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
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Previous Page Number */}
            {page > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Current Page */}
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>

            {/* Next Page Number */}
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

      {/* <Dialog open={openViewModal} onOpenChange={setOpenViewModal}>
        <DialogContent className="sm:max-w-lg max-w-[95%]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Customer Details
            </DialogTitle>
          </DialogHeader>

          {selectedCustomer ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{selectedCustomer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Purchases:</span>
                <span>₹{selectedCustomer.totalPurchases || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Paid:</span>
                <span>₹{selectedCustomer.totalPaid || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Outstanding:</span>
                <span>
                  {selectedCustomer.outstandingBalance > 0 ? (
                    <Badge variant="destructive">
                      ₹{selectedCustomer.outstandingBalance}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white hover:bg-green-600">
                      Paid
                    </Badge>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Purchase:</span>
                <span>{selectedCustomer.lastPurchaseDate || "New"}</span>
              </div>
            </div>
          ) : (
            <p>No customer selected</p>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
