import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const translations = {
  en: {
    // Common
    dashboard: "Dashboard",
    newSale: "New Sale",
    transactions: "Transactions",
    reports: "Reports",
    traders: "Traders",
    taxesOverview: "Taxes Overview",
    analytics: "Analytics",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    
    // Landing
    hero: {
      title: "SmartTax — Tax Payment Made Simple",
      subtitle: "Automated tax deduction, mobile money integration, and powerful dashboards for traders and administrators across Rwanda.",
      registerTrader: "Register as Trader",
      adminLogin: "Admin Login",
    },
    
    // Stats
    stats: {
      activeTraders: "Active Traders",
      transactions: "Transactions",
      rwfProcessed: "RWF Processed",
      userRating: "User Rating",
    },
    
    // Dashboard
    totalSales: "Total Sales",
    totalTax: "Total Tax",
    netIncome: "Net Income",
    transactions: "Transactions",
    recentTransactions: "Recent Transactions",
    
    // Forms
    fullName: "Full Name",
    email: "Email",
    phone: "Phone Number",
    momo: "Mobile Money",
    category: "Business Category",
    amount: "Amount",
    description: "Description",
    save: "Save",
    cancel: "Cancel",
    
    // Messages
    welcome: "Welcome back",
    loading: "Loading...",
    success: "Success",
    error: "Error",
  },
  
  rw: {
    // Common (Kinyarwanda)
    dashboard: "Ikibaho",
    newSale: "Igurisha Rishya",
    transactions: "Ibikorwa",
    reports: "Raporo",
    traders: "Abacuruzi",
    taxesOverview: "Imisoro Yose",
    analytics: "Isesengura",
    profile: "Umwirondoro",
    settings: "Igenamiterere",
    logout: "Gusohoka",
    
    // Landing
    hero: {
      title: "SmartTax — Kwishyura Imisoro Byoroshye",
      subtitle: "Gukuramo imisoro byikoresha, guhuza na mobile money, n'ubushobozi bwo gukurikirana ubucuruzi bwawe muri Rwanda.",
      registerTrader: "Kwiyandikisha Nk'umucuruzi",
      adminLogin: "Injira Nk'umuyobozi",
    },
    
    // Stats
    stats: {
      activeTraders: "Abacuruzi Bakora",
      transactions: "Ibikorwa",
      rwfProcessed: "Amafaranga Yakoreshejwe",
      userRating: "Amanota",
    },
    
    // Dashboard
    totalSales: "Inyungu Zose",
    totalTax: "Imisoro Yose",
    netIncome: "Inyungu Nziza",
    transactions: "Ibikorwa",
    recentTransactions: "Ibikorwa Biherutse",
    
    // Forms
    fullName: "Amazina Yombi",
    email: "Imeri",
    phone: "Numero ya Telefone",
    momo: "Mobile Money",
    category: "Ubwoko bw'Ubucuruzi",
    amount: "Amafaranga",
    description: "Ibisobanuro",
    save: "Bika",
    cancel: "Hagarika",
    
    // Messages
    welcome: "Turakwakiye",
    loading: "Tegereza...",
    success: "Byagenze neza",
    error: "Ikosa",
  },
  
  fr: {
    // Common (French)
    dashboard: "Tableau de bord",
    newSale: "Nouvelle Vente",
    transactions: "Transactions",
    reports: "Rapports",
    traders: "Commerçants",
    taxesOverview: "Aperçu des Taxes",
    analytics: "Analytique",
    profile: "Profil",
    settings: "Paramètres",
    logout: "Déconnexion",
    
    // Landing
    hero: {
      title: "SmartTax — Paiement d'Impôts Simplifié",
      subtitle: "Déduction automatique des taxes, intégration de mobile money et tableaux de bord puissants pour les commerçants et administrateurs au Rwanda.",
      registerTrader: "S'inscrire comme Commerçant",
      adminLogin: "Connexion Admin",
    },
    
    // Stats
    stats: {
      activeTraders: "Commerçants Actifs",
      transactions: "Transactions",
      rwfProcessed: "RWF Traités",
      userRating: "Note Utilisateur",
    },
    
    // Dashboard
    totalSales: "Ventes Totales",
    totalTax: "Taxe Totale",
    netIncome: "Revenu Net",
    transactions: "Transactions",
    recentTransactions: "Transactions Récentes",
    
    // Forms
    fullName: "Nom Complet",
    email: "Email",
    phone: "Numéro de Téléphone",
    momo: "Mobile Money",
    category: "Catégorie d'Entreprise",
    amount: "Montant",
    description: "Description",
    save: "Enregistrer",
    cancel: "Annuler",
    
    // Messages
    welcome: "Bienvenue",
    loading: "Chargement...",
    success: "Succès",
    error: "Erreur",
  },
};

const useLanguage = create(
  persist(
    (set, get) => ({
      language: 'en',
      translations: translations.en,
      
      setLanguage: (lang) => {
        set({ 
          language: lang, 
          translations: translations[lang] || translations.en 
        });
      },
      
      t: (key) => {
        const keys = key.split('.');
        let value = get().translations;
        
        for (const k of keys) {
          value = value[k];
          if (value === undefined) return key;
        }
        
        return value || key;
      },
    }),
    {
      name: 'smarttax-language',
    }
  )
);

export default useLanguage;
