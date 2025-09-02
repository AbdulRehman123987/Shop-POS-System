"use client";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Barcode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SalePage() {
  const [cart, setCart] = useState([]);
  const [productsData, setAllProductsData] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [sellModal, setSellModal] = useState(false);
  const [outstandingModal, setOutstandingModal] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setAllCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });

      setAllProductsData(data);
    } catch (err) {
      console.error(
        "Error fetching products:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
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

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    category: z.string().min(1, "Category is required"),
    stock: z.coerce.number().min(0),
    barcode: z.string().min(0),
    costPrice: z.coerce.number().min(0),
    sellingPrice: z.coerce.number().min(0),
    alertstock: z.coerce.number().min(0),
  });

  const addCustomerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(11, "Phone number is required"),
  });

  const addCustomerForm = useForm({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      stock: 0,
      barcode: "",
      costPrice: 0,
      sellingPrice: 0,
      alertstock: 0,
    },
  });

  async function onSubmit(values) {
    try {
      const {
        name,
        category,
        stock,
        alertstock,
        costPrice,
        sellingPrice,
        barcode,
      } = values;

      const payload = {
        name,
        category,
        stock,
        alertstock,
        costPrice,
        sellingPrice,
      };

      if (barcode && barcode.trim() !== "") {
        payload.barcode = barcode;
      }

      const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
      const res = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });
      form.reset();
      setOpenProductDialog(false);
      fetchAllProducts();
    } catch (error) {
      console.error(
        "Error uploading product:",
        error.response?.data || error.message
      );
    }
  }

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const total = cart.reduce(
    (sum, item) => sum + item.sellingPrice * item.qty,
    0
  );

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

  const createSale = async (paymentMode) => {
    try {
      const products = cart.map((item) => ({
        productId: item.id,
        stock: item.qty,
      }));
      let payload;
      if (paymentMode === "credit") {
        payload = {
          products,
          paymentMode: "credit",
          paidAmount: 0,
          customerId: selectedCustomer._id,
        };
      } else {
        payload = {
          products,
          discount: 0,
          paymentMode: "cash",
          payNow: true,
        };
      }

      const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/sales`;
      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });
      setCart([]);
      setSellModal(false);
      setAddCustomerModal(false);
      setOutstandingModal(false);
    } catch (error) {
      console.error(
        "Error making sale:",
        error.response?.data || error.message
      );
    }
  };

  async function handleAddCustomer(values) {
    try {
      console.log(values);
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
      addCustomerForm.reset();
      fetchAllCustomers();
      setAddCustomerModal(false);
      setOutstandingModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 bg-gray-50">
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
              <span className="text-lg font-bold text-gray-800">₹{total}</span>
            </div>
          </CardHeader>

          <CardContent className="mt-1 space-y-2 h-[calc(100vh-200px)] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <Image
                  width={200}
                  height={200}
                  src="/empty_cart.png"
                  alt="cart_image"
                />
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-xl"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">
                    {item.qty} × ₹{item.sellingPrice}
                  </span>
                  <button
                    onClick={() =>
                      setCart(cart.filter((p) => p.id !== item.id))
                    }
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </CardContent>

          {/* Sell Button */}
          {cart.length > 0 && (
            <div>
              <Dialog open={sellModal} onOpenChange={setSellModal}>
                <DialogTrigger asChild>
                  <div className="w-[80%] mx-auto gap-1 flex justify-center items-center py-2 rounded-lg cursor-pointer bg-black text-white text-lg">
                    <CreditCard size={18} />
                    <span>Sells</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                  </DialogHeader>
                  <div className="w-full h-[300px] overflow-y-auto space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between border-b pb-2"
                      >
                        <span>{item.name}</span>
                        <span>
                          {item.qty} × ₹{item.sellingPrice}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{total}</span>
                  </div>
                  <DialogFooter className="flex gap-3 justify-end pt-4">
                    <Button
                      className="bg-green-600 text-white cursor-pointer"
                      onClick={() => createSale("cash")}
                    >
                      Paid
                    </Button>
                    <Button
                      className="bg-yellow-500 text-white cursor-pointer"
                      onClick={() => {
                        setSellModal(false);
                        setOutstandingModal(true);
                      }}
                    >
                      Outstanding
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </Card>

        <Dialog open={outstandingModal} onOpenChange={setOutstandingModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Select Customer</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search customer by name..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
              />

              {/* Customer List */}
              <div className="max-h-48 overflow-y-auto space-y-2">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c) => (
                    <div
                      key={c._id}
                      onClick={() => setSelectedCustomer(c)}
                      className={`p-3 rounded-lg border cursor-pointer transition hover:bg-accent ${
                        selectedCustomer?.id === c.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-200"
                      }`}
                    >
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.email}</p>
                      <p className="text-sm text-muted-foreground">{c.phone}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center">
                    No customers found
                  </p>
                )}
              </div>

              {/* Add New Customer */}
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => {
                  setOutstandingModal(false);
                  setAddCustomerModal(true);
                }}
              >
                + Add New Customer
              </Button>

              {/* Selected Customer Preview */}
              {selectedCustomer && (
                <div className="mt-4 p-3 border rounded-lg bg-muted">
                  <p className="font-medium">{selectedCustomer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.phone}
                  </p>
                </div>
              )}
            </div>

            {/* Save Button */}
            <DialogFooter className="pt-4">
              <Button
                disabled={!selectedCustomer}
                className="cursor-pointer"
                onClick={() => createSale("credit")}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={addCustomerModal} onOpenChange={setAddCustomerModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
            </DialogHeader>
            <DialogContent className="sm:max-w-lg max-w-[95%]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Add New Customer
                </DialogTitle>
              </DialogHeader>

              {/* Form with react-hook-form */}

              <Form {...addCustomerForm}>
                <form
                  onSubmit={addCustomerForm.handleSubmit(handleAddCustomer)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1">
                    <FormField
                      control={addCustomerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter customer name"
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
                      control={addCustomerForm.control}
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
                      control={addCustomerForm.control}
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
                      onClick={() => addCustomerForm.reset()}
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
          </DialogContent>
        </Dialog>

        <div className="lg:col-span-3 space-y-6">
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

            <Dialog
              open={openProductDialog}
              onOpenChange={setOpenProductDialog}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg max-w-[95%]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Add New Product
                  </DialogTitle>
                </DialogHeader>

                {/* Form with react-hook-form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter product name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        className="w-full"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Category
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-2">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="grains">
                                    🌾 Grains
                                  </SelectItem>
                                  <SelectItem value="Essentials">
                                    Essentials
                                  </SelectItem>
                                  <SelectItem value="oil-ghee">
                                    🛢 Oil & Ghee
                                  </SelectItem>
                                  <SelectItem value="sweeteners">
                                    🍯 Sweeteners
                                  </SelectItem>
                                  <SelectItem value="beverages">
                                    🥤 Beverages
                                  </SelectItem>
                                  <SelectItem value="dairy">
                                    🥛 Dairy
                                  </SelectItem>
                                  <SelectItem value="snacks">
                                    🍪 Snacks
                                  </SelectItem>
                                  <SelectItem value="spices">
                                    🌶 Spices
                                  </SelectItem>
                                  <SelectItem value="bakery">
                                    🍞 Bakery
                                  </SelectItem>
                                  <SelectItem value="frozen">
                                    ❄️ Frozen Items
                                  </SelectItem>
                                  <SelectItem value="personal-care">
                                    🧴 Personal Care
                                  </SelectItem>
                                  <SelectItem value="household">
                                    🏠 Household Essentials
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter stock quantity"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="alertstock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alert Stock</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="costPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost Price (₹)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sellingPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Selling Price (₹)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Barcode
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  placeholder="Scan or enter barcode"
                                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                  {...field}
                                />
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
                              </div>
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
                          setOpenProductDialog(false);
                        }}
                        className="cursor-pointer"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-black text-white hover:bg-gray-800 cursor-pointer"
                      >
                        Save Product
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className="rounded-xl cursor-pointer"
              asChild
            >
              <Link href="/dashboard/products">All</Link>
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
                    ₹{product.sellingPrice}
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
