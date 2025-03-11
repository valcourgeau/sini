"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

// Form schema
const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  address: z.string().min(5, "Veuillez entrer une adresse valide"),
  city: z.string().min(2, "Veuillez entrer une ville valide"),
  postalCode: z.string().min(4, "Veuillez entrer un code postal valide"),
  sinisterType: z.enum(["fire", "flood", "other"], {
    required_error: "Veuillez sélectionner un type de sinistre",
  }),
  sinisterDate: z.string().min(1, "Veuillez entrer une date de sinistre"),
  insuranceCompany: z.string().optional(),
  insuranceNumber: z.string().optional(),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RelocationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      sinisterType: undefined,
      sinisterDate: "",
      insuranceCompany: "",
      insuranceNumber: "",
      comments: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Demande envoyée avec succès</h2>
          <p className="text-gray-500">
            Nous avons bien reçu votre demande de relogement. Un membre de notre équipe vous contactera dans les plus brefs délais.
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Demande de relogement</h2>
        <p className="text-gray-500">
          Veuillez remplir ce formulaire pour soumettre une demande de relogement suite à un sinistre.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations personnelles</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Votre prénom"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Votre nom"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="votre.email@exemple.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Votre numéro de téléphone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations sur le sinistre</h3>
            
            <div className="space-y-2">
              <label htmlFor="sinisterType" className="text-sm font-medium">
                Type de sinistre
              </label>
              <select
                id="sinisterType"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("sinisterType")}
              >
                <option value="">Sélectionnez un type de sinistre</option>
                <option value="fire">Incendie</option>
                <option value="flood">Inondation</option>
                <option value="other">Autre</option>
              </select>
              {errors.sinisterType && (
                <p className="text-xs text-red-500">{errors.sinisterType.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="sinisterDate" className="text-sm font-medium">
                Date du sinistre
              </label>
              <input
                id="sinisterDate"
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("sinisterDate")}
              />
              {errors.sinisterDate && (
                <p className="text-xs text-red-500">{errors.sinisterDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="insuranceCompany" className="text-sm font-medium">
                Compagnie d'assurance (optionnel)
              </label>
              <input
                id="insuranceCompany"
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Nom de votre compagnie d'assurance"
                {...register("insuranceCompany")}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="insuranceNumber" className="text-sm font-medium">
                Numéro de police d'assurance (optionnel)
              </label>
              <input
                id="insuranceNumber"
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Votre numéro de police"
                {...register("insuranceNumber")}
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Adresse et commentaires</h3>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Adresse
              </label>
              <input
                id="address"
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Votre adresse"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address.message}</p>
              )}
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  Ville
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Votre ville"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium">
                  Code postal
                </label>
                <input
                  id="postalCode"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Votre code postal"
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500">{errors.postalCode.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="comments" className="text-sm font-medium">
                Commentaires (optionnel)
              </label>
              <textarea
                id="comments"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
                placeholder="Informations supplémentaires concernant votre situation"
                {...register("comments")}
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? "Envoi en cours..." : "Soumettre la demande"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 