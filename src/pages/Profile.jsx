import { useState, useRef } from "react";
import { User, Mail, Phone, CreditCard, Lock, Camera, Save, Shield, Building2, Upload, X } from "lucide-react";
import useAuth from "../store/auth.js";
import { formatCurrency } from "../utils/format.js";

export default function Profile() {
  const { user, role } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [form, setForm] = useState({
    name: user?.name || "Trader Joe",
    email: "trader@example.com",
    phone: "+250788123456",
    momo: "+250788123456",
    category: "Retail Shop",
  });
  const [changingPin, setChangingPin] = useState(false);
  const [pinForm, setPinForm] = useState({ current: "", new: "", confirm: "" });

  const stats = [
    { label: "Total Sales", value: formatCurrency(1200000) },
    { label: "Total Tax Paid", value: formatCurrency(120000) },
    { label: "Transactions", value: "156" },
    { label: "Member Since", value: "Jan 2024" },
  ];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }
      
      setProfileImage(file);
      
      // Create preview
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
    // In a real app, upload the image to the server here
    if (profileImage) {
      console.log("Uploading profile image:", profileImage);
      // Example: await uploadImage(profileImage);
    }
    alert("Profile updated successfully!");
    setEditing(false);
  };

  const handlePinChange = () => {
    if (pinForm.new !== pinForm.confirm) {
      alert("PINs don't match!");
      return;
    }
    alert("PIN changed successfully!");
    setChangingPin(false);
    setPinForm({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
        <p className="text-slate-400">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
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
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-xl"
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
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    {user?.name?.charAt(0) || "T"}
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
              <p className="text-xs text-slate-400 mb-4">Click camera icon to upload image (Max 5MB)</p>
              <h2 className="text-xl font-bold text-white">{form.name}</h2>
              <p className="text-sm text-blue-400 capitalize mb-4">{role}</p>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                <Shield size={14} />
                <span>Verified Account</span>
              </div>
            </div>

            {role === "trader" && (
              <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                <h3 className="font-semibold text-white text-sm mb-3">Quick Stats</h3>
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{stat.label}</span>
                    <span className="font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg text-white">Personal Information</h2>
              <button
                onClick={() => (editing ? handleSave() : setEditing(true))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all"
              >
                {editing ? (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                ) : (
                  "Edit Profile"
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <User size={16} className="text-blue-400" />
                  Full Name
                </label>
                <input
                  disabled={!editing}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Phone size={16} className="text-purple-400" />
                  Phone Number
                </label>
                <input
                  disabled={!editing}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <CreditCard size={16} className="text-yellow-400" />
                  Mobile Money
                </label>
                <input
                  disabled={!editing}
                  value={form.momo}
                  onChange={(e) => setForm({ ...form, momo: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all"
                />
              </div>

              {role === "trader" && (
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <Building2 size={16} className="text-orange-400" />
                    Business Category
                  </label>
                  <select
                    disabled={!editing}
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all"
                  >
                    <option>Retail Shop</option>
                    <option>Restaurant</option>
                    <option>Boutique</option>
                    <option>Electronics</option>
                    <option>Grocery Store</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-lg text-white">Security</h2>
                <p className="text-sm text-slate-400">Manage your PIN and security settings</p>
              </div>
              <button
                onClick={() => setChangingPin(!changingPin)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition-all"
              >
                <Lock size={16} />
                Change PIN
              </button>
            </div>

            {changingPin && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-700/30">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Current PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinForm.current}
                    onChange={(e) => setPinForm({ ...pinForm, current: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinForm.new}
                    onChange={(e) => setPinForm({ ...pinForm, new: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Confirm PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinForm.confirm}
                    onChange={(e) => setPinForm({ ...pinForm, confirm: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-3 flex gap-2">
                  <button
                    onClick={handlePinChange}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                  >
                    Update PIN
                  </button>
                  <button
                    onClick={() => {
                      setChangingPin(false);
                      setPinForm({ current: "", new: "", confirm: "" });
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
