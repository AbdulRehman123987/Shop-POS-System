"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Printer, Barcode, Settings } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("shop");

  return (
    <div className="w-full h-[85vh] overflow-y-auto p-4 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Configure your POS system preferences</p>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className=" w-full bg-gray-100 rounded-xl p-0">
          <TabsTrigger value="shop" className="rounded-lg cursor-pointer">
            Shop Details
          </TabsTrigger>
          <TabsTrigger value="printer" className="rounded-lg cursor-pointer">
            Printer Setup
          </TabsTrigger>
          <TabsTrigger value="barcode" className="rounded-lg cursor-pointer">
            Barcode Setup
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg cursor-pointer">
            System
          </TabsTrigger>
        </TabsList>

        {/* Shop Details Tab */}
        <TabsContent value="shop">
          <Card className="shadow-md rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" /> Shop Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="pb-2">Shop Name</Label>
                  <Input placeholder="Shop Name" defaultValue="Karyana Store" />
                </div>
                <div>
                  <Label className="pb-2">Phone Number</Label>
                  <Input placeholder="+92-300-1234567" />
                </div>
                <div className="md:col-span-2">
                  <Label className="pb-2">Address</Label>
                  <Textarea placeholder="123 Main Street, Karachi, Pakistan" />
                </div>
                <div>
                  <Label className="pb-2">Email</Label>
                  <Input type="email" placeholder="info@shop.com" />
                </div>
                <div>
                  <Label className="pb-2">Tax ID</Label>
                  <Input placeholder="TAX123456789" />
                </div>
                <div>
                  <Label className="pb-2">Currency</Label>
                  <Select defaultValue="PKR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="pb-2">Timezone</Label>
                  <Select defaultValue="Asia/Karachi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Karachi">Asia/Karachi</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="pb-2">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ur">Urdu</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4 flex items-center justify-self-end gap-2">
                <Save className="w-4 h-4" /> Save Shop Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Printer Setup Tab */}
        <TabsContent value="printer">
          <Card className="shadow-md rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-gray-500" /> Printer Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="pb-2">Printer Name</Label>
                  <Input placeholder="e.g. Epson TM-T88V" />
                </div>
                <div>
                  <Label className="pb-2">Connection Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usb">USB</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="bluetooth">Bluetooth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="pb-2">IP Address / Port</Label>
                  <Input placeholder="192.168.1.100:9100" />
                </div>
                <div>
                  <Label className="pb-2">Paper Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="80mm">80mm</SelectItem>
                      <SelectItem value="58mm">58mm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4 flex items-center justify-self-end gap-2">
                <Save className="w-4 h-4" /> Save Printer Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Barcode Setup Tab */}
        <TabsContent value="barcode">
          <Card className="shadow-md rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Barcode className="w-5 h-5 text-gray-500" /> Barcode Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="pb-2">Barcode Format</Label>
                  <Select defaultValue="code128">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code128">Code 128</SelectItem>
                      <SelectItem value="ean13">EAN-13</SelectItem>
                      <SelectItem value="upc">UPC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="pb-2">Label Size</Label>
                  <Select defaultValue="small">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4 flex items-center justify-self-end gap-2">
                <Save className="w-4 h-4" /> Save Barcode Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system">
          <Card className="shadow-md rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" /> System
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="pb-2">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="pb-2">Auto Backup</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4 flex items-center justify-self-end gap-2">
                <Save className="w-4 h-4" /> Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
