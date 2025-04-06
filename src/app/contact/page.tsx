import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | SINI",
  description: "Contactez SINI pour les cantons de Genève et Vaud.",
};

/**
 * Contact page component
 */
export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contactez-nous
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed">
              Notre équipe est à votre disposition pour répondre à vos questions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Informations de contact</h2>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Adresse</h3>
                <p className="text-gray-500">
                  Rue du Rhône 14<br />
                  1204 Genève<br />
                  Suisse
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Téléphone</h3>
                <p className="text-gray-500">
                  +41 22 123 45 67
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-500">
                  info@sini.ch
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Heures d'ouverture</h3>
                <p className="text-gray-500">
                  Lundi - Vendredi: 8h30 - 17h30<br />
                  Samedi - Dimanche: Fermé
                </p>
                <p className="text-gray-500">
                  <strong>Service d'urgence 24/7:</strong> +41 22 123 45 68
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Envoyez-nous un message</h2>
              
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      Prénom
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Jean"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Nom
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Dupont"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="jean.dupont@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Demande d'information"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Votre message..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 