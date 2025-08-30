import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface SuccessMessageProps {
  userType?: string | null;
}

export function SuccessMessage({ userType }: SuccessMessageProps) {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');
  
  // Determine messages based on user type
  const getSuccessTitle = () => {
    if (userType === "sinistre") {
      return "Votre demande a été envoyée avec succès";
    }
    return "Demande envoyée avec succès";
  };

  const getSuccessDescription = () => {
    if (userType === "sinistre") {
      return "Nous prenons en charge votre demande de relogement.";
    }
    return "Nous prenons en charge votre demande.";
  };

  const getNextStepsTitle = () => {
    if (userType === "sinistre") {
      return "Que se passe-t-il ensuite pour vous ?";
    }
    return "Que se passe-t-il ensuite ?";
  };

  const getEmailStep = () => {
    if (userType === "sinistre") {
      return "Vous allez recevoir un email de confirmation de votre demande de relogement.";
    }
    return "Vous allez recevoir un email de confirmation de votre demande.";
  };

  const getResponseStep = () => {
    if (userType === "sinistre") {
      return "Notre équipe répondra à votre demande de relogement sous 24 heures.";
    }
    return "Notre équipe répondra à votre demande sous 24 heures.";
  };

  const getSpecialistStep = () => {
    if (userType === "sinistre") {
      return "Un de nos spécialistes va chercher un relogement adapté à votre situation.";
    }
    return "Un de nos spécialistes va chercher un relogement pour vous.";
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-card rounded-lg p-8 max-w-xl mx-auto shadow-lg border border-border">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{getSuccessTitle()}</h2>
          <p className="text-muted-foreground">
            {getSuccessDescription()}
          </p>
        </div>
        
        <div className="border-t border-border pt-6 mt-6 flex flex-col items-center text-center">
          <h3 className="font-medium mb-4 text-lg text-foreground">{getNextStepsTitle()}</h3>
          <div className="space-y-4 w-full">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">1</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{getEmailStep()}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">2</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{getResponseStep()}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">3</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{getSpecialistStep()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button asChild>
            <Link href={brandParam ? `/?brand=${brandParam}` : "/"}>
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 