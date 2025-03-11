"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">SINI</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/relocation/new" 
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Demander un relogement
            </Link>
            <Link 
              href="/relocation/batch" 
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Traitement par lots
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
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
              href="/relocation/new" 
              className="block text-sm font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Demander un relogement
            </Link>
            <Link 
              href="/relocation/batch" 
              className="block text-sm font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Traitement par lots
            </Link>
            <Link 
              href="/about" 
              className="block text-sm font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="block text-sm font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
} 