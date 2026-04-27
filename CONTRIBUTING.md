# Guide de contribution - StartupLab

## Stratégie de branches

Ce projet utilise **GitHub Flow**, une stratégie simple et adaptée au développement continu.

### Branches

- **`main`** : branche stable, code toujours déployable, protégée
- **`feature/nom-fonctionnalite`** : développement de nouvelles fonctionnalités
- **`fix/nom-bug`** : corrections de bugs
- **`refactor/description`** : refactoring du code
- **`test/description`** : ajout de tests

### Workflow de développement

#### 1. Créer une branche depuis main

```bash
# Mettre à jour main
git switch main
git pull origin main

# Créer une nouvelle branche
git switch -c feature/ma-fonctionnalite
```

#### 2. Développer et committer

Suivre la convention **Conventional Commits** (voir section ci-dessous).

```bash
# Ajouter les fichiers modifiés
git add src/components/MonComposant.tsx

# Committer avec un message conforme
git commit -m "feat(auth): ajoute le formulaire de connexion"
```

#### 3. Pousser et ouvrir une Pull Request

```bash
# Pousser la branche
git push -u origin feature/ma-fonctionnalite
```

Sur GitHub :
1. Cliquer sur **"Compare & pull request"**
2. Remplir le template de PR (titre, description, captures d'écran)
3. Assigner un reviewer
4. Vérifier que la CI est verte

#### 4. Revue de code

- **Au moins 1 approbation** requise avant fusion
- Répondre aux commentaires
- Apporter les modifications demandées
- Re-pousser : `git push`

#### 5. Fusionner

Une fois approuvée :
1. Utiliser **"Squash and merge"** sur GitHub (historique propre)
2. La branche sera automatiquement supprimée

#### 6. Nettoyer localement

```bash
# Revenir sur main
git switch main
git pull origin main

# Supprimer la branche locale
git branch -d feature/ma-fonctionnalite
```

---

## Convention Conventional Commits

### Format

```
<type>(<scope>): <description>

[corps optionnel]

[pied optionnel]
```

### Types obligatoires

- **`feat`** : nouvelle fonctionnalité
- **`fix`** : correction de bug
- **`docs`** : documentation uniquement
- **`style`** : formatage (sans changement de logique)
- **`refactor`** : refactoring du code
- **`test`** : ajout ou modification de tests
- **`chore`** : maintenance (dépendances, configuration)
- **`perf`** : amélioration de performance
- **`ci`** : modification de la CI/CD

### Exemples valides

```bash
feat(auth): ajoute la connexion par email
fix(dashboard): corrige l'affichage des graphiques sur mobile
docs: met à jour le README avec les instructions d'installation
chore(deps): met à jour Next.js en version 15.2
test(finance): ajoute tests unitaires pour computeStats
refactor(api): extrait la logique de validation dans auth.ts
```

### Breaking changes

Pour les changements incompatibles, ajouter `!` après le type :

```bash
feat(api)!: change la structure de réponse de /api/auth

BREAKING CHANGE: Le champ "user" est maintenant "userData"
Les clients doivent être mis à jour.
```

---

## Règles de Pull Request

### Taille

- **Maximum 400 lignes modifiées** (idéalement < 200)
- Une PR = un objectif clair
- Découper les grosses fonctionnalités en plusieurs PR

### Description

Utiliser le template fourni (`.github/pull_request_template.md`) :
- Contexte et motivation
- Liste des changements
- Instructions de test manuel
- Captures d'écran si UI
- Risques potentiels

### Avant d'ouvrir une PR

```bash
# Vérifier que tout compile
npm run build

# Lancer les tests
npm test

# Vérifier le linting
npm run lint

# Vérifier qu'aucun console.log ne traîne
git diff main | grep "console.log"
```

### Revue de code

#### Côté auteur
- Auto-review avant de demander une revue
- Répondre à **chaque** commentaire
- Ne pas prendre la critique personnellement
- Expliquer les choix techniques si nécessaire

#### Côté reviewer
- Lire la description avant le code
- Tester localement si possible
- Distinguer **nit** (détail) et **must fix** (bloquant)
- Être constructif et respectueux
- Approuver quand le code est **correct**, pas parfait

---

## Standards de code

### TypeScript

- Pas de `any`, utiliser des types stricts
- Typer les props des composants React
- Typer les retours de fonctions

### Tests

- Objectif : **70% de couverture** minimum
- Tester les fonctions métier (finance, auth)
- Tester les composants critiques

### Styling

- Utiliser **Tailwind CSS** pour le style
- Suivre les conventions Next.js (App Router)
- Composants dans `src/components/`, pages dans `src/app/`

### Performance

- Pas de console.log en production
- Optimiser les images (Next.js Image)
- Éviter les re-renders inutiles (React.memo si nécessaire)

---

## Structure du projet

```
projet-startup/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   │   ├── api/         # Routes API
│   │   └── page.tsx     # Page d'accueil
│   ├── components/       # Composants réutilisables
│   ├── lib/             # Logique métier
│   │   ├── auth.ts
│   │   ├── finance.ts
│   │   └── __test__/    # Tests unitaires
│   └── types/           # Types TypeScript
├── public/              # Fichiers statiques
├── tests/               # Tests d'intégration
└── ...
```

---

## Installation pour les contributeurs

```bash
# Cloner le repo
git clone https://github.com/madebyjhn/Projet-Bachelor.git
cd Projet-Bachelor

# Installer les dépendances
npm install

# Copier .env.example en .env et configurer
cp .env.example .env

# Lancer le serveur de développement
npm run dev
```

Accéder à [http://localhost:3000](http://localhost:3000)

---

## Commandes utiles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm start            # Lancer le build

# Qualité
npm test             # Lancer les tests
npm run test:watch   # Tests en mode watch
npm run test:coverage # Coverage des tests
npm run lint         # Vérifier ESLint

# Git hooks
npm run prepare      # Installer husky hooks
```

---

## Besoin d'aide ?

- Consulter le [README.md](./README.md)
- Ouvrir une [Issue](https://github.com/madebyjhn/Projet-Bachelor/issues)
- Demander en commentaire de PR

Merci de contribuer au projet ! 🚀
