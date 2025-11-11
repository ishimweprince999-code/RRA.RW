import { useState } from "react";
import { Download, FileText, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "../../utils/format.js";

export default function Reports() {
  const [period, setPeriod] = useState("month");
  const [loading, setLoading] = useState(false);

  const summary = {
    totalSales: 1200000,
    totalTax: 120000,
    totalIncome: 1080000,
    transactions: 156,
  };

  const categoryData = [
    { name: "Electronics", value: 450000, color: "#3b82f6" },
    { name: "Clothing", value: 380000, color: "#10b981" },
    { name: "Food", value: 220000, color: "#f59e0b" },
    { name: "Others", value: 150000, color: "#8b5cf6" },
  ];

  const handleExport = (format) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Exporting report as ${format.toUpperCase()}...`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Reports</h1>
          <p className="text-slate-400">Generate and export your business reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("pdf")}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Download size={16} />
            Export PDF
          </button>
          <button
            onClick={() => handleExport("csv")}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-blue-400" />
          <h2 className="font-semibold text-lg text-white">Select Period</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["day", "week", "month", "year"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                period === p
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-slate-700/30 text-slate-400 hover:bg-slate-700/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-slate-400 text-sm">Total Sales</div>
            <DollarSign size={20} className="text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(summary.totalSales)}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-slate-400 text-sm">Total Tax</div>
            <TrendingUp size={20} className="text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(summary.totalTax)}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-slate-400 text-sm">Total Income</div>
            <DollarSign size={20} className="text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(summary.totalIncome)}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-slate-400 text-sm">Transactions</div>
            <FileText size={20} className="text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.transactions}</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
        <h2 className="font-semibold text-lg text-white mb-4">Sales by Category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
