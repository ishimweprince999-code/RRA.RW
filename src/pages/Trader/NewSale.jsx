import { useState } from "react";
import ProcessingModal from "../../components/Modals/ProcessingModal.jsx";
import { ShoppingBag, DollarSign, Phone, Plus } from "lucide-react";

export default function NewSale() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ product:"", price:"", customer:"" });
  const submit = (e) => {
    e.preventDefault();
    setOpen(true);
    setTimeout(()=> setOpen(false), 2000);
  };
  
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">New Sale</h1>
        <p className="text-slate-400">Create a new product sale transaction</p>
      </div>

      <form onSubmit={submit} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-xl p-6 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <ShoppingBag size={16} className="text-blue-400" />
            Product Name
          </label>
          <input 
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            placeholder="e.g., T-Shirt, Shoes, etc." 
            value={form.product} 
            onChange={(e)=>setForm({...form, product:e.target.value})}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <DollarSign size={16} className="text-green-400" />
            Product Price (RWF)
          </label>
          <input 
            required
            type="number"
            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            placeholder="e.g., 15000" 
            value={form.price} 
            onChange={(e)=>setForm({...form, price:e.target.value})}
          />
          <p className="text-xs text-slate-400 mt-1">Tax will be automatically calculated (10%)</p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <Phone size={16} className="text-purple-400" />
            Customer Phone (Optional)
          </label>
          <input 
            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            placeholder="+250 XXX XXX XXX" 
            value={form.customer} 
            onChange={(e)=>setForm({...form, customer:e.target.value})}
          />
        </div>

        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          <Plus size={20} />
          Create Sale
        </button>
      </form>
      
      <ProcessingModal open={open} message="Processing Payment..." />
    </div>
  );
}
