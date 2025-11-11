import { useState, useEffect } from "react";
import { 
  Activity, Server, Database, HardDrive, Cpu, 
  Wifi, Shield, AlertTriangle, CheckCircle, TrendingUp,
  Clock, Zap, Globe, Users
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function SystemHealth() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 38,
    networkLatency: 23,
    activeUsers: 2341,
    requestsPerMinute: 1520,
  });

  const [systemStatus, setSystemStatus] = useState([
    { name: "API Server", status: "healthy", uptime: "99.9%", icon: Server, color: "green" },
    { name: "Database", status: "healthy", uptime: "99.8%", icon: Database, color: "green" },
    { name: "Storage", status: "warning", uptime: "98.5%", icon: HardDrive, color: "yellow" },
    { name: "Authentication", status: "healthy", uptime: "100%", icon: Shield, color: "green" },
    { name: "Network", status: "healthy", uptime: "99.7%", icon: Wifi, color: "green" },
    { name: "Payment Gateway", status: "healthy", uptime: "99.9%", icon: Zap, color: "green" },
  ]);

  const [performanceData] = useState([
    { time: "00:00", cpu: 30, memory: 45, requests: 800 },
    { time: "04:00", cpu: 25, memory: 42, requests: 600 },
    { time: "08:00", cpu: 50, memory: 65, requests: 1800 },
    { time: "12:00", cpu: 60, memory: 70, requests: 2200 },
    { time: "16:00", cpu: 55, memory: 68, requests: 2000 },
    { time: "20:00", cpu: 45, memory: 60, requests: 1500 },
    { time: "Now", cpu: systemMetrics.cpuUsage, memory: systemMetrics.memoryUsage, requests: systemMetrics.requestsPerMinute },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      healthy: { bg: "bg-green-400/10", text: "text-green-400", border: "border-green-500/30" },
      warning: { bg: "bg-yellow-400/10", text: "text-yellow-400", border: "border-yellow-500/30" },
      error: { bg: "bg-red-400/10", text: "text-red-400", border: "border-red-500/30" },
    };
    return colors[status] || colors.healthy;
  };

  const getMetricStatus = (value) => {
    if (value < 50) return "green";
    if (value < 80) return "yellow";
    return "red";
  };

  const MetricCard = ({ label, value, icon: Icon, unit = "%" }) => {
    const status = getMetricStatus(value);
    const colors = {
      green: "text-green-400 bg-green-400/10",
      yellow: "text-yellow-400 bg-yellow-400/10",
      red: "text-red-400 bg-red-400/10",
    };

    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${colors[status]} flex items-center justify-center`}>
            <Icon size={20} className={colors[status].split(' ')[0]} />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold ${colors[status].split(' ')[0]}`}>
            {value}{unit}
          </div>
        </div>
        <div className="text-sm text-slate-400">{label}</div>
        <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${colors[status].split(' ')[1].replace('text', 'bg')}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">System Health</h1>
        <p className="text-slate-400 text-sm md:text-base">Monitor system performance and status</p>
      </div>

      {/* Real-time Metrics */}
      <div>
        <h2 className="font-semibold text-lg md:text-xl text-white mb-3 sm:mb-4">Real-time Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard label="CPU Usage" value={systemMetrics.cpuUsage} icon={Cpu} />
          <MetricCard label="Memory Usage" value={systemMetrics.memoryUsage} icon={Activity} />
          <MetricCard label="Disk Usage" value={systemMetrics.diskUsage} icon={HardDrive} />
          <MetricCard label="Network Latency" value={systemMetrics.networkLatency} icon={Wifi} unit="ms" />
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-400/10 flex items-center justify-center mb-3">
              <Users size={20} className="text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-400">{systemMetrics.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-400/10 flex items-center justify-center mb-3">
              <TrendingUp size={20} className="text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">{systemMetrics.requestsPerMinute.toLocaleString()}</div>
            <div className="text-sm text-slate-400">Requests/Min</div>
          </div>
        </div>
      </div>

      {/* System Components Status */}
      <div>
        <h2 className="font-semibold text-lg md:text-xl text-white mb-3 sm:mb-4">System Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {systemStatus.map((component, idx) => {
            const statusColors = getStatusColor(component.status);
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br from-slate-800 to-slate-900 border ${statusColors.border} rounded-xl shadow-xl p-4 sm:p-5`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${statusColors.bg} flex items-center justify-center`}>
                    <component.icon size={20} className={statusColors.text} />
                  </div>
                  {component.status === "healthy" ? (
                    <CheckCircle size={20} className="text-green-400" />
                  ) : (
                    <AlertTriangle size={20} className="text-yellow-400" />
                  )}
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base mb-1">{component.name}</h3>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className={`capitalize ${statusColors.text} font-medium`}>{component.status}</span>
                  <span className="text-slate-400">Uptime: {component.uptime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Charts */}
      <div>
        <h2 className="font-semibold text-lg md:text-xl text-white mb-3 sm:mb-4">24-Hour Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">CPU & Memory Usage</h3>
            <div className="h-48 sm:h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} name="Memory %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Requests Per Minute</h3>
            <div className="h-48 sm:h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="requests" stroke="#10b981" strokeWidth={2} name="Requests" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <h2 className="font-semibold text-lg md:text-xl text-white mb-4">System Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mb-1">
              <Clock size={14} />
              Last Restart
            </div>
            <div className="text-white font-semibold text-sm sm:text-base">5 days ago</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mb-1">
              <Globe size={14} />
              Server Region
            </div>
            <div className="text-white font-semibold text-sm sm:text-base">East Africa</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mb-1">
              <Server size={14} />
              Server Version
            </div>
            <div className="text-white font-semibold text-sm sm:text-base">v2.4.1</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mb-1">
              <Database size={14} />
              DB Version
            </div>
            <div className="text-white font-semibold text-sm sm:text-base">PostgreSQL 15</div>
          </div>
        </div>
      </div>
    </div>
  );
}
