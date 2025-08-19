"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Building2, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  FileText,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const userType = pathname.split('/')[3]; // /platform/dashboard/[userType]

  const getNavigationItems = () => {
    switch (userType) {
      case 'sinistre':
        return [
          { href: '/platform/dashboard/sinistre', icon: Home, label: 'Tableau de bord' },
          { href: '/platform/dashboard/sinistre/relogement', icon: Building2, label: 'Mon relogement' },
          { href: '/platform/dashboard/sinistre/messages', icon: MessageSquare, label: 'Messages' },
          { href: '/platform/dashboard/sinistre/profile', icon: User, label: 'Mon profil' },
        ];
      case 'assurance':
        return [
          { href: '/platform/dashboard/assurance', icon: Home, label: 'Tableau de bord' },
          { href: '/platform/dashboard/assurance/dossiers', icon: FileText, label: 'Dossiers' },
          { href: '/platform/dashboard/assurance/statistiques', icon: BarChart3, label: 'Statistiques' },
          { href: '/platform/dashboard/assurance/profile', icon: User, label: 'Profil' },
        ];
      case 'host':
        return [
          { href: '/platform/dashboard/host', icon: Home, label: 'Tableau de bord' },
          { href: '/platform/dashboard/host/biens', icon: Building2, label: 'Mes biens' },
          { href: '/platform/dashboard/host/reservations', icon: Calendar, label: 'Réservations' },
          { href: '/platform/dashboard/host/revenus', icon: BarChart3, label: 'Revenus' },
          { href: '/platform/dashboard/host/profile', icon: User, label: 'Mon profil' },
        ];
      default:
        return [];
    }
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'sinistre': return 'Sinistré';
      case 'assurance': return 'Assurance';
      case 'host': return 'Hôte';
      default: return 'Utilisateur';
    }
  };

  const handleLogout = () => {
    router.push('/platform');
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex bg-secondary">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-32 left-0 z-40 h-[calc(100vh-8rem)] w-64 bg-primary text-primary-foreground 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:border-r lg:border-primary/20
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-primary/20">
            <div className="flex items-center justify-between h-8">
               <div className="h-8 lg:hidden"></div> {/* Placeholder for mobile */}
               <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-primary-foreground hover:bg-primary/20 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-primary-foreground/70">Connecté en tant que</p>
              <p className="font-medium text-secondary">{getUserTypeLabel()}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start relative group transition-all duration-200 ease-in-out",
                        "hover:bg-accent/20 hover:text-accent-foreground",
                        "focus:bg-accent/20 focus:text-accent-foreground focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary",
                        isActive && [
                          "bg-secondary text-primary shadow-sm",
                          "hover:bg-secondary/90 hover:text-primary",
                          "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                          "before:w-1 before:h-8 before:bg-secondary before:rounded-r-full",
                          "after:absolute after:left-0 after:top-0 after:bottom-0",
                          "after:w-1 after:bg-accent after:rounded-r-full after:opacity-60"
                        ]
                      )}
                      onClick={() => {
                        router.push(item.href);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 mr-3 transition-transform duration-200",
                        "group-hover:scale-110",
                        isActive && "text-primary"
                      )} />
                      <span className={cn(
                        "font-medium transition-colors duration-200",
                        isActive && "text-primary"
                      )}>
                        {item.label}
                      </span>
                      
                      {/* Hover indicator */}
                      <div className={cn(
                        "absolute inset-0 bg-accent/10 rounded-md opacity-0 transition-opacity duration-200",
                        "group-hover:opacity-100",
                        isActive && "hidden"
                      )} />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary/20">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar for mobile */}
        <header className="lg:hidden bg-background border-b border-primary/20 p-4 sticky top-16 z-20 flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="font-semibold text-primary">{getUserTypeLabel()}</div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 