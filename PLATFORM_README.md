# Plateforme Pharewest - Service de Relogement

## Vue d'ensemble

La plateforme Pharewest est un service complet de relogement pour les sinistrés du canton de Genève, connectant trois types d'utilisateurs :

1. **Sinistrés** - Personnes affectées par un sinistre
2. **Assurances** - Professionnels de l'assurance
3. **Hôtes** - Propriétaires de biens immobiliers

## Architecture

### Structure des dossiers

```
src/app/platform/
├── layout.tsx                    # Layout principal de la plateforme
├── page.tsx                      # Page de connexion
└── dashboard/
    ├── layout.tsx                # Layout du dashboard avec sidebar
    ├── sinistre/                 # Espace Sinistrés
    │   ├── page.tsx              # Tableau de bord principal
    │   ├── relogement/           # Détails du relogement
    │   │   └── page.tsx
    │   ├── documents/            # Gestion des documents
    │   ├── messages/             # Messagerie
    │   └── profile/              # Profil utilisateur
    │       └── page.tsx
    ├── assurance/                # Espace Assurances
    │   ├── page.tsx              # Tableau de bord principal
    │   ├── dossiers/             # Gestion des dossiers
    │   │   └── page.tsx
    │   ├── relogements/          # Suivi des relogements
    │   ├── statistiques/         # Rapports et statistiques
    │   └── profile/              # Profil entreprise
    └── host/                     # Espace Hôtes
        ├── page.tsx              # Tableau de bord principal
        ├── biens/                # Gestion des biens
        │   └── page.tsx
        ├── reservations/         # Gestion des réservations
        ├── revenus/              # Suivi des revenus
        └── profile/              # Profil hôte
```

## Fonctionnalités par type d'utilisateur

### 🔴 Sinistrés (Victims/Claimants)

**Objectif** : Accès rapide et simple aux services de relogement

**Fonctionnalités principales** :
- **Tableau de bord** : Vue d'ensemble du statut du relogement
- **Suivi du relogement** : Progression, timeline, détails du logement
- **Documents** : Accès aux contrats et documents nécessaires
- **Messages** : Communication avec l'assurance et le support
- **Profil** : Gestion des informations personnelles

**Avantages** :
- Relogement rapide (24-48h)
- Logements adaptés et meublés
- Accompagnement personnalisé
- Interlocuteur unique

### 🔵 Assurances (Insurance Companies)

**Objectif** : Gestion efficace des dossiers de sinistres

**Fonctionnalités principales** :
- **Tableau de bord** : Statistiques et vue d'ensemble
- **Gestion des dossiers** : Création, suivi, filtrage des cas
- **Relogements** : Suivi des relogements actifs
- **Statistiques** : Rapports et analyses
- **Profil** : Gestion des informations entreprise

**Avantages** :
- Interface centralisée pour tous les dossiers
- Gestion multi-assurés
- Suivi des coûts et priorités
- Amélioration de l'efficacité des équipes

### 🟡 Hôtes (Property Owners)

**Objectif** : Maximisation des revenus et gestion simplifiée

**Fonctionnalités principales** :
- **Tableau de bord** : Vue d'ensemble des biens et revenus
- **Gestion des biens** : Ajout, modification, suivi des propriétés
- **Réservations** : Calendrier et gestion des réservations
- **Revenus** : Suivi financier et rapports
- **Profil** : Gestion des informations hôte

**Avantages** :
- Optimisation des revenus
- Gestion centralisée multi-plateforme
- Solidarité locale
- Support dédié

## Système d'authentification

### Méthode de connexion
- **Email + Code** : Pas de mot de passe traditionnel
- **Code permanent** : Valide à tout moment
- **Détermination automatique** du type d'utilisateur basée sur le code

### Codes de test
- **Sinistrés** : Code commençant par "S"
- **Assurances** : Code commençant par "A"
- **Hôtes** : Code commençant par "H"

## Design et UX

### Principes de design
- **Cohérence** : Même design system que le site principal
- **Responsive** : Optimisé mobile-first
- **Accessibilité** : Respect des standards WCAG
- **Performance** : Chargement rapide et optimisation

### Composants utilisés
- **UI Components** : Réutilisation des composants existants
- **Icons** : Lucide React pour la cohérence
- **Colors** : Palette existante (primary, secondary, etc.)
- **Typography** : Police Inter pour la lisibilité

## Technologies utilisées

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling utility-first
- **Lucide React** : Icônes
- **React Hooks** : Gestion d'état

## Développement

### Installation
```bash
npm install
```

### Développement local
```bash
npm run dev
```

### Build de production
```bash
npm run build
```

### Structure des données (Mock)

Les données actuelles sont mockées pour la démonstration. En production, elles seraient gérées par :
- **API REST** ou **GraphQL**
- **Base de données** (PostgreSQL, MongoDB)
- **Authentification** sécurisée
- **Notifications** en temps réel

## Prochaines étapes

### Fonctionnalités à implémenter
1. **API Backend** : Endpoints pour chaque fonctionnalité
2. **Base de données** : Schémas et migrations
3. **Authentification réelle** : JWT, OAuth, etc.
4. **Notifications** : Email, SMS, push
5. **Paiements** : Intégration système de paiement
6. **Maps** : Intégration cartographie
7. **Chat** : Messagerie en temps réel
8. **Documents** : Upload et gestion de fichiers

### Améliorations UX
1. **Animations** : Transitions fluides
2. **Skeleton loading** : États de chargement
3. **Error boundaries** : Gestion d'erreurs
4. **Offline support** : PWA capabilities
5. **Accessibility** : Amélioration a11y

## Support

Pour toute question ou problème :
- **Email** : support@pharewest.ch
- **Téléphone** : +41 22 XXX XX XX
- **Documentation** : [docs.pharewest.ch](https://docs.pharewest.ch) 