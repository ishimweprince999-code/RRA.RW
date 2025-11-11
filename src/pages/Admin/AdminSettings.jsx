import { useState } from "react";
import { 
  Settings, Globe, Palette, Bell, Shield, Database, 
  Users, TrendingUp, Mail, MessageSquare, Smartphone,
  CheckCircle2, BarChart3, Eye, EyeOff, Download, Clock, Zap
} from "lucide-react";
import useLanguage from "../../store/language.js";
import useCurrency from "../../store/currency.js";
import useTheme from "../../store/theme.js";

export default function AdminSettings() {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { theme, setTheme } = useTheme();
  
  const [dashboardPrefs, setDashboardPrefs] = useState({
    showTaxTrend: true,
    showTransactionVolume: true,
    showTraderGrowth: true,
    showRevenueBreakdown: true,
    compactMode: false,
    animationsEnabled: true,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: false,
    traderRegistrations: true,
    systemAlerts: true,
    dailyReports: true,
    weeklyReports: true,
    criticalIssues: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    dataRetention: "365",
    sessionTimeout: "30",
    twoFactorAuth: false,
    apiAccess: true,
    auditLog: true,
  });

  const handleDashboardToggle = (key) => {
    setDashboardPrefs({ ...dashboardPrefs, [key]: !dashboardPrefs[key] });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSystemToggle = (key) => {
    setSystemSettings({ ...systemSettings, [key]: !systemSettings[key] });
  };

  const handleSave = () => {
    alert("Admin settings saved successfully! 🎉");
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-blue-600" : "bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Admin Settings</h1>
        <p className="text-slate-400 text-sm md:text-base">Customize your admin panel and system preferences</p>
      </div>

      {/* Dashboard Customization */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <BarChart3 size={20} className="text-blue-400" />
          <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">Dashboard Customization</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingUp size={18} className="text-green-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Tax Trend Chart</div>
                <div className="text-xs text-slate-400">Show on dashboard</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={dashboardPrefs.showTaxTrend} 
              onToggle={() => handleDashboardToggle("showTaxTrend")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <BarChart3 size={18} className="text-purple-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Transaction Volume</div>
                <div className="text-xs text-slate-400">Show on dashboard</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={dashboardPrefs.showTransactionVolume} 
              onToggle={() => handleDashboardToggle("showTransactionVolume")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users size={18} className="text-blue-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Trader Growth</div>
                <div className="text-xs text-slate-400">Show analytics</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={dashboardPrefs.showTraderGrowth} 
              onToggle={() => handleDashboardToggle("showTraderGrowth")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Zap size={18} className="text-yellow-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Compact Mode</div>
                <div className="text-xs text-slate-400">Dense layout</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={dashboardPrefs.compactMode} 
              onToggle={() => handleDashboardToggle("compactMode")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingUp size={18} className="text-green-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Animations</div>
                <div className="text-xs text-slate-400">Enable transitions</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={dashboardPrefs.animationsEnabled} 
              onToggle={() => handleDashboardToggle("animationsEnabled")} 
            />
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <Globe size={20} className="text-blue-400" />
          <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">Language & Region</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="RWF">RWF - Rwandan Franc</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <Palette size={20} className="text-purple-400" />
          <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">Appearance</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Theme</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["light", "dark", "auto"].map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                  theme === themeOption
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-slate-700/30 text-slate-400 hover:bg-slate-700/50"
                }`}
              >
                {themeOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <Bell size={20} className="text-yellow-400" />
          <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">Admin Notifications</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Mail size={18} className="text-green-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Email Alerts</div>
                <div className="text-xs text-slate-400">Admin notifications via email</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notifications.emailAlerts} 
              onToggle={() => handleNotificationToggle("emailAlerts")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <MessageSquare size={18} className="text-purple-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">SMS Alerts</div>
                <div className="text-xs text-slate-400">Critical alerts via SMS</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notifications.smsAlerts} 
              onToggle={() => handleNotificationToggle("smsAlerts")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users size={18} className="text-blue-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Trader Registrations</div>
                <div className="text-xs text-slate-400">New trader notifications</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notifications.traderRegistrations} 
              onToggle={() => handleNotificationToggle("traderRegistrations")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield size={18} className="text-red-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">System Alerts</div>
                <div className="text-xs text-slate-400">System status notifications</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notifications.systemAlerts} 
              onToggle={() => handleNotificationToggle("systemAlerts")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Download size={18} className="text-green-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Daily Reports</div>
                <div className="text-xs text-slate-400">Automated daily summaries</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notifications.dailyReports} 
              onToggle={() => handleNotificationToggle("dailyReports")} 
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Download size={18} className="text-blue-400" />
              <div>
                <div className="font-medium text-white text-sm sm:text-base">Weekly Reports</div>
                <div className="text-xs text-slate-400">Comprehensive weekly summaries</div>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notifications.weeklyReports} 
              onToggle={() => handleNotificationToggle("weeklyReports")} 
            />
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <Database size={20} className="text-green-400" />
          <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">System Settings</h2>
        </div>
        <div className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <Database size={18} className="text-blue-400" />
                <div>
                  <div className="font-medium text-white text-sm sm:text-base">Auto Backup</div>
                  <div className="text-xs text-slate-400">Daily automated backups</div>
                </div>
              </div>
              <ToggleSwitch 
                enabled={systemSettings.autoBackup} 
                onToggle={() => handleSystemToggle("autoBackup")} 
              />
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield size={18} className="text-red-400" />
                <div>
                  <div className="font-medium text-white text-sm sm:text-base">2FA</div>
                  <div className="text-xs text-slate-400">Two-factor authentication</div>
                </div>
              </div>
              <ToggleSwitch 
                enabled={systemSettings.twoFactorAuth} 
                onToggle={() => handleSystemToggle("twoFactorAuth")} 
              />
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield size={18} className="text-purple-400" />
                <div>
                  <div className="font-medium text-white text-sm sm:text-base">API Access</div>
                  <div className="text-xs text-slate-400">Enable API endpoints</div>
                </div>
              </div>
              <ToggleSwitch 
                enabled={systemSettings.apiAccess} 
                onToggle={() => handleSystemToggle("apiAccess")} 
              />
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <Eye size={18} className="text-yellow-400" />
                <div>
                  <div className="font-medium text-white text-sm sm:text-base">Audit Log</div>
                  <div className="text-xs text-slate-400">Track all admin actions</div>
                </div>
              </div>
              <ToggleSwitch 
                enabled={systemSettings.auditLog} 
                onToggle={() => handleSystemToggle("auditLog")} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Data Retention (days)</label>
              <input
                type="number"
                value={systemSettings.dataRetention}
                onChange={(e) => setSystemSettings({ ...systemSettings, dataRetention: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <CheckCircle2 size={20} />
          Save Admin Settings
        </button>
      </div>
    </div>
  );
}
