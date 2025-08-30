"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrandTheme } from "@/hooks/use-brand-theme";
import { getBrandConfig, getNavigationPath, extractUserTypeFromPath, isDashboardPage } from "@/lib/utils/brand-theme";
import { VaudoiseLogo } from "@/components/ui/vaudoise-logo";
import { GeneraliLogo } from "@/components/brands/generali/generali-logo";

export function PlatformHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentTheme } = useBrandTheme();

  // Get user type from pathname using utility function
  const userType = extractUserTypeFromPath(pathname);
  
  // Check if we're on a dashboard page using utility function
  const isDashboardPageResult = isDashboardPage(pathname);

  const handleRelocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to relocation wizard with correct user type and preserve brand theme
    const brandParam = currentTheme !== 'default' ? `&brand=${currentTheme}` : '';
    window.location.href = `/relocation/new?userType=${userType}${brandParam}`;
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  // Get the correct profile link based on user type
  const getProfileLink = () => {
    let basePath = '/platform/dashboard/profile';
    
    switch (userType) {
      case 'sinistre':
        basePath = '/platform/dashboard/sinistre/profile';
        break;
      case 'assurance':
        basePath = '/platform/dashboard/assurance/profile';
        break;
      case 'host':
        basePath = '/platform/dashboard/host/profile';
        break;
      default:
        basePath = '/platform/dashboard/profile';
    }
    
    // Use branded platform route if on a branded page
    return getNavigationPath(currentTheme, basePath);
  };

  // Check if relocation button should be shown (only for assurance users)
  const shouldShowRelocationButton = userType === 'assurance';

  // Get the appropriate logo based on brand theme
  const getBrandLogo = () => {
    const config = getBrandConfig(currentTheme);
    
    // Use the brand configuration to determine which logo to show
    switch (config.name) {
      case 'vaudoise':
        return <VaudoiseLogo size="lg" />;
      case 'generali':
        return <GeneraliLogo size="lg" />;
      default:
        return <Logo size="lg" />;
    }
  };

  // Get the appropriate home link based on brand theme
  const getHomeLink = () => {
    const config = getBrandConfig(currentTheme);
    return config.path;
  };

  return (
    <header 
      id="header" 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={getHomeLink()} className="flex items-center">
              {getBrandLogo()}
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            {/* Only show relocation button for assurance users */}
            {shouldShowRelocationButton && (
              <Button
                onClick={handleRelocationClick}
                className="inline-flex items-center bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
              >
                Demander un relogement
              </Button>
            )}
            {/* Only show profile icon on dashboard pages */}
            {isDashboardPageResult && (
              <Link
                href={getProfileLink()}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              href="/about" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Contact
            </Link>
            {/* Only show relocation button for assurance users in mobile menu */}
            {shouldShowRelocationButton && (
              <Button
                onClick={handleRelocationClick}
                className="flex items-center bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
              >
                Demander un relogement
              </Button>
            )}
            {/* Only show profile icon on dashboard pages in mobile menu */}
            {isDashboardPageResult && (
              <Link
                href={getProfileLink()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
} 