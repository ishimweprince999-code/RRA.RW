import { useState, useRef } from "react";
import { 
  User, Mail, Phone, Lock, Camera, Save, Shield, 
  Building2, X, Award, TrendingUp, Users, Database,
  Clock, MapPin, Globe, Briefcase, Calendar
} from "lucide-react";
import useAuth from "../../store/auth.js";

export default function AdminProfile() {
  const { user, role } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [form, setForm] = useState({
    name: user?.name || "Admin User",
    email: "admin@smarttax.rw",
    phone: "+250788123456",
    department: "Tax Administration",
    position: "Senior Administrator",
    location: "Kigali, Rwanda",
    bio: "Senior administrator managing SmartTax platform operations.",
  });

  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ 
    current: "", 
    new: "", 
    confirm: "" 
  });

  const adminStats = [
    { 
      label: "Total Traders", 
      value: "12,430", 
      icon: Users, 
      color: "text-blue-400",
      bgColor: "bg-blue-400/10" 
    },
    { 
      label: "Taxes Collected", 
      value: "1.2B RWF", 
      icon: TrendingUp, 
      color: "text-green-400",
      bgColor: "bg-green-400/10" 
    },
    { 
      label: "System Uptime", 
      value: "99.9%", 
      icon: Shield, 
      color: "text-purple-400",
      bgColor: "bg-purple-400/10" 
    },
    { 
      label: "Active Sessions", 
      value: "2,341", 
      icon: Database, 
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10" 
    },
  ];

  const recentActivities = [
    { action: "Approved 15 new trader registrations", time: "2 hours ago", icon: Users },
    { action: "Generated monthly tax report", time: "5 hours ago", icon: TrendingUp },
    { action: "Updated system configurations", time: "1 day ago", icon: Shield },
    { action: "Reviewed compliance documents", time: "2 days ago", icon: Award },
  ];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (profileImage) {
      console.log("Uploading profile image:", profileImage);
    }
    alert("Admin profile updated successfully! 🎉");
    setEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert("Passwords don't match!");
      return;
    }
    if (passwordForm.new.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    alert("Password changed successfully! 🔒");
    setChangingPassword(false);
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Admin Profile</h1>
        <p className="text-slate-400 text-sm md:text-base">Manage your admin account and view statistics</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {adminStats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-3 sm:p-4 md:p-5"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2 sm:mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
            <div className="text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="relative inline-block mb-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
                      title="Remove image"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold text-white shadow-xl">
                    {user?.name?.charAt(0) || "A"}
                  </div>
                )}
                <button
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg group"
                  title="Upload profile picture"
                >
                  <Camera size={16} className="text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">Click camera to upload (Max 5MB)</p>
              <h2 className="text-lg sm:text-xl font-bold text-white">{form.name}</h2>
              <p className="text-sm text-blue-400 capitalize mb-2">{form.position}</p>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">{form.department}</p>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
                <Shield size={14} />
                <span>Admin Access</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm">
                <MapPin size={14} />
                <span>{form.location}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="font-semibold text-white text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-medium transition-colors flex items-center gap-2">
                  <TrendingUp size={16} />
                  View Reports
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-400 text-sm font-medium transition-colors flex items-center gap-2">
                  <Users size={16} />
                  Manage Traders
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 text-sm font-medium transition-colors flex items-center gap-2">
                  <Shield size={16} />
                  System Health
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info & Activities */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Personal Information */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
              <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">Personal Information</h2>
              <button
                onClick={() => (editing ? handleSave() : setEditing(true))}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-medium transition-all"
              >
                {editing ? (
                  <>
                    <Save size={16} />
                    Save
                  </>
                ) : (
                  "Edit"
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <User size={16} className="text-blue-400" />
                  Full Name
                </label>
                <input
                  disabled={!editing}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Mail size={16} className="text-green-400" />
                  Email
                </label>
                <input
                  disabled={!editing}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Phone size={16} className="text-purple-400" />
                  Phone
                </label>
                <input
                  disabled={!editing}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Briefcase size={16} className="text-yellow-400" />
                  Position
                </label>
                <input
                  disabled={!editing}
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Building2 size={16} className="text-orange-400" />
                  Department
                </label>
                <input
                  disabled={!editing}
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <MapPin size={16} className="text-red-400" />
                  Location
                </label>
                <input
                  disabled={!editing}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <User size={16} className="text-blue-400" />
                  Bio
                </label>
                <textarea
                  disabled={!editing}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all text-sm sm:text-base resize-none"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
              <div>
                <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white">Security</h2>
                <p className="text-xs sm:text-sm text-slate-400">Manage your password and security</p>
              </div>
              <button
                onClick={() => setChangingPassword(!changingPassword)}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm sm:text-base font-medium transition-all"
              >
                <Lock size={16} />
                Change Password
              </button>
            </div>

            {changingPassword && (
              <div className="space-y-4 p-4 rounded-lg bg-slate-700/30">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors text-sm sm:text-base"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => {
                      setChangingPassword(false);
                      setPasswordForm({ current: "", new: "", confirm: "" });
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-4 sm:p-5 md:p-6">
            <h2 className="font-semibold text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-5">Recent Activities</h2>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <activity.icon size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-white font-medium">{activity.action}</p>
                    <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1 mt-1">
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
