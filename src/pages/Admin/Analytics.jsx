import { LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, MapPin } from "lucide-react";
import { formatCurrency } from "../../utils/format.js";

export default function Analytics() {
  const kpis = [
    { label: "Total Revenue", value: "16.2B RWF", trend: 12.5, icon: DollarSign, color: "blue" },
    { label: "Active Traders", value: "12,430", trend: 8.2, icon: Users, color: "green" },
    { label: "Avg Transaction", value: "45K RWF", trend: -3.1, icon: Activity, color: "purple" },
    { label: "Collection Rate", value: "96.8%", trend: 2.4, icon: TrendingUp, color: "yellow" },
  ];

  const trendData = [
    { month: "Jan", revenue: 980000000, transactions: 12400 },
    { month: "Feb", revenue: 1050000000, transactions: 13200 },
    { month: "Mar", revenue: 1180000000, transactions: 14100 },
    { month: "Apr", revenue: 1240000000, transactions: 15300 },
    { month: "May", revenue: 1380000000, transactions: 16800 },
    { month: "Jun", revenue: 1560000000, transactions: 18200 },
  ];

  const districtData = [
    { district: "Kigali", amount: 8500000 },
    { district: "Huye", amount: 2300000 },
    { district: "Musanze", amount: 1900000 },
    { district: "Rubavu", amount: 1600000 },
    { district: "Others", amount: 1700000 },
  ];

  const topTraders = [
    { name: "John's Electronics", sales: 2100000, rank: 1 },
    { name: "Jane's Boutique", sales: 1850000, rank: 2 },
    { name: "Bob's Market", sales: 1720000, rank: 3 },
    { name: "Alice's Restaurant", sales: 1650000, rank: 4 },
    { name: "Charlie's Store", sales: 1580000, rank: 5 },
  ];

  const getColorByName = (name) => {
    const colors = { blue: "text-blue-400", green: "text-green-400", purple: "text-purple-400", yellow: "text-yellow-400" };
    return colors[name] || "text-slate-400";
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Analytics Dashboard</h1>
        <p className="text-slate-400 text-sm md:text-base">Advanced insights and performance trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-400 text-sm uppercase tracking-wider">{kpi.label}</div>
                <Icon size={20} className={getColorByName(kpi.color)} />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{kpi.value}</div>
              <div className="flex items-center gap-1 text-sm">
                {kpi.trend > 0 ? (
                  <>
                    <TrendingUp size={14} className="text-green-400" />
                    <span className="text-green-400">+{kpi.trend}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={14} className="text-red-400" />
                    <span className="text-red-400">{kpi.trend}%</span>
                  </>
                )}
                <span className="text-slate-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
          <h2 className="font-semibold text-base md:text-lg text-white mb-3 md:mb-4">Revenue Trend (6 Months)</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f622" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
          <h2 className="font-semibold text-base md:text-lg text-white mb-3 md:mb-4">Transaction Volume</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
                <Bar dataKey="transactions" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <MapPin size={20} className="text-blue-400" />
            <h2 className="font-semibold text-base md:text-lg text-white">District-wise Collections</h2>
          </div>
          <div className="space-y-3">
            {districtData.map((d, i) => (
              <div key={d.district} className="flex items-center gap-3">
                <div className="text-slate-400 text-sm w-8">#{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{d.district}</span>
                    <span className="text-sm text-slate-400">{formatCurrency(d.amount)}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                      style={{ width: `${(d.amount / Math.max(...districtData.map((x) => x.amount))) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
          <h2 className="font-semibold text-base md:text-lg text-white mb-3 md:mb-4">Top Earning Traders</h2>
          <div className="space-y-3">
            {topTraders.map((t) => (
              <div key={t.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-400">
                    {t.rank}
                  </div>
                  <span className="font-medium text-white">{t.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{formatCurrency(t.sales)}</div>
                  <div className="text-xs text-slate-400">Total Sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
