// Brand-specific CSS variables extracted from the actual CSS files
const BRAND_THEMES = {
  generali: {
    '--background': '40 15% 97%',
    '--foreground': '2 78% 25%',
    '--card': '40 15% 97%',
    '--card-foreground': '2 78% 25%',
    '--popover': '40 15% 97%',
    '--popover-foreground': '2 78% 25%',
    '--primary': '2 78% 42%',
    '--primary-foreground': '40 15% 97%',
    '--secondary': '35 20% 94%',
    '--secondary-foreground': '2 78% 25%',
    '--muted': '35 20% 94%',
    '--muted-foreground': '2 78% 30%',
    '--accent': '2 78% 48%',
    '--accent-foreground': '40 15% 97%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '40 15% 97%',
    '--border': '35 20% 88%',
    '--input': '35 20% 88%',
    '--ring': '2 78% 42%',
    '--radius': '0.5rem',
  },
  vaudoise: {
    '--background': '0 0% 100%',
    '--foreground': '146 100% 20%',
    '--card': '0 0% 100%',
    '--card-foreground': '146 100% 20%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '146 100% 20%',
    '--primary': '146 100% 33%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '146 50% 95%',
    '--secondary-foreground': '146 100% 20%',
    '--muted': '146 50% 95%',
    '--muted-foreground': '146 100% 25%',
    '--accent': '146 100% 35%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '146 50% 90%',
    '--input': '146 50% 90%',
    '--ring': '146 100% 29%',
    '--radius': '0.5rem',
  }
};

export function applyTheme(brandName: string) {
  if (typeof window !== 'undefined') {
    const theme = BRAND_THEMES[brandName as keyof typeof BRAND_THEMES];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
  }
}

export function clearTheme() {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    // Reset to default theme by removing all custom properties
    Object.keys(BRAND_THEMES.generali).forEach(property => {
      root.style.removeProperty(property);
    });
  }
}

export function getStoredBrand(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('pharewest-brand');
  }
  return null;
}

export function setStoredBrand(brand: string | null) {
  if (typeof window !== 'undefined') {
    if (brand) {
      localStorage.setItem('pharewest-brand', brand);
    } else {
      localStorage.removeItem('pharewest-brand');
    }
  }
}

export function initializeTheme() {
  if (typeof window !== 'undefined') {
    const storedBrand = getStoredBrand();
    
    if (storedBrand && ['generali', 'vaudoise'].includes(storedBrand)) {
      applyTheme(storedBrand);
      return storedBrand;
    } else {
      // Check if we're coming from a branded page based on referrer
      const referrer = document.referrer;
      
      if (referrer.includes('/generali')) {
        applyTheme('generali');
        setStoredBrand('generali');
        return 'generali';
      } else if (referrer.includes('/vaudoise')) {
        applyTheme('vaudoise');
        setStoredBrand('vaudoise');
        return 'vaudoise';
      }
    }
  }
  return null;
}
