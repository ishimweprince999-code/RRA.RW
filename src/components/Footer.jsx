import { Heart, Shield, Award, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 px-4 md:px-6 mt-auto backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 flex items-center justify-center shadow-xl">
                  <span className="text-white font-black text-lg">ST</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                  <div className="w-1 h-1 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div>
                <h3 className="font-black text-white text-lg">SmartTax</h3>
                <p className="text-xs text-blue-400 font-semibold">RRA Portal</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Simplifying tax payment for Rwanda's traders and businesses with secure, automated solutions.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-slate-700/40 to-slate-700/20 border border-slate-600/30">
              <div className="flex gap-1">
                <div className="w-1.5 h-3 rounded-full bg-blue-500"></div>
                <div className="w-1.5 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-1.5 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs font-semibold text-white">Made for Rwanda</span>
              <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Transactions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Shield size={14} />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Award size={14} />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Shield size={14} />
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <Phone size={14} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <Mail size={14} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>support@smarttax.rw</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin size={14} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
            </ul>
            {/* Social Media */}
            <div className="mt-4 flex items-center gap-2">
              <a href="#" className="p-2 rounded-lg bg-slate-700/30 hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-700/30 hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-700/30 hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-700/30 hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-white">SmartTax</span> • Rwanda Revenue Authority • All rights reserved
            </p>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              🇷🇼 Empowering Rwanda's Digital Economy • Secure • Transparent • Efficient
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
