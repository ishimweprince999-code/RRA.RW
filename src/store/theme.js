import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTheme = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'light', 'dark', or 'auto'
      
      setTheme: (newTheme) => {
        set({ theme: newTheme });
        applyTheme(newTheme);
      },
      
      initTheme: () => {
        const currentTheme = get().theme;
        applyTheme(currentTheme);
      },
    }),
    {
      name: 'smarttax-theme',
    }
  )
);

function applyTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'auto') {
    // Check system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  } else {
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }
}

// Listen for system theme changes when in auto mode
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const store = useTheme.getState();
    if (store.theme === 'auto') {
      applyTheme('auto');
    }
  });
}

export default useTheme;
