import { useState, useEffect } from "react";
import { Bell, Globe, Palette, Shield, Smartphone, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import useLanguage from "../store/language.js";
import useCurrency from "../store/currency.js";
import useTheme from "../store/theme.js";

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: true,
    pushNotif: false,
    transactionAlerts: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  // Sync language state
  useEffect(() => {
    // Language is already persisted in the store
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400">Manage your preferences and notifications</p>
      </div>

      {/* Language & Region */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe size={20} className="text-blue-400" />
          <h2 className="font-semibold text-lg text-white">Language & Region</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">Français</option>
            </select>
            <p className="text-xs text-slate-400 mt-2">The entire system will update to your selected language</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="RWF">RWF - Rwandan Franc</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
            <p className="text-xs text-slate-400 mt-2">All amounts will be converted and displayed in {currency}</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette size={20} className="text-purple-400" />
          <h2 className="font-semibold text-lg text-white">Appearance</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Theme</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
          <p className="text-xs text-slate-400 mt-2">Choose how SmartTax looks to you. Changes apply instantly!</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell size={20} className="text-yellow-400" />
          <h2 className="font-semibold text-lg text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-green-400" />
              <div>
                <div className="font-medium text-white">Email Notifications</div>
                <div className="text-xs text-slate-400">Receive updates via email</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("emailNotif")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotif ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotif ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-purple-400" />
              <div>
                <div className="font-medium text-white">SMS Notifications</div>
                <div className="text-xs text-slate-400">Receive updates via SMS</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("smsNotif")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.smsNotif ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsNotif ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-blue-400" />
              <div>
                <div className="font-medium text-white">Push Notifications</div>
                <div className="text-xs text-slate-400">Receive push notifications on mobile</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("pushNotif")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.pushNotif ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.pushNotif ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle2 size={20} className="text-green-400" />
          <h2 className="font-semibold text-lg text-white">Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
            <div>
              <div className="font-medium text-white">Transaction Alerts</div>
              <div className="text-xs text-slate-400">Get notified for every transaction</div>
            </div>
            <button
              onClick={() => handleToggle("transactionAlerts")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.transactionAlerts ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.transactionAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
            <div>
              <div className="font-medium text-white">Weekly Reports</div>
              <div className="text-xs text-slate-400">Receive weekly summary reports</div>
            </div>
            <button
              onClick={() => handleToggle("weeklyReports")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.weeklyReports ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.weeklyReports ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
            <div>
              <div className="font-medium text-white">Marketing Emails</div>
              <div className="text-xs text-slate-400">Receive tips and updates from SmartTax</div>
            </div>
            <button
              onClick={() => handleToggle("marketingEmails")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.marketingEmails ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.marketingEmails ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
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
          Save Settings
        </button>
      </div>
    </div>
  );
}
