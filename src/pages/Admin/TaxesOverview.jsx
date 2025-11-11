import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Calendar, Download, DollarSign } from "lucide-react";
import { formatCurrency } from "../../utils/format.js";

export default function TaxesOverview() {
  const [period, setPeriod] = useState("month");

  const categoryData = [
    { name: "Retail Shops", value: 4500000, color: "#3b82f6" },
    { name: "Restaurants", value: 3200000, color: "#10b981" },
    { name: "Boutiques", value: 2800000, color: "#f59e0b" },
    { name: "Electronics", value: 1900000, color: "#8b5cf6" },
    { name: "Grocery Stores", value: 3600000, color: "#ec4899" },
  ];

  const dailyData = [
    { day: "Mon", amount: 180000 },
    { day: "Tue", amount: 210000 },
    { day: "Wed", amount: 160000 },
    { day: "Thu", amount: 240000 },
    { day: "Fri", amount: 260000 },
    { day: "Sat", amount: 190000 },
    { day: "Sun", amount: 150000 },
  ];

  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Taxes Overview</h1>
          <p className="text-slate-400 text-sm md:text-base">Detailed breakdown of tax collections</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm md:text-base font-medium shadow-md hover:shadow-lg transition-all">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Calendar size={20} className="text-blue-400" />
          <h2 className="font-semibold text-base md:text-lg text-white">Select Period</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["day", "week", "month", "year"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium capitalize transition-all ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
          <h2 className="font-semibold text-base md:text-lg text-white mb-3 md:mb-4">Tax Collection by Category</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
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

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
          <h2 className="font-semibold text-base md:text-lg text-white mb-3 md:mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-medium text-white">{cat.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{formatCurrency(cat.value)}</div>
                  <div className="text-xs text-slate-400">
                    {((cat.value / total) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-blue-400" />
                <span className="font-semibold text-white">Total Collection</span>
              </div>
              <div className="text-xl font-bold text-blue-400">{formatCurrency(total)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <h2 className="font-semibold text-base md:text-lg text-white mb-3 md:mb-4">Daily Tax Collection</h2>
        <div className="h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
