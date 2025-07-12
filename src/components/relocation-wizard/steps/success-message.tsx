import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";

export function SuccessMessage() {
  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Demande envoyée avec succès</h2>
        <p className="text-muted-foreground max-w-md">
          Nous prenons en charge votre demande.
        </p>
      </div>
      
      <div className="border-t border-border pt-6 flex flex-col items-center text-center max-w-lg mx-auto">
        <h3 className="font-medium mb-6 text-lg">Que se passe-t-il ensuite ?</h3>
        <div className="space-y-6 w-full">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">1</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Vous recevrez un email de confirmation de votre demande.</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">2</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Notre équipe répondra à votre demande sous 24 heures.</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">3</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Un de nos spécialistes vous contactera pour les prochaines étapes.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
} 