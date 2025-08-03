import { CheckCircle2, Home, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export function SuccessMessage() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-card rounded-lg p-8 max-w-xl mx-auto shadow-lg border border-border">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-foreground">Votre bien a été ajouté avec succès !</h2>
          
          <p className="text-muted-foreground mb-6">
            Merci d'avoir rendu votre bien disponible. Nous avons bien reçu votre soumission et la traiterons dans les plus brefs délais.
          </p>
          
          <div className="bg-background/50 rounded-lg p-6 mb-6 w-full">
            <div className="flex items-center gap-4">
              <Home className="text-primary" />
              <h3 className="font-semibold text-foreground">Que se passe-t-il ensuite ?</h3>
            </div>
            <ul className="text-sm text-left space-y-2 text-foreground mt-4">
              <li className="flex gap-2">
                <span className="font-medium">1.</span>
                <span>Nous vérifions les informations de votre bien</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">2.</span>
                <span>Vous recevrez un email de confirmation sous 24 heures</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">3.</span>
                <span>Votre bien sera disponible pour les demandeurs de relogement</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">4.</span>
                <span>Vous serez notifié lorsqu'une personne s'intéresse à votre bien</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/"
              className="inline-flex h-10 items-center gap-2 justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Retour à l'accueil
            </Link>
            
            <Link 
              href="/property/dashboard"
              className="inline-flex h-10 items-center gap-2 justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Gérer mes biens
              <ArrowRightCircle size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 