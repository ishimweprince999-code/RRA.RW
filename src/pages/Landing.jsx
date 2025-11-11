import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, BarChart3, CheckCircle, Users, DollarSign, TrendingUp, Star, Clock, Smartphone, Award, Menu, X, ChevronDown, Globe, Lock, FileText, HeadphonesIcon } from "lucide-react";
import useTheme from "../store/theme.js";

export default function Landing() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [stats, setStats] = useState({
    traders: 0,
    transactions: 0,
    revenue: 0,
    rating: 4.8
  });

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    const targets = {
      traders: 12430,
      transactions: 156000,
      revenue: 16200000000
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats({
        traders: Math.floor((targets.traders / steps) * step),
        transactions: Math.floor((targets.transactions / steps) * step),
        revenue: Math.floor((targets.revenue / steps) * step),
        rating: 4.8
      });
      
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Zap, title: "Auto Tax Deduction", desc: "Automated tax calculation on every sale", color: "yellow" },
    { icon: Shield, title: "MoMo Integration", desc: "Seamless MTN & Airtel Money payments", color: "green" },
    { icon: BarChart3, title: "Real-time Analytics", desc: "Track your business performance live", color: "blue" },
    { icon: Smartphone, title: "Mobile Friendly", desc: "Access from any device, anywhere", color: "purple" },
    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance in Kinyarwanda", color: "orange" },
    { icon: Award, title: "RRA Approved", desc: "Official Rwanda Revenue Authority partner", color: "red" },
    { icon: Lock, title: "Secure & Encrypted", desc: "Bank-level security for your transactions", color: "blue" },
    { icon: Globe, title: "Multi-Language", desc: "English, Kinyarwanda, and French support", color: "green" },
    { icon: FileText, title: "Easy Reporting", desc: "Generate tax reports in seconds", color: "purple" },
  ];

  const testimonials = [
    {
      name: "Jean-Claude Habimana",
      role: "Retail Shop Owner",
      comment: "SmartTax has simplified my business operations. Tax payments are now automatic and hassle-free!",
      rating: 5,
      avatar: "JH"
    },
    {
      name: "Marie-Louise Uwase",
      role: "Restaurant Manager",
      comment: "The mobile integration is amazing. I can track everything from my phone!",
      rating: 5,
      avatar: "MU"
    },
    {
      name: "Eric Niyonzima",
      role: "Electronics Store",
      comment: "Best tax solution in Rwanda. The dashboard gives me insights I never had before.",
      rating: 5,
      avatar: "EN"
    },
  ];

  const howItWorks = [
    { step: 1, title: "Register", desc: "Sign up as a trader with your business details" },
    { step: 2, title: "Make Sales", desc: "Process sales through your SmartTax account" },
    { step: 3, title: "Auto Tax", desc: "Tax is automatically calculated and deducted" },
    { step: 4, title: "Track & Report", desc: "View analytics and generate reports anytime" },
  ];

  const getColorClass = (color) => {
    const colors = {
      yellow: "text-yellow-400 bg-yellow-500/10",
      green: "text-green-400 bg-green-500/10",
      blue: "text-blue-400 bg-blue-500/10",
      purple: "text-purple-400 bg-purple-500/10",
      orange: "text-orange-400 bg-orange-500/10",
      red: "text-red-400 bg-red-500/10"
    };
    return colors[color] || "text-blue-400 bg-blue-500/10";
  };

  const formatFRW = (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B FRW`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M FRW`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K FRW`;
    }
    return `${amount} FRW`;
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      isLight 
        ? 'bg-gradient-to-br from-white via-gray-50 to-blue-50'
        : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl shadow-lg ${
        isLight
          ? 'border-gray-200 bg-white/95'
          : 'border-slate-700/50 bg-slate-900/90'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">ST</span>
            </div>
            <div className="font-black text-xl md:text-2xl">
              <span className={isLight ? 'text-slate-900' : 'text-white'}>Smart</span>
              <span className="text-blue-500">Tax</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className={`hidden md:inline-flex font-medium transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
            }`}>
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md transition-all hover:scale-105"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isLight ? 'hover:bg-gray-100' : 'hover:bg-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className={isLight ? 'text-slate-900' : 'text-white'} />
              ) : (
                <Menu size={24} className={isLight ? 'text-slate-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${
            isLight ? 'border-gray-200 bg-white' : 'border-slate-700/50 bg-slate-900'
          }`}>
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-all ${
                  isLight 
                    ? 'bg-gray-100 hover:bg-gray-200 text-slate-900' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg transition-all"
              >
                Get Started →
              </Link>
              <div className={`pt-3 border-t ${isLight ? 'border-gray-200' : 'border-slate-700'}`}>
                <p className={`text-sm text-center ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  🇷🇼 Made for Rwanda with ❤️
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="flex-1 grid place-items-center px-4 md:px-6 py-12 md:py-20 text-center">
        <div className="max-w-5xl space-y-8 animate-fade-in">
          <div className={`inline-block px-4 py-2 rounded-full border text-sm font-semibold ${
            isLight
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}>
            🇷🇼 Simplifying Tax Payment for Rwanda
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-tight animate-slide-up ${
            isLight
              ? 'bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent'
          }`}>
            SmartTax — Tax Payment Made Simple
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Automated tax deduction, mobile money integration, and powerful dashboards for traders and administrators across Rwanda.
          </p>

          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Register as Trader
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/admin/login" 
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Admin Login
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 pt-8 border-t ${
            isLight ? 'border-gray-200' : 'border-slate-700/50'
          }`}>
            <div className="p-4">
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>{stats.traders.toLocaleString()}+</div>
              <div className={`text-sm flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Users size={14} />
                Active Traders
              </div>
            </div>
            <div className="p-4">
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>{stats.transactions.toLocaleString()}+</div>
              <div className={`text-sm flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <TrendingUp size={14} />
                Transactions
              </div>
            </div>
            <div className="p-4">
              <div className={`text-2xl md:text-3xl font-bold mb-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>{formatFRW(stats.revenue)}+</div>
              <div className={`text-sm flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <DollarSign size={14} />
                Processed
              </div>
            </div>
            <div className="p-4">
              <div className={`text-3xl md:text-4xl font-bold mb-1 flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {stats.rating} <Star size={20} className={isLight ? 'text-yellow-600 fill-yellow-600' : 'text-yellow-400 fill-yellow-400'} />
              </div>
              <div className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 md:py-24 px-4 md:px-6 ${
        isLight ? 'bg-gray-50' : 'bg-slate-800/30'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>Why Choose SmartTax?</h2>
            <p className={`max-w-2xl mx-auto ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>Everything you need to manage your business taxes efficiently</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={`group p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all hover:scale-105 ${
                  isLight
                    ? 'bg-white border-gray-200 hover:border-blue-300'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50 hover:border-slate-600/50'
                }`}>
                  <div className={`inline-flex p-4 rounded-xl ${getColorClass(f.color)} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className={`font-semibold text-xl mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{f.title}</h3>
                  <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 md:py-24 px-4 md:px-6 ${
        isLight ? 'bg-gray-50' : ''
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>How It Works</h2>
            <p className={`max-w-2xl mx-auto ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>Get started in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, idx) => (
              <div key={item.step} className="relative">
                <div className={`p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all h-full ${
                  isLight
                    ? 'bg-white border-gray-200'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className={`font-semibold text-xl mb-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>{item.title}</h3>
                  <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>{item.desc}</p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 md:py-24 px-4 md:px-6 ${
        isLight ? 'bg-white' : 'bg-slate-800/30'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>Trusted by Traders Across Rwanda</h2>
            <p className={`max-w-2xl mx-auto ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>See what our users have to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className={`p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all ${
                isLight
                  ? 'bg-white border-gray-200'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
              }`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`mb-4 italic ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>{t.name}</div>
                    <div className={`text-sm ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Simplify Your Tax Payments?</h2>
            <p className="text-blue-100 mb-8 text-lg">Join thousands of traders already using SmartTax</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Get Started Now
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t backdrop-blur-sm ${
        isLight
          ? 'border-gray-200 bg-gray-50'
          : 'border-slate-700/50 bg-slate-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className={isLight ? 'text-slate-900' : 'text-white'}>Smart</span>
                <span className="text-blue-500">Tax</span>
              </div>
              <p className={`text-sm ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>Simplifying tax payment for Rwanda's traders and businesses.</p>
            </div>
            <div>
              <h3 className={`font-semibold mb-3 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>Product</h3>
              <ul className={`space-y-2 text-sm ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold mb-3 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>Company</h3>
              <ul className={`space-y-2 text-sm ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold mb-3 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>Support</h3>
              <ul className={`space-y-2 text-sm ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
          </div>
          <div className={`pt-8 border-t text-center text-sm ${
            isLight
              ? 'border-gray-200 text-slate-600'
              : 'border-slate-700/50 text-slate-400'
          }`}>
            <p>📞 Contact: support@smarttax.rw • © {new Date().getFullYear()} SmartTax — 🇷🇼 Rwanda Revenue Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
