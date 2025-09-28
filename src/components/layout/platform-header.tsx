"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ConditionalLogo } from "@/components/ui/conditional-logo";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStoredBrand } from "@/lib/theme";

export function PlatformHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [storedBrand, setStoredBrand] = useState<string | null>(null);
  const pathname = usePathname();

  // Get stored brand on component mount
  useEffect(() => {
    setStoredBrand(getStoredBrand());
  }, []);

  // Get user type from pathname
  const userType = pathname.split('/')[3]; // /platform/dashboard/[userType]
  
  // Check if we're on a dashboard page (not login page)
  const isDashboardPage = pathname.startsWith("/platform/dashboard");

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

  // Get the correct home link based on stored brand
  const getHomeLink = () => {
    if (storedBrand === 'generali') {
      return '/generali';
    } else if (storedBrand === 'vaudoise') {
      return '/vaudoise';
    }
    return '/'; // Default to main home page
  };

  // Check if relocation button should be shown (only for assurance users)
  const shouldShowRelocationButton = userType === 'assurance';

  return (
    <header 
      id="header"
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={getHomeLink()} className="flex items-center">
              <ConditionalLogo brandContext={storedBrand} size="md" />
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
            {isDashboardPage && (
              <Link
                href={getProfileLink()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
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
                onClick={() => setIsMenuOpen(false)}
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
              {isDashboardPage && (
                <Link
                  href={getProfileLink()}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 