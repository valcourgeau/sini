import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">SINI</h3>
            <p className="text-sm text-gray-500">
              Service d'Intervention et de Relogement d'Urgence pour les cantons de Genève et Vaud.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/relocation/new" 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  Demander un relogement
                </Link>
              </li>
              <li>
                <Link 
                  href="/relocation/batch" 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  Traitement par lots
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} SINI. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link 
              href="https://twitter.com" 
              className="text-gray-400 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link 
              href="https://linkedin.com" 
              className="text-gray-400 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 