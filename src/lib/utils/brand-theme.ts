export type BrandTheme = 'default' | 'generali' | 'vaudoise';

export interface BrandConfig {
  name: BrandTheme;
  path: string;
  cssClass: string;
}

export const BRAND_CONFIGS: Record<BrandTheme, BrandConfig> = {
  default: {
    name: 'default',
    path: '/',
    cssClass: 'theme-default'
  },
  generali: {
    name: 'generali',
    path: '/generali',
    cssClass: 'theme-generali'
  },
  vaudoise: {
    name: 'vaudoise',
    path: '/vaudoise',
    cssClass: 'theme-vaudoise'
  }
};

/**
 * Get all available brand themes
 */
export function getAvailableBrands(): BrandTheme[] {
  return Object.keys(BRAND_CONFIGS) as BrandTheme[];
}

/**
 * Check if a brand theme is valid
 */
export function isValidBrand(theme: string): theme is BrandTheme {
  return theme in BRAND_CONFIGS;
}

/**
 * Detect brand theme from current pathname
 */
export function detectBrandFromPath(pathname: string): BrandTheme {
  if (pathname.startsWith('/generali')) {
    return 'generali';
  }
  if (pathname.startsWith('/vaudoise')) {
    return 'vaudoise';
  }
  return 'default';
}

/**
 * Detect brand theme from URL parameters
 */
export function detectBrandFromParams(searchParams: URLSearchParams): BrandTheme | null {
  const brand = searchParams.get('brand');
  if (brand && isValidBrand(brand)) {
    return brand;
  }
  return null;
}

/**
 * Get brand config by theme name
 */
export function getBrandConfig(theme: BrandTheme): BrandConfig {
  return BRAND_CONFIGS[theme];
}

/**
 * Apply brand theme to document
 */
export function applyBrandTheme(theme: BrandTheme): void {
  // Remove all existing theme classes
  document.documentElement.classList.remove(
    'theme-default',
    'theme-generali', 
    'theme-vaudoise'
  );
  
  // Add the new theme class
  const config = getBrandConfig(theme);
  document.documentElement.classList.add(config.cssClass);
}

/**
 * Get current brand theme from session storage, URL params, or detect from path
 */
export function getCurrentBrandTheme(pathname: string, searchParams?: URLSearchParams): BrandTheme {
  // Root path should always use default theme
  if (pathname === '/') {
    return 'default';
  }
  
  // First, check for brand parameter in URL (for relocation form and other pages)
  if (searchParams) {
    const brandParam = searchParams.get('brand');
    if (brandParam && isValidBrand(brandParam)) {
      return brandParam;
    }
  }
  
  // Detect brand from pathname (branded landing pages)
  const pathBrand = detectBrandFromPath(pathname);
  return pathBrand;
}

/**
 * Initialize brand theme on page load
 */
export function initializeBrandTheme(pathname: string, searchParams?: URLSearchParams): void {
  const theme = getCurrentBrandTheme(pathname, searchParams);
  applyBrandTheme(theme);
}

/**
 * Clear brand theme (no longer needed with path-based detection)
 */
export function clearBrandTheme(): void {
  // No longer needed since we use path-based detection
}





/**
 * Extract brand theme from any URL
 */
export function extractBrandFromUrl(url: string): BrandTheme {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    
    // Check pathname for branded landing pages
    const pathname = urlObj.pathname;
    if (pathname.startsWith('/generali/')) {
      return 'generali';
    }
    if (pathname.startsWith('/vaudoise/')) {
      return 'vaudoise';
    }
    
    // Check URL parameters for other pages
    const brandParam = urlObj.searchParams.get('brand');
    if (brandParam && isValidBrand(brandParam)) {
      return brandParam;
    }
    
    return 'default';
  } catch (error) {
    console.warn('Could not extract brand from URL:', error);
    return 'default';
  }
}



/**
 * Extract user type from pathname
 */
export function extractUserTypeFromPath(pathname: string): string | null {
  const pathSegments = pathname.split('/');
  
  // Standard route: /platform/dashboard/[userType]
  if (pathSegments.length >= 4 && pathSegments[1] === 'platform' && pathSegments[2] === 'dashboard') {
    return pathSegments[3];
  }
  
  return null;
}



/**
 * Get the appropriate logo component name for a brand theme
 * This can be used to dynamically import logo components
 */
export function getBrandLogoName(theme: BrandTheme): string {
  const config = getBrandConfig(theme);
  
  switch (config.name) {
    case 'vaudoise':
      return 'VaudoiseLogo';
    case 'generali':
      return 'GeneraliLogo';
    default:
      return 'Logo';
  }
}

/**
 * Helper function to preserve brand parameter in URLs
 * This should be used in dashboard pages to maintain brand context
 */
export function preserveBrandInUrl(basePath: string, currentBrand?: BrandTheme): string {
  if (!currentBrand || currentBrand === 'default') {
    return basePath;
  }
  
  const url = new URL(basePath, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  url.searchParams.set('brand', currentBrand);
  return url.pathname + url.search;
}
