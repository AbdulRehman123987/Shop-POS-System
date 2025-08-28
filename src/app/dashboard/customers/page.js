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

const customers = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali.khan@example.com",
    phone: "+92-300-1234567",
    outstandingBalance: 2500,
    totalPaid: 15000,
    totalPurchases: 17500,
    lastPurchaseDate: "2025-08-10",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "+92-321-9876543",
    outstandingBalance: 0,
    totalPaid: 22000,
    totalPurchases: 22000,
    lastPurchaseDate: "2025-08-15",
  },
  {
    id: 3,
    name: "Usman Raza",
    email: "usman.raza@example.com",
    phone: "+92-345-5432167",
    outstandingBalance: 500,
    totalPaid: 10500,
    totalPurchases: 11000,
    lastPurchaseDate: "2025-07-30",
  },
  {
    id: 4,
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    phone: "+92-333-6547890",
    outstandingBalance: 1200,
    totalPaid: 8800,
    totalPurchases: 10000,
    lastPurchaseDate: "2025-08-20",
  },
  {
    id: 5,
    name: "Hamza Tariq",
    email: "hamza.tariq@example.com",
    phone: "+92-301-7778889",
    outstandingBalance: 0,
    totalPaid: 5000,
    totalPurchases: 5000,
    lastPurchaseDate: "2025-08-25",
  },
  {
    id: 6,
    name: "Ayesha Malik",
    email: "ayesha.malik@example.com",
    phone: "+92-302-4455667",
    outstandingBalance: 300,
    totalPaid: 9700,
    totalPurchases: 10000,
    lastPurchaseDate: "2025-08-22",
  },
  {
    id: 7,
    name: "Bilal Hussain",
    email: "bilal.hussain@example.com",
    phone: "+92-344-1112233",
    outstandingBalance: 0,
    totalPaid: 15000,
    totalPurchases: 15000,
    lastPurchaseDate: "2025-08-18",
  },
  {
    id: 8,
    name: "Mariam Zahra",
    email: "mariam.zahra@example.com",
    phone: "+92-315-2233445",
    outstandingBalance: 600,
    totalPaid: 7400,
    totalPurchases: 8000,
    lastPurchaseDate: "2025-08-12",
  },
  {
    id: 9,
    name: "Imran Sheikh",
    email: "imran.sheikh@example.com",
    phone: "+92-300-9988776",
    outstandingBalance: 2000,
    totalPaid: 13000,
    totalPurchases: 15000,
    lastPurchaseDate: "2025-07-28",
  },
  {
    id: 10,
    name: "Noor Jahan",
    email: "noor.jahan@example.com",
    phone: "+92-312-6655443",
    outstandingBalance: 0,
    totalPaid: 4500,
    totalPurchases: 4500,
    lastPurchaseDate: "2025-08-24",
  },
  {
    id: 11,
    name: "Zain Ali",
    email: "zain.ali@example.com",
    phone: "+92-331-8899776",
    outstandingBalance: 750,
    totalPaid: 12250,
    totalPurchases: 13000,
    lastPurchaseDate: "2025-08-05",
  },
  {
    id: 12,
    name: "Sana Iqbal",
    email: "sana.iqbal@example.com",
    phone: "+92-303-4455778",
    outstandingBalance: 0,
    totalPaid: 8000,
    totalPurchases: 8000,
    lastPurchaseDate: "2025-08-21",
  },
  {
    id: 13,
    name: "Kashif Mehmood",
    email: "kashif.mehmood@example.com",
    phone: "+92-321-5544332",
    outstandingBalance: 1000,
    totalPaid: 14000,
    totalPurchases: 15000,
    lastPurchaseDate: "2025-08-14",
  },
  {
    id: 14,
    name: "Hina Shah",
    email: "hina.shah@example.com",
    phone: "+92-335-6677889",
    outstandingBalance: 0,
    totalPaid: 9500,
    totalPurchases: 9500,
    lastPurchaseDate: "2025-08-19",
  },
  {
    id: 15,
    name: "Rizwan Ali",
    email: "rizwan.ali@example.com",
    phone: "+92-345-7766554",
    outstandingBalance: 450,
    totalPaid: 9050,
    totalPurchases: 9500,
    lastPurchaseDate: "2025-08-09",
  },
  {
    id: 16,
    name: "Nadia Farooq",
    email: "nadia.farooq@example.com",
    phone: "+92-310-2233114",
    outstandingBalance: 0,
    totalPaid: 12500,
    totalPurchases: 12500,
    lastPurchaseDate: "2025-08-23",
  },
  {
    id: 17,
    name: "Omer Siddiqui",
    email: "omer.siddiqui@example.com",
    phone: "+92-300-6677884",
    outstandingBalance: 1500,
    totalPaid: 10500,
    totalPurchases: 12000,
    lastPurchaseDate: "2025-08-16",
  },
  {
    id: 18,
    name: "Mehwish Anwar",
    email: "mehwish.anwar@example.com",
    phone: "+92-313-5544667",
    outstandingBalance: 0,
    totalPaid: 6000,
    totalPurchases: 6000,
    lastPurchaseDate: "2025-08-11",
  },
  {
    id: 19,
    name: "Shahid Iqbal",
    email: "shahid.iqbal@example.com",
    phone: "+92-321-4433221",
    outstandingBalance: 800,
    totalPaid: 9200,
    totalPurchases: 10000,
    lastPurchaseDate: "2025-08-08",
  },
  {
    id: 20,
    name: "Laiba Hassan",
    email: "laiba.hassan@example.com",
    phone: "+92-312-9988775",
    outstandingBalance: 0,
    totalPaid: 7000,
    totalPurchases: 7000,
    lastPurchaseDate: "2025-08-17",
  },
];

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

export default function CustomersPage() {
  const [active, setActive] = useState("paid");
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // stats
  const totalCustomers = customers.length;
  const creditCustomers = customers.filter(
    (c) => c.outstandingBalance > 0
  ).length;
  const totalOutstanding = customers.reduce(
    (acc, c) => acc + c.outstandingBalance,
    0
  );
  const activeThisMonth = customers.filter(
    (c) => new Date(c.lastPurchaseDate).getMonth() === new Date().getMonth()
  ).length;

  // pagination
  const totalPages = Math.ceil(customers.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedCustomers = customers.slice(
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

  function onSubmit(values) {
    console.log(values);
  }

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

            {/* Form with react-hook-form */}

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
            <p className="text-3xl font-bold">₹{totalOutstanding}</p>
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
          />
        </div>

        <div className="w-full max-w-xs flex items-center gap-2 p-1 rounded-lg shadow-md bg-white border border-gray-200">
          {/* <RotateCcw className="w-4 h-4 cursor-pointer text-gray-500" /> */}
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
          <RotateCcw className="w-4 h-4 cursor-pointer text-gray-500" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-y-auto max-h-[370px]">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-indigo-50">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Purchases</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>Last Purchase</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-gray-700">{c.email}</TableCell>
                <TableCell className="text-gray-700">{c.phone}</TableCell>
                <TableCell className="text-gray-700">
                  ₹{c.totalPurchases.toLocaleString()}
                </TableCell>
                <TableCell className="text-gray-700">
                  ₹{c.totalPaid.toLocaleString()}
                </TableCell>
                <TableCell>
                  {c.outstandingBalance > 0 ? (
                    <Badge variant="destructive">
                      ₹{c.outstandingBalance.toLocaleString()}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white hover:bg-green-600">
                      Paid
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{c.lastPurchaseDate}</TableCell>
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
                      <DropdownMenuItem className="cursor-pointer">
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
    </div>
  );
}
