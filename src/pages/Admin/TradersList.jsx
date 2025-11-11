import { useState, useMemo } from "react";
import { Search, Filter, Eye, Ban, Mail, User, Phone, Building2, Users, TrendingUp, DollarSign, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useTheme from "../../store/theme.js";

const columnHelper = createColumnHelper();

export default function TradersList() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Format FRW currency
  const formatFRW = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M FRW`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K FRW`;
    }
    return `${amount.toLocaleString()} FRW`;
  };

  const data = useMemo(
    () => [
      { id: 1, name: "John Doe", category: "Retail Shop", phone: "+250788123456", totalSales: 1200000, status: "Active" },
      { id: 2, name: "Jane Smith", category: "Restaurant", phone: "+250788234567", totalSales: 980000, status: "Active" },
      { id: 3, name: "Bob Wilson", category: "Boutique", phone: "+250788345678", totalSales: 1500000, status: "Active" },
      { id: 4, name: "Alice Brown", category: "Electronics", phone: "+250788456789", totalSales: 450000, status: "Inactive" },
      { id: 5, name: "Charlie Davis", category: "Grocery Store", phone: "+250788567890", totalSales: 2100000, status: "Active" },
    ],
    []
  );
  
  // Calculate stats
  const stats = useMemo(() => {
    const totalTraders = data.length;
    const activeTraders = data.filter(t => t.status === "Active").length;
    const inactiveTraders = data.filter(t => t.status === "Inactive").length;
    const totalSales = data.reduce((sum, t) => sum + t.totalSales, 0);
    return { totalTraders, activeTraders, inactiveTraders, totalSales };
  }, [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Trader Name",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <User size={16} className="text-blue-400" />
            </div>
            <span className="font-medium">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <div className="flex items-center gap-2 text-slate-300">
            <Building2 size={14} className="text-green-400" />
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => (
          <div className="flex items-center gap-2 text-slate-300">
            <Phone size={14} className="text-purple-400" />
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("totalSales", {
        header: "Total Sales (FRW)",
        cell: (info) => (
          <span className={`font-bold ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {formatFRW(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              info.getValue() === "Active"
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 transition-colors"
              title="Send Message"
            >
              <Mail size={16} />
            </button>
            <button
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Deactivate"
            >
              <Ban size={16} />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6">
      {/* Header with Rwanda Badge */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className={`text-2xl md:text-3xl font-bold ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>Traders List</h1>
          <div className="flex gap-1">
            <div className="w-1.5 h-6 rounded-full bg-blue-500"></div>
            <div className="w-1.5 h-6 rounded-full bg-yellow-400"></div>
            <div className="w-1.5 h-6 rounded-full bg-green-500"></div>
          </div>
        </div>
        <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
          Manage all registered traders in the system • <span className="font-bold text-blue-500">FRW</span> displayed
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10">
              <Users size={20} className="text-blue-500" />
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Traders</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{stats.totalTraders}</div>
        </div>

        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-green-500/10">
              <UserCheck size={20} className="text-green-500" />
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Active Traders</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{stats.activeTraders}</div>
        </div>

        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-red-500/10">
              <Ban size={20} className="text-red-500" />
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Inactive</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{stats.inactiveTraders}</div>
        </div>

        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10">
              <TrendingUp size={20} className="text-yellow-500" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/10 text-blue-400'
            }`}>FRW</span>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Sales</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{formatFRW(stats.totalSales)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border ${
        isLight ? 'bg-white border-gray-200' : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search traders by name, category, or phone..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isLight
                  ? 'bg-gray-50 border-gray-200 text-slate-900 placeholder-slate-400'
                  : 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400'
              }`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isLight
                ? 'bg-gray-50 border-gray-200 text-slate-900'
                : 'bg-slate-700/50 border-slate-600/50 text-white'
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className={`hidden md:block rounded-xl border overflow-hidden shadow-xl ${
        isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={isLight ? 'bg-gray-50' : 'bg-slate-700/30'}>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className={`text-left px-4 py-3 cursor-pointer select-none font-semibold ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}
                      onClick={h.column.getToggleSortingHandler()}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {{ asc: " ▲", desc: " ▼" }[h.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={`border-t transition-colors ${
                  isLight
                    ? 'border-gray-200 hover:bg-gray-50'
                    : 'border-slate-700/50 hover:bg-slate-700/20'
                }`}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className={`flex items-center justify-between px-4 py-3 border-t ${
          isLight ? 'border-gray-200 bg-gray-50' : 'border-slate-700/50 bg-slate-800/50'
        }`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all disabled:opacity-40 ${
                isLight
                  ? 'bg-gray-100 hover:bg-gray-200 text-slate-900'
                  : 'bg-slate-700/50 hover:bg-slate-700 text-white'
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all disabled:opacity-40 ${
                isLight
                  ? 'bg-gray-100 hover:bg-gray-200 text-slate-900'
                  : 'bg-slate-700/50 hover:bg-slate-700 text-white'
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
          <div className={`text-xs ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className={`px-3 py-2 rounded-lg border text-sm ${
              isLight
                ? 'bg-gray-100 border-gray-200 text-slate-900'
                : 'bg-slate-700/50 border-slate-600/50 text-white'
            }`}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {table.getRowModel().rows.map((row) => {
          const rowData = row.original;
          return (
            <div key={row.id} className={`p-4 rounded-xl border shadow-lg ${
              isLight ? 'bg-white border-gray-200' : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <User size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className={`font-bold text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>{rowData.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                      <Building2 size={12} />
                      {rowData.category}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  rowData.status === "Active"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}>
                  {rowData.status}
                </span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-purple-400">
                  <Phone size={14} />
                  {rowData.phone}
                </div>
                <div className={`text-sm ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <span className="font-medium">Sales:</span>{' '}
                  <span className={`font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>{formatFRW(rowData.totalSales)}</span>
                </div>
              </div>
              <div className={`flex items-center gap-2 pt-3 border-t ${
                isLight ? 'border-gray-200' : 'border-slate-700/50'
              }`}>
                <button className="flex-1 p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm font-medium transition-all">
                  <Eye size={14} className="inline mr-1" />
                  View
                </button>
                <button className="flex-1 p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-sm font-medium transition-all">
                  <Mail size={14} className="inline mr-1" />
                  Message
                </button>
                <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                  <Ban size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Pagination */}
      <div className={`md:hidden flex flex-col items-center gap-3 p-4 rounded-xl border ${
        isLight ? 'bg-white border-gray-200' : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        <div className={`text-sm font-medium ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-slate-900'
                : 'bg-slate-700/50 hover:bg-slate-700 text-white'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-slate-900'
                : 'bg-slate-700/50 hover:bg-slate-700 text-white'
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className={`px-3 py-2 rounded-lg border text-sm ${
            isLight
              ? 'bg-gray-100 border-gray-200 text-slate-900'
              : 'bg-slate-700/50 border-slate-600/50 text-white'
          }`}
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
