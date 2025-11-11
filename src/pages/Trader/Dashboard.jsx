import StatCard from "../../components/Cards/StatCard.jsx";
import LineTaxChart from "../../components/Charts/LineTaxChart.jsx";
import { formatDate } from "../../utils/format.js";
import useCurrency from "../../store/currency.js";
import useLanguage from "../../store/language.js";
import useTheme from "../../store/theme.js";
import { DollarSign, TrendingUp, Wallet, ShoppingBag, ArrowUpRight, Activity } from "lucide-react";

export default function Dashboard() {
  const { format: formatCurrency } = useCurrency();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Helper to format FRW prominently
  const formatFRW = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M FRW`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K FRW`;
    }
    return `${amount.toLocaleString()} FRW`;
  };
  
  const stats = {
    sales: 1200000,
    tax: 120000,
    income: 1080000,
  };
  const recent = [
    { id:1, product:"Shirt", amount:15000, tax:1500, status:"Paid", date: new Date() },
    { id:2, product:"Shoes", amount:45000, tax:4500, status:"Pending", date: new Date(Date.now() - 3600000) },
    { id:3, product:"Bag", amount:30000, tax:3000, status:"Paid", date: new Date(Date.now() - 7200000) },
  ];
  const chart = [
    { label: "Mon", tax: 18000 },
    { label: "Tue", tax: 21000 },
    { label: "Wed", tax: 16000 },
    { label: "Thu", tax: 24000 },
    { label: "Fri", tax: 26000 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Paid": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Pending": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Failed": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Rwanda Badge */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-2xl md:text-3xl font-bold ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>Dashboard</h1>
            <div className="flex gap-1">
              <div className="w-1.5 h-6 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-6 rounded-full bg-yellow-400"></div>
              <div className="w-1.5 h-6 rounded-full bg-green-500"></div>
            </div>
          </div>
          <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
            Welcome back! Here's your business overview in <span className="font-bold text-blue-500">FRW</span>
          </p>
        </div>
        <div className={`px-4 py-2 rounded-xl border ${
          isLight
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-green-500/10 border-green-500/20 text-green-400'
        } flex items-center gap-2`}>
          <Activity size={16} />
          <span className="text-sm font-semibold">Live Updates</span>
        </div>
      </div>

      {/* Enhanced Stats Cards with FRW */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className={`p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-gray-200'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <ShoppingBag size={24} className="text-blue-500" />
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isLight
                ? 'bg-green-100 text-green-700'
                : 'bg-green-500/10 text-green-400'
            } flex items-center gap-1`}>
              <ArrowUpRight size={12} />
              +12.5%
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Sales</div>
          <div className={`text-2xl md:text-3xl font-black mb-1 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{formatFRW(stats.sales)}</div>
          <div className={`text-xs ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>vs last month</div>
        </div>
        
        <div className={`p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-gray-200'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-yellow-500/10">
              <DollarSign size={24} className="text-yellow-500" />
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isLight
                ? 'bg-green-100 text-green-700'
                : 'bg-green-500/10 text-green-400'
            } flex items-center gap-1`}>
              <ArrowUpRight size={12} />
              +8.2%
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Tax Paid</div>
          <div className={`text-2xl md:text-3xl font-black mb-1 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{formatFRW(stats.tax)}</div>
          <div className={`text-xs ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>vs last month</div>
        </div>
        
        <div className={`p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-gray-200'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/10">
              <Wallet size={24} className="text-green-500" />
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isLight
                ? 'bg-green-100 text-green-700'
                : 'bg-green-500/10 text-green-400'
            } flex items-center gap-1`}>
              <ArrowUpRight size={12} />
              +15.3%
            </div>
          </div>
          <div className={`text-xs font-semibold mb-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>Total Income</div>
          <div className={`text-2xl md:text-3xl font-black mb-1 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>{formatFRW(stats.income)}</div>
          <div className={`text-xs ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>vs last month</div>
        </div>
      </div>

      <LineTaxChart data={chart} />

      <div className={`rounded-2xl border shadow-xl p-6 ${
        isLight
          ? 'bg-white border-gray-200'
          : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className={`font-bold text-lg ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>Recent Transactions</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              isLight
                ? 'bg-blue-100 text-blue-700'
                : 'bg-blue-500/10 text-blue-400'
            }`}>FRW</span>
          </div>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold transition-colors">View All →</button>
        </div>
        <div className="space-y-3">
          {recent.map((t)=>(
            <div key={t.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.01] ${
              isLight
                ? 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                : 'bg-slate-700/30 hover:bg-slate-700/50 border-slate-700/50'
            }`}>
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <ShoppingBag size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className={`font-semibold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>{t.product}</div>
                  <div className={`text-xs ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>{formatDate(t.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>{formatFRW(t.amount)}</div>
                  <div className={`text-xs ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>Tax: {formatFRW(t.tax)}</div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(t.status)}`}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
