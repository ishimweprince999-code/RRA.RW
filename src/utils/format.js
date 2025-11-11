// Note: Import the currency store in components that need currency formatting
// This file exports a basic formatter, but use useCurrency() hook for real-time conversion

export function formatCurrency(amount, currency = 'RWF') {
  // Basic formatter - for dynamic currency use useCurrency().format() in components
  if (currency === 'USD') {
    return `$${(amount * 0.00078).toFixed(2)}`;
  }
  if (currency === 'EUR') {
    return `€${(amount * 0.00072).toFixed(2)}`;
  }
  return `${Math.round(amount).toLocaleString()} RWF`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
