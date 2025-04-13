import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Pharewest",
  description: "Contactez Pharewest pour les cantons de Genève et Vaud.",
};

/**
 * Contact page component
 */
export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Contact
          </h1>

          <div className="grid gap-8">
            <div>
              <h2 className="text-xl font-bold">Nous contacter</h2>
              <p className="mt-2 text-muted-foreground">
                Notre équipe est disponible 24/7 pour répondre à vos questions.
              </p>
            </div>

            <div className="grid gap-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="mt-1 text-muted-foreground">
                  <a href="mailto:contact@pharewest.ch" className="text-primary hover:underline">
                    contact@pharewest.ch
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-medium">Téléphone</h3>
                <p className="mt-1 text-muted-foreground">
                  <a href="tel:+41223000000" className="text-primary hover:underline">
                    +41 22 300 00 00
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-medium">Adresse</h3>
                <p className="mt-1 text-muted-foreground">
                  Rue de la Paix 1<br />
                  1202 Genève<br />
                  Suisse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 