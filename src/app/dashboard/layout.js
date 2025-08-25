import Navbar from "../component/navbar";
import { Sidebar } from "../component/sidebar";
import DashboardBar from "../component/dashboardBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
