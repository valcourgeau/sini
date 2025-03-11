# SINI - Service d'Intervention et de Relogement d'Urgence

SINI est une plateforme de relogement complète conçue pour répondre aux besoins des personnes touchées par des sinistres dans les cantons de Genève et Vaud, en Suisse. Cette plateforme facilite la coordination entre les autorités, les compagnies d'assurance, les propriétaires immobiliers et les personnes sinistrées pour garantir des solutions de relogement rapides et efficaces.

## Fonctionnalités principales

- **Conception centrée sur l'utilisateur** : Interfaces adaptées pour les locataires, propriétaires, agents d'assurance et intermédiaires.
- **Options de relogement personnalisées** : Les utilisateurs peuvent spécifier leurs préférences de relogement, y compris les distances acceptables et les besoins spéciaux.
- **Module de traitement par lots** : Permet aux professionnels de saisir des données pour plusieurs demandes de relogement, assurant évolutivité et efficacité.
- **Intégration des assurances** : Collecte des informations d'assurance pour faciliter la couverture et le traitement des sinistres.
- **Support multilingue** : Services disponibles en plusieurs langues pour répondre aux besoins de la population diverse.

## Technologies utilisées

- **Frontend** : Next.js, React, TypeScript, Tailwind CSS
- **UI Components** : Shadcn UI, Radix UI
- **Validation** : Zod, React Hook Form
- **Cartographie** : Leaflet (pour l'affichage des emplacements)

## Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/sini.git
   cd sini
   ```

2. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## Structure du projet

```
sini/
├── src/
│   ├── app/                  # Pages de l'application (App Router)
│   ├── components/           # Composants React réutilisables
│   │   ├── layout/           # Composants de mise en page (header, footer)
│   │   └── ui/               # Composants UI réutilisables
│   ├── lib/                  # Utilitaires et fonctions d'aide
│   └── types/                # Définitions de types TypeScript
├── public/                   # Fichiers statiques
└── ...
```

## Déploiement

L'application peut être déployée sur n'importe quelle plateforme supportant Next.js, comme Vercel, Netlify, ou un serveur personnalisé.

```bash
# Construire l'application pour la production
npm run build
# ou
yarn build

# Démarrer le serveur de production
npm start
# ou
yarn start
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence [MIT](LICENSE).
