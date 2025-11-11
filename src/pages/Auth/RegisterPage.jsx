import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../store/auth.js";
import { User, Building2, Phone, CreditCard, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name:"", category:"", phone:"", momo:"", pin:"" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuth((s)=>s.login);

  const categories = [
    "Retail Shop", "Restaurant", "Boutique", "Electronics", "Grocery Store", "Other"
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>{
      login({ token:"mock-trader", role:"trader", user:{ name: form.name }});
      navigate("/trader/dashboard", { replace:true });
    }, 1000);
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
              <User size={32} className="text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Trader Registration</h1>
            <p className="text-slate-400">Join SmartTax and simplify your business tax payment</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <User size={16} className="text-blue-400" />
                  Full Name
                </label>
                <input 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e)=>setForm({...form, name:e.target.value})}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Building2 size={16} className="text-green-400" />
                  Business Category
                </label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={form.category}
                  onChange={(e)=>setForm({...form, category:e.target.value})}
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Phone size={16} className="text-purple-400" />
                  Phone Number
                </label>
                <input 
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+250 XXX XXX XXX"
                  value={form.phone}
                  onChange={(e)=>setForm({...form, phone:e.target.value})}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <CreditCard size={16} className="text-yellow-400" />
                  Mobile Money Number
                </label>
                <input 
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+250 XXX XXX XXX"
                  value={form.momo}
                  onChange={(e)=>setForm({...form, momo:e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Lock size={16} className="text-red-400" />
                  4-Digit PIN
                </label>
                <input 
                  required
                  type="password"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Create a secure 4-digit PIN"
                  value={form.pin}
                  onChange={(e)=>setForm({...form, pin:e.target.value})}
                />
                <p className="text-xs text-slate-400 mt-1">This PIN will be used to authorize transactions</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle2 size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                  <p className="font-medium text-white mb-1">Benefits of SmartTax Registration</p>
                  <ul className="space-y-1 text-slate-400">
                    <li>• Automated tax calculation and deduction</li>
                    <li>• Real-time business analytics dashboard</li>
                    <li>• Secure mobile money integration</li>
                    <li>• Compliance with Rwanda Revenue Authority</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register as Trader"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
