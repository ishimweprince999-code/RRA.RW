import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const exchangeRates = {
  RWF: 1,
  USD: 0.00078, // 1 RWF = 0.00078 USD (approximate)
  EUR: 0.00072, // 1 RWF = 0.00072 EUR (approximate)
};

const useCurrency = create(
  persist(
    (set, get) => ({
      currency: 'RWF',
      symbol: 'RWF',
      exchangeRates,
      
      setCurrency: (curr) => {
        const symbols = {
          RWF: 'RWF',
          USD: '$',
          EUR: '€',
        };
        set({ 
          currency: curr, 
          symbol: symbols[curr] || 'RWF' 
        });
      },
      
      convert: (amount, from = 'RWF') => {
        const { currency, exchangeRates } = get();
        if (from === currency) return amount;
        
        // Convert to RWF first, then to target currency
        const amountInRWF = amount / (exchangeRates[from] || 1);
        const converted = amountInRWF * (exchangeRates[currency] || 1);
        
        return converted;
      },
      
      format: (amount, from = 'RWF') => {
        const { currency, symbol } = get();
        const converted = get().convert(amount, from);
        
        if (currency === 'RWF') {
          return `${Math.round(converted).toLocaleString()} ${symbol}`;
        }
        
        return `${symbol}${converted.toFixed(2).toLocaleString()}`;
      },
    }),
    {
      name: 'smarttax-currency',
    }
  )
);

export default useCurrency;
