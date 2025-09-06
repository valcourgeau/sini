import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";

interface SuccessMessageProps {
  userType?: string | null;
}

export function SuccessMessage({ userType }: SuccessMessageProps) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-card rounded-lg p-8 max-w-xl mx-auto shadow-lg border border-border">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {userType === "sinistre" ? "Votre demande envoyée avec succès" : "Demande envoyée avec succès"}
          </h2>
          <p className="text-muted-foreground">
            {userType === "sinistre" 
              ? "Nous prenons en charge votre demande."
              : "Nous prenons en charge la demande."
            }
          </p>
        </div>
        
        <div className="border-t border-border pt-6 mt-6 flex flex-col items-center text-center">
          <h3 className="font-medium mb-4 text-lg text-foreground">Que se passe-t-il ensuite ?</h3>
          <div className="space-y-4 w-full">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">1</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {userType === "sinistre" 
                      ? "Vous allez recevoir un email de confirmation de votre demande."
                      : "Vous allez recevoir un email de confirmation de la demande."
                    }
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">2</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {userType === "sinistre" 
                      ? "Notre équipe répondra à votre demande sous 24 heures."
                      : "Notre équipe répondra à la demande sous 24 heures."
                    }
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">3</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {userType === "sinistre" 
                      ? "Un de nos spécialistes va chercher un relogement pour vous."
                      : "Un de nos spécialistes va chercher un relogement adapté."
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 