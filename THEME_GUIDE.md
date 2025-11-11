# 🎨 SmartTax Theme System

## Overview

SmartTax now features a **fully functional dark/light theme system** that changes the entire app's appearance instantly.

---

## 🌓 Features

### Supported Themes:
1. **Dark Mode** (Default)
   - Dark slate backgrounds
   - Light text colors
   - Optimized for low-light viewing

2. **Light Mode**
   - White/light backgrounds
   - Dark text colors
   - Clear visibility in bright environments

3. **Auto Mode**
   - Follows system preference
   - Automatically switches with OS theme
   - Responds to system theme changes in real-time

---

## 🚀 How to Use

### For Users:
1. Navigate to **Settings** page
2. Find the **Appearance** section
3. Click one of the three theme buttons:
   - **Light** - Bright, white theme
   - **Dark** - Dark slate theme (default)
   - **Auto** - Follows system settings
4. Theme changes **instantly** - no refresh needed!
5. Your preference is **saved automatically**

---

## 🛠️ Technical Implementation

### Store: `src/store/theme.js`

```javascript
import useTheme from './store/theme.js';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('auto')}>Auto</button>
    </div>
  );
}
```

### Key Functions:
- `setTheme(theme)` - Changes theme ('light', 'dark', or 'auto')
- `initTheme()` - Initializes theme on app load
- Auto-persistence with localStorage

---

## 🎨 How It Works

### 1. CSS Variables
The system uses CSS custom properties that change based on theme:

```css
/* Dark Theme (default) */
:root.dark {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... */
}

/* Light Theme */
:root.light {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  /* ... */
}
```

### 2. Class-based Switching
The root `<html>` element gets a class:
- Dark mode: `<html class="dark">`
- Light mode: `<html class="light">`

### 3. CSS Overrides
Tailwind classes are overridden in light mode:

```css
/* Dark by default */
.bg-slate-900 { background: #0f172a; }

/* Light mode override */
.light .bg-slate-900 { background: #ffffff; }
```

### 4. Auto Mode
Uses `window.matchMedia('(prefers-color-scheme: dark)')`:
- Checks system preference
- Listens for changes
- Updates automatically

---

## 📦 Files Modified

### New Files:
1. **`src/store/theme.js`** - Theme state management
2. **`THEME_GUIDE.md`** - This documentation

### Updated Files:
1. **`src/styles/index.css`** - Theme variables & overrides
2. **`src/pages/Settings.jsx`** - Theme switcher UI
3. **`src/main.jsx`** - Theme initialization

---

## 🎨 Theme Color Palette

### Dark Mode Colors:
```
Background Primary:   #0f172a (slate-900)
Background Secondary: #1e293b (slate-800)
Background Tertiary:  #334155 (slate-700)
Text Primary:         #f1f5f9 (slate-100)
Text Secondary:       #cbd5e1 (slate-300)
Text Muted:           #94a3b8 (slate-400)
Border:               #475569 (slate-600)
```

### Light Mode Colors:
```
Background Primary:   #ffffff (white)
Background Secondary: #f8fafc (slate-50)
Background Tertiary:  #f1f5f9 (slate-100)
Text Primary:         #0f172a (slate-900)
Text Secondary:       #334155 (slate-700)
Text Muted:           #64748b (slate-500)
Border:               #e2e8f0 (slate-200)
```

---

## 🧪 Testing

### Test Dark Mode:
1. Go to Settings
2. Click **Dark** button
3. Observe:
   - ✅ Background turns dark slate
   - ✅ Text becomes light/white
   - ✅ Sidebar updates
   - ✅ All pages reflect change
4. Refresh browser - **theme persists** ✅

### Test Light Mode:
1. Go to Settings
2. Click **Light** button
3. Observe:
   - ✅ Background turns white
   - ✅ Text becomes dark
   - ✅ Borders become subtle
   - ✅ Shadows soften
4. Navigate to different pages - **consistent** ✅

### Test Auto Mode:
1. Go to Settings
2. Click **Auto** button
3. Change OS theme:
   - Windows: Settings → Personalization → Colors
   - Mac: System Preferences → Appearance
4. Observe app theme **follows system** ✅

---

## 🎯 What Changes in Light Mode

### Visual Changes:
- **Backgrounds**: Dark → White/Light
- **Text**: White → Dark
- **Borders**: Dark slate → Light gray
- **Shadows**: Strong → Subtle
- **Scrollbar**: Dark → Light
- **Gradients**: Dark slate → Light gray

### What Stays the Same:
- **Accent Colors**: Blue, green, red, etc.
- **Icons**: Lucide icons maintain color
- **Layout**: No structural changes
- **Functionality**: Everything works identically

---

## 🔮 Future Enhancements

### Planned Features:
- [ ] Custom theme colors
- [ ] Multiple theme presets (Ocean, Forest, Sunset)
- [ ] Per-page theme override
- [ ] Theme preview before applying
- [ ] Scheduled theme switching (auto at certain times)
- [ ] Accessibility mode (high contrast)

---

## 💡 Tips for Developers

### Adding New Components:
Components automatically support themes because:
1. Tailwind classes are overridden globally
2. CSS variables adapt to theme
3. No component-specific code needed

### Example Component:
```jsx
// This component automatically supports both themes!
function Card() {
  return (
    <div className="bg-slate-800 border border-slate-700 text-white p-4">
      {/* Dark: slate background, white text */}
      {/* Light: white background, dark text */}
    </div>
  );
}
```

### Custom Styling:
If you need custom theme-aware styles:

```jsx
// Option 1: Use CSS variables
<div style={{ 
  background: 'var(--bg-primary)',
  color: 'var(--text-primary)'
}}>
  Content
</div>

// Option 2: Conditional classes
const { theme } = useTheme();
<div className={theme === 'light' ? 'custom-light' : 'custom-dark'}>
  Content
</div>
```

---

## ✅ Implementation Checklist

- [x] Create theme store with Zustand
- [x] Add CSS variables for both themes
- [x] Override Tailwind classes in light mode
- [x] Update Settings page with theme switcher
- [x] Initialize theme on app load
- [x] Persist theme preference
- [x] Support auto/system mode
- [x] Theme-aware scrollbar
- [x] Theme-aware body background
- [x] Test all three modes
- [x] Documentation

---

## 📊 Browser Support

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)
- ✅ All modern browsers

---

## 🎉 Summary

The SmartTax theme system is **production-ready** and provides:

- ✨ **3 theme modes** (Light, Dark, Auto)
- ⚡ **Instant switching** - no reload needed
- 💾 **Auto-save** - preference persisted
- 🎨 **Full coverage** - all components themed
- 🔄 **System integration** - follows OS preference
- ♿ **Accessible** - proper contrast ratios

**Status**: ✅ Fully Implemented & Tested

---

**Built with ❤️ for SmartTax Rwanda 🇷🇼**
