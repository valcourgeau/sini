"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Hash, ArrowRight, Loader2, AlertCircle, Search, HelpCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Test reference numbers for development
const TEST_REFERENCE_NUMBERS = {
  sinistre: "S12345",
  assurance: "A67890", 
  host: "H11111"
};

export default function PlatformLogin() {
  const [email, setEmail] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [error, setError] = useState("");
  const [showRetrieveForm, setShowRetrieveForm] = useState(false);
  const [showTestCodes, setShowTestCodes] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !referenceNumber) {
      setError("Veuillez saisir votre email et votre numéro de référence");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call to verify credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, determine user type based on reference number pattern
      let userType = "sinistre"; // default
      if (referenceNumber.startsWith("A")) userType = "assurance";
      else if (referenceNumber.startsWith("H")) userType = "host";
      else if (referenceNumber.startsWith("S")) userType = "sinistre";
      
      router.push(`/platform/dashboard/${userType}?ref=${referenceNumber}`);
    } catch (err) {
      setError("Email ou numéro de référence incorrect. Veuillez vérifier vos informations.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrieveReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Veuillez saisir votre adresse email");
      return;
    }

    setIsRetrieving(true);
    setError("");

    try {
      // Simulate API call to retrieve reference number
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, generate a reference number based on email
      const demoReference = email.includes("assurance") ? TEST_REFERENCE_NUMBERS.assurance : 
                           email.includes("host") ? TEST_REFERENCE_NUMBERS.host : 
                           TEST_REFERENCE_NUMBERS.sinistre;
      
      setReferenceNumber(demoReference);
      setShowRetrieveForm(false);
      setError("");
    } catch (err) {
      setError("Aucun numéro de référence trouvé pour cette adresse email.");
    } finally {
      setIsRetrieving(false);
    }
  };

  const handleBackToLogin = () => {
    setShowRetrieveForm(false);
    setError("");
  };

  const handleTestCodeClick = (code: string) => {
    setReferenceNumber(code);
    setShowTestCodes(false);
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Accès à l'interface</h1>
          <p className="text-muted-foreground">
            Connectez-vous à votre espace personnel
          </p>
        </div>

        <Card className="p-6 bg-background border-primary/20">
          {!showRetrieveForm ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="referenceNumber" className="block text-sm font-medium mb-2">
                  Numéro de référence
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="referenceNumber"
                    type="text"
                    placeholder="Ex: S12345, A67890, H11111"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                    className="pl-10 border-primary/20 focus:border-primary uppercase"
                    maxLength={8}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Format: S (Sinistré), A (Assurance), H (Hôte) + 5 chiffres
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Connexion...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="space-y-3">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowRetrieveForm(true)}
                    className="text-sm text-primary hover:underline flex items-center justify-center gap-1 mx-auto"
                    disabled={isLoading}
                  >
                    <HelpCircle className="h-4 w-4" />
                    Vous ne connaissez pas votre numéro de référence ?
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowTestCodes(!showTestCodes)}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1 mx-auto"
                    disabled={isLoading}
                  >
                    <Info className="h-4 w-4" />
                    Codes de test pour développement
                  </button>
                </div>

                {showTestCodes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                    <p className="text-sm font-medium text-blue-800">
                      Codes de test (fonctionnent avec n'importe quel email) :
                    </p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => handleTestCodeClick(TEST_REFERENCE_NUMBERS.sinistre)}
                        className="w-full text-left p-2 bg-white rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-mono text-sm">{TEST_REFERENCE_NUMBERS.sinistre}</span>
                        <span className="text-xs text-blue-600 ml-2">- Accès Sinistré</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTestCodeClick(TEST_REFERENCE_NUMBERS.assurance)}
                        className="w-full text-left p-2 bg-white rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-mono text-sm">{TEST_REFERENCE_NUMBERS.assurance}</span>
                        <span className="text-xs text-blue-600 ml-2">- Accès Assurance</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTestCodeClick(TEST_REFERENCE_NUMBERS.host)}
                        className="w-full text-left p-2 bg-white rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-mono text-sm">{TEST_REFERENCE_NUMBERS.host}</span>
                        <span className="text-xs text-blue-600 ml-2">- Accès Hôte</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleRetrieveReference} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Récupérer votre numéro de référence</h3>
                <p className="text-sm text-muted-foreground">
                  Saisissez votre adresse email pour recevoir votre numéro de référence
                </p>
              </div>

              <div>
                <label htmlFor="retrieveEmail" className="block text-sm font-medium mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="retrieveEmail"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary"
                    disabled={isRetrieving}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isRetrieving}
                >
                  {isRetrieving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Recherche en cours...
                    </>
                  ) : (
                    <>
                      Récupérer le numéro
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={handleBackToLogin}
                  disabled={isRetrieving}
                >
                  Retour à la connexion
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Besoin d'aide ?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 