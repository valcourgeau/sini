import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Demande envoyée avec succès</h2>
        <p className="text-muted-foreground max-w-md">
          Notre équipe va examiner votre demande et vous contactera prochainement.
        </p>
      </div>
      
      <div className="border-t border-border pt-6 flex flex-col items-center text-center max-w-md mx-auto">
        <h3 className="font-medium mb-4">Que se passe-t-il ensuite ?</h3>
        <ul className="space-y-2 text-sm mt-2">
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <span>Notre équipe examinera votre demande sous 24-48 heures.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <span>Vous recevrez un email de confirmation avec les détails de votre demande.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <span>Un spécialiste du relogement vous contactera pour discuter des prochaines étapes.</span>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
} 