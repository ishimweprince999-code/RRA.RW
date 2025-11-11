import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

import { useState } from "react";

export default function TraderLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex bg-slate-900">
      <Sidebar
        items={[
          { to: "/trader/dashboard", label: "Dashboard" },
          { to: "/trader/new-sale", label: "New Sale" },
          { to: "/trader/transactions", label: "Transactions" },
          { to: "/trader/reports", label: "Reports" },
        ]}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />
      {/* Main content with margin for fixed sidebar */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
