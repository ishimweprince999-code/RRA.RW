import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

export default function AdminDashboard() {
  const overview = [
    { label: "Taxes Collected", value: "1.2B RWF" },
    { label: "Active Traders", value: "12,430" },
    { label: "Today’s Txns", value: "3,214" },
  ];
  const trend = [
    { d: "Mon", tax: 180_000_000, txns: 4200 },
    { d: "Tue", tax: 210_000_000, txns: 4600 },
    { d: "Wed", tax: 160_000_000, txns: 3800 },
    { d: "Thu", tax: 240_000_000, txns: 5100 },
    { d: "Fri", tax: 260_000_000, txns: 5300 },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {overview.map((c) => (
          <div key={c.label} className="bg-card border border-white/10 rounded-lg p-4">
            <div className="text-white/70 text-sm">{c.label}</div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="bg-card border border-white/10 rounded-lg p-4 md:p-5 h-64 sm:h-72 md:h-80">
          <div className="mb-2 font-semibold text-base md:text-lg">Taxes Trend</div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <XAxis dataKey="d" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip formatter={(v)=> new Intl.NumberFormat().format(v)} />
              <Area type="monotone" dataKey="tax" stroke="#1F6FEB" fill="#1F6FEB22" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-white/10 rounded-lg p-4 md:p-5 h-64 sm:h-72 md:h-80">
          <div className="mb-2 font-semibold text-base md:text-lg">Transactions Volume</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend}>
              <XAxis dataKey="d" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="txns" fill="#16A34A" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
