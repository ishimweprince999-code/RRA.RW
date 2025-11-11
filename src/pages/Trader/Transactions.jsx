import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatCurrency, formatDate } from "../../utils/format.js";
import useTheme from "../../store/theme.js";
import { Search, Filter, Download, ChevronLeft, ChevronRight, TrendingUp, DollarSign, ShoppingBag, CheckCircle, Clock, XCircle, Calendar, ArrowUpRight } from "lucide-react";

const columnHelper = createColumnHelper();

export default function Transactions() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [globalFilter, setGlobalFilter] = useState("");
  const [range, setRange] = useState("week"); // day | week | month
  const [viewMode, setViewMode] = useState("table"); // table | cards
  
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
      { id: 1, product: "Shirt", amount: 15000, tax: 1500, status: "Paid", date: new Date() },
      { id: 2, product: "Shoes", amount: 45000, tax: 4500, status: "Pending", date: new Date(Date.now()-86400000) },
      { id: 3, product: "Bag", amount: 30000, tax: 3000, status: "Paid", date: new Date(Date.now()-2*86400000) },
      { id: 4, product: "Cap", amount: 8000, tax: 800, status: "Failed", date: new Date(Date.now()-3*86400000) },
      { id: 5, product: "Jacket", amount: 75000, tax: 7500, status: "Paid", date: new Date(Date.now()-4*86400000) },
      { id: 6, product: "Watch", amount: 120000, tax: 12000, status: "Paid", date: new Date(Date.now()-5*86400000) },
    ],
    []
  );
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = data.reduce((sum, t) => sum + t.amount, 0);
    const totalTax = data.reduce((sum, t) => sum + t.tax, 0);
    const paid = data.filter(t => t.status === "Paid").length;
    const pending = data.filter(t => t.status === "Pending").length;
    return { total, totalTax, paid, pending, count: data.length };
  }, [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("product", { header: "Product" }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className="font-semibold">{formatFRW(info.getValue())}</span>
        ),
      }),
      columnHelper.accessor("tax", {
        header: "Tax",
        cell: (info) => (
          <span className="text-yellow-500 font-medium">{formatFRW(info.getValue())}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const colors = {
            Paid: "bg-green-500/10 text-green-400 border-green-500/20",
            Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
            Failed: "bg-red-500/10 text-red-400 border-red-500/20",
          };
          const icons = {
            Paid: <CheckCircle size={12} />,
            Pending: <Clock size={12} />,
            Failed: <XCircle size={12} />,
          };
          return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors[status]}`}>
              {icons[status]}
              {status}
            </span>
          );
        },
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => formatDate(info.getValue()),
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
    globalFilterFn: (row, columnId, filterValue) => {
      const v = String(row.getValue(columnId)).toLowerCase();
      return v.includes(String(filterValue).toLowerCase());
    },
  });

  return (
    <div className="space-y-6">
      {/* Header with Rwanda Badge */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-2xl md:text-3xl font-bold ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>Transactions</h1>
            <div className="flex gap-1">
              <div className="w-1.5 h-6 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-6 rounded-full bg-yellow-400"></div>
              <div className="w-1.5 h-6 rounded-full bg-green-500"></div>
            </div>
          </div>
          <p className={`text-sm ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>View and manage all your transactions in <span className="font-bold text-blue-500">FRW</span></p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <Download size={18} />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10">
              <TrendingUp size={20} className="text-blue-500" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/10 text-blue-400'
            }`}>FRW</span>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Amount</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{formatFRW(stats.total)}</div>
        </div>

        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10">
              <DollarSign size={20} className="text-yellow-500" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              isLight ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-500/10 text-yellow-400'
            }`}>FRW</span>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Tax</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{formatFRW(stats.totalTax)}</div>
        </div>

        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-green-500/10">
              <CheckCircle size={20} className="text-green-500" />
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Paid Transactions</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{stats.paid} / {stats.count}</div>
        </div>

        <div className={`p-4 md:p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all ${
          isLight ? 'bg-white border-gray-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10">
              <Clock size={20} className="text-orange-500" />
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Pending</div>
          <div className={`text-xl md:text-2xl font-black ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{stats.pending}</div>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-gray-200' : 'bg-slate-800/50 border-slate-700/50'}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search product, status..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isLight
                  ? 'bg-gray-50 border-gray-200 text-slate-900 placeholder-slate-400'
                  : 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400'
              }`}
            />
          </div>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className={`px-4 py-2.5 rounded-lg border font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isLight
                ? 'bg-gray-50 border-gray-200 text-slate-900'
                : 'bg-slate-700/50 border-slate-600/50 text-white'
            }`}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Table - Hidden on small screens, replaced with cards */}
      <div className={`hidden md:block rounded-xl border overflow-hidden shadow-lg ${
        isLight ? 'bg-white border-gray-200' : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isLight ? 'bg-gray-50' : 'bg-slate-900/50'}>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className={`text-left px-4 py-3 cursor-pointer select-none font-semibold text-sm ${
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
                    : 'border-slate-700/50 hover:bg-slate-700/30'
                }`}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`px-4 py-3 text-sm ${
                      isLight ? 'text-slate-900' : 'text-slate-300'
                    }`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {table.getRowModel().rows.map((row) => {
          const rowData = row.original;
          const statusColors = {
            Paid: "bg-green-500/10 text-green-400 border-green-500/20",
            Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
            Failed: "bg-red-500/10 text-red-400 border-red-500/20",
          };
          const statusIcons = {
            Paid: <CheckCircle size={14} />,
            Pending: <Clock size={14} />,
            Failed: <XCircle size={14} />,
          };
          return (
            <div key={row.id} className={`p-4 rounded-xl border shadow-lg ${
              isLight ? 'bg-white border-gray-200' : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <ShoppingBag size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <div className={`font-bold text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>{rowData.product}</div>
                    <div className={`text-xs ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>{formatDate(rowData.date)}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[rowData.status]}`}>
                  {statusIcons[rowData.status]}
                  {rowData.status}
                </span>
              </div>
              <div className={`grid grid-cols-2 gap-3 pt-3 border-t ${
                isLight ? 'border-gray-200' : 'border-slate-700/50'
              }`}>
                <div>
                  <div className={`text-xs mb-1 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>Amount</div>
                  <div className={`font-bold text-base ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>{formatFRW(rowData.amount)}</div>
                </div>
                <div>
                  <div className={`text-xs mb-1 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>Tax</div>
                  <div className="font-bold text-base text-yellow-500">{formatFRW(rowData.tax)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border ${
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
            className={`inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-slate-900 border border-gray-300'
                : 'bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600/50'
            }`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()} 
            className={`inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-slate-900 border border-gray-300'
                : 'bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600/50'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className={`px-3 py-2 rounded-lg border font-medium transition-all ${
            isLight ? 'bg-gray-100 border-gray-300 text-slate-900' : 'bg-slate-700/50 border-slate-600/50 text-white'
          }`}
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      </div>
    </div>
  );
}
