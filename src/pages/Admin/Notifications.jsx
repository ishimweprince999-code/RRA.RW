import { useState } from "react";
import { 
  Bell, Check, X, AlertCircle, Info, CheckCircle, 
  Users, TrendingUp, Shield, Database, Calendar, Filter
} from "lucide-react";

export default function AdminNotifications() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "15 New Trader Registrations",
      message: "15 traders successfully registered today. All documents verified.",
      time: "2 hours ago",
      read: false,
      icon: Users,
      color: "green"
    },
    {
      id: 2,
      type: "warning",
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM UTC.",
      time: "5 hours ago",
      read: false,
      icon: Shield,
      color: "yellow"
    },
    {
      id: 3,
      type: "info",
      title: "Daily Report Generated",
      message: "Your daily tax collection report is ready for download.",
      time: "1 day ago",
      read: true,
      icon: TrendingUp,
      color: "blue"
    },
    {
      id: 4,
      type: "error",
      title: "Failed Login Attempts",
      message: "Multiple failed login attempts detected from IP: 192.168.1.100",
      time: "1 day ago",
      read: false,
      icon: Shield,
      color: "red"
    },
    {
      id: 5,
      type: "success",
      title: "Backup Completed",
      message: "Daily database backup completed successfully. Size: 2.4 GB",
      time: "2 days ago",
      read: true,
      icon: Database,
      color: "green"
    },
    {
      id: 6,
      type: "info",
      title: "Weekly Summary Available",
      message: "Your weekly performance summary is now available.",
      time: "3 days ago",
      read: true,
      icon: TrendingUp,
      color: "blue"
    },
  ]);

  const getIconColor = (color) => {
    const colors = {
      green: "text-green-400 bg-green-400/10",
      yellow: "text-yellow-400 bg-yellow-400/10",
      blue: "text-blue-400 bg-blue-400/10",
      red: "text-red-400 bg-red-400/10",
    };
    return colors[color] || colors.blue;
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Notifications</h1>
          <p className="text-slate-400 text-sm md:text-base">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm sm:text-base"
        >
          <CheckCircle size={16} />
          Mark All Read
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} className="text-blue-400" />
          <h2 className="font-semibold text-white text-sm sm:text-base">Filter</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "unread", "read", "success", "warning", "error", "info"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium capitalize transition-all text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700/30 text-slate-400 hover:bg-slate-700/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-8 text-center">
            <Bell size={48} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-gradient-to-br from-slate-800 to-slate-900 border rounded-xl shadow-xl p-4 sm:p-5 transition-all ${
                notification.read 
                  ? "border-slate-700/50 opacity-75" 
                  : "border-blue-500/30 shadow-blue-500/10"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${getIconColor(notification.color)} flex items-center justify-center flex-shrink-0`}>
                  <notification.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{notification.message}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar size={12} />
                    {notification.time}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-400 transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-colors"
                    title="Delete"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
