"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlatformHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brandContext, setBrandContext] = useState<string | null>(null);
  const pathname = usePathname();

  // Get user type from pathname
  const userType = pathname.split('/')[3]; // /platform/dashboard/[userType]
  
  // Check if we're on a dashboard page (not login page)
  const isDashboardPage = pathname.startsWith("/platform/dashboard");

  // Detect brand context from sessionStorage or URL parameters
  useEffect(() => {
    const storedBrand = sessionStorage.getItem('brandContext');
    if (storedBrand) {
      setBrandContext(storedBrand);
    }
  }, []);

  const handleRelocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to relocation wizard with correct user type
    window.location.href = `/relocation/new?userType=${userType}`;
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  // Get the correct profile link based on user type
  const getProfileLink = () => {
    switch (userType) {
      case 'sinistre':
        return '/platform/dashboard/sinistre/profile';
      case 'assurance':
        return '/platform/dashboard/assurance/profile';
      case 'host':
        return '/platform/dashboard/host/profile';
      default:
        return '/platform/dashboard/profile';
    }
  };

  // Check if relocation button should be shown (only for assurance users)
  const shouldShowRelocationButton = userType === 'assurance';

  // Get brand-specific header classes
  const getHeaderClasses = () => {
    const baseClasses = "sticky top-0 z-50 backdrop-blur-sm border-b border-border";
    
    if (brandContext === 'generali') {
      return `${baseClasses} bg-generali-red-95`;
    } else if (brandContext === 'vaudoise') {
      return `${baseClasses} bg-vaudoise-green-95`;
    }
    
    return `${baseClasses} bg-background/95`;
  };

  // Get brand-specific text classes
  const getTextClasses = () => {
    if (brandContext === 'generali') {
      return "text-generali-cream hover:text-generali-cream-80";
    } else if (brandContext === 'vaudoise') {
      return "text-vaudoise-white hover:text-vaudoise-white-80";
    }
    
    return "text-foreground hover:text-primary";
  };

  // Get brand-specific button classes
  const getButtonClasses = () => {
    if (brandContext === 'generali') {
      return "bg-generali-cream text-generali-red hover:bg-generali-cream-90";
    } else if (brandContext === 'vaudoise') {
      return "bg-vaudoise-white text-vaudoise-green hover:bg-vaudoise-white-90";
    }
    
    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };

  // Get brand-specific profile icon classes
  const getProfileIconClasses = () => {
    if (brandContext === 'generali') {
      return "bg-generali-cream-10 text-generali-cream hover:bg-generali-cream-20";
    } else if (brandContext === 'vaudoise') {
      return "bg-vaudoise-white-10 text-vaudoise-white hover:bg-vaudoise-white-20";
    }
    
    return "bg-primary/10 text-primary hover:bg-primary/20";
  };

  return (
    <header 
      id="header" 
      className={getHeaderClasses()}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo size="lg" />
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${getTextClasses()}`}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${getTextClasses()}`}
            >
              Contact
            </Link>
            {/* Only show relocation button for assurance users */}
            {shouldShowRelocationButton && (
              <Button
                onClick={handleRelocationClick}
                className={`inline-flex items-center px-6 py-2.5 rounded-lg text-base font-semibold transition-colors ${getButtonClasses()}`}
              >
                Demander un relogement
              </Button>
            )}
            {/* Only show profile icon on dashboard pages */}
            {isDashboardPage && (
              <Link
                href={getProfileLink()}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${getProfileIconClasses()}`}
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className={`md:hidden flex items-center ${getTextClasses()}`}
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
              className={`block text-sm font-medium transition-colors py-2 ${getTextClasses()}`}
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className={`block text-sm font-medium transition-colors py-2 ${getTextClasses()}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Only show relocation button for assurance users in mobile menu */}
            {shouldShowRelocationButton && (
              <Button
                onClick={handleRelocationClick}
                className={`flex items-center px-6 py-2.5 rounded-lg text-base font-semibold transition-colors ${getButtonClasses()}`}
              >
                Demander un relogement
              </Button>
            )}
            {/* Only show profile icon on dashboard pages in mobile menu */}
            {isDashboardPage && (
              <Link
                href={getProfileLink()}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${getProfileIconClasses()}`}
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