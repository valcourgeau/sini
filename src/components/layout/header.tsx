"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide nav links on platform dashboard pages
  const showNav = !pathname.startsWith("/platform/dashboard");

  const handleHostsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const hostsSection = document.getElementById("hosts");
    if (hostsSection) {
      hostsSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <header 
      id="header" 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop navigation */}
          {showNav && (
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
              <button
                onClick={handleHostsClick}
                className="inline-flex items-center bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
              >
                Devenir Hôte
              </button>
              <Link
                href="/platform"
                className="inline-flex items-center border-2 border-primary text-primary px-5 py-2 rounded-lg text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Connexion
              </Link>
            </nav>
          )}
          
          {/* Mobile menu button */}
          {showNav && (
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
          )}
        </div>
        
        {/* Mobile navigation */}
        {showNav && isMenuOpen && (
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
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={handleHostsClick}
              className="flex items-center bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
            >
              Devenir Hôte
            </button>
            <Link
              href="/platform"
              className="flex items-center border-2 border-primary text-primary px-5 py-2 rounded-lg text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
          </div>
        )}
      </div>
    </header>
  );
} 