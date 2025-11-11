import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ title, value, sub, trend, icon: Icon }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
      <div className="flex items-start justify-between mb-3">
        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</div>
        {Icon && (
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Icon size={20} className="text-blue-400" />
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      {sub && (
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            trend > 0 ? (
              <span className="flex items-center gap-1 text-green-400">
                <TrendingUp size={14} /> +{trend}%
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-400">
                <TrendingDown size={14} /> {trend}%
              </span>
            )
          )}
          <span className="text-slate-400">{sub}</span>
        </div>
      )}
    </div>
  );
}
