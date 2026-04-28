# StartupLab 🚀

Application de gestion financière pour startups - Projet académique Bachelor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## 📋 Description

**StartupLab** est une application web full-stack de gestion financière conçue pour les startups. Elle permet de :

- 📊 Visualiser les revenus et dépenses via des graphiques interactifs
- 💰 Gérer les transactions financières (ajout, suppression, catégorisation)
- 🔐 S'authentifier de manière sécurisée (JWT + cookies HTTP-only)
- 📈 Consulter des statistiques financières en temps réel

Ce projet fait partie d'un **dossier professionnel Bachelor** et démontre :
- Architecture full-stack moderne (Next.js App Router)
- Bonnes pratiques de développement (tests, CI/CD, conventions de code)
- Sécurité des données (authentification, validation)

---

## 🛠️ Technologies

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **MUI X Charts** (visualisation de données)

### Backend
- **Next.js API Routes**
- **MySQL** (via XAMPP)
- **mysql2** (driver Node.js)
- **JWT** (authentification via `jose`)
- **Nodemailer** (emails)
- **bcrypt** (hachage de mots de passe)

### Qualité et tests
- **ESLint** (linting)
- **Jest** (tests unitaires)
- **ts-jest** (support TypeScript)

---

## 📦 Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git**
- **MySQL** (XAMPP recommandé sur macOS/Windows)
- **VS Code** ou tout IDE compatible

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/madebyjhn/Projet-Bachelor.git
cd Projet-Bachelor
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

1. Démarrer **XAMPP** et lancer MySQL
2. Créer la base de données :

```sql
CREATE DATABASE startuplab;
USE startuplab;

-- Les tables seront créées automatiquement au premier lancement
-- Ou importer le fichier schema.sql si fourni
```

### 4. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Éditer `.env` :

```env
# Base de données MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=startuplab

# JWT Secret (générer avec: openssl rand -base64 32)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

---

## 📂 Structure du projet

```
projet-startup/
├── src/
│   ├── app/                  # Pages Next.js (App Router)
│   │   ├── api/             # Routes API
│   │   │   ├── auth/        # Authentification
│   │   │   └── transactions/# Gestion des transactions
│   │   ├── dashboard/       # Page dashboard
│   │   ├── login/           # Page de connexion
│   │   ├── globals.css      # Styles globaux
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Page d'accueil (landing)
│   ├── components/          # Composants réutilisables
│   │   ├── LineChart.tsx    # Graphique des transactions
│   │   └── TopBar.tsx       # Barre de navigation
│   ├── lib/                 # Logique métier
│   │   ├── auth.ts          # Fonctions d'authentification
│   │   ├── finance.ts       # Calculs financiers
│   │   └── __test__/        # Tests unitaires
│   └── types/               # Types TypeScript
├── public/                  # Fichiers statiques
├── .github/                 # Templates GitHub
│   └── pull_request_template.md
├── tests/                   # Tests d'intégration (futur)
├── .gitignore
├── CHANGELOG.md             # Historique des versions
├── CONTRIBUTING.md          # Guide de contribution
├── LICENSE                  # Licence MIT
├── README.md                # Ce fichier
├── eslint.config.mjs        # Configuration ESLint
├── jest.config.ts           # Configuration Jest
├── next.config.ts           # Configuration Next.js
├── package.json
├── tailwind.config.ts       # Configuration Tailwind
└── tsconfig.json            # Configuration TypeScript
```

---

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Mode watch (relance automatique)
npm run test:watch

# Avec coverage
npm run test:coverage
```

### Coverage actuel

- **Fonctions métier** : ~80% (finance, auth)
- **Objectif global** : 70% minimum

---

## 🔨 Commandes disponibles

```bash
# Développement
npm run dev              # Serveur de développement (port 3000)
npm run build            # Build de production
npm start                # Lancer le build de production

# Qualité
npm test                 # Tests unitaires
npm run lint             # Vérifier ESLint
npm run lint:fix         # Corriger automatiquement ESLint

# Base de données (scripts futurs)
npm run db:migrate       # Migrations
npm run db:seed          # Données de test
```

---

## 🐳 Docker

### Démarrage rapide

**Prérequis :** Docker Desktop (ou Docker Engine + plugin Compose).

```bash
# 1. Cloner le dépôt
git clone https://github.com/madebyjhn/Projet-Bachelor.git
cd Projet-Bachelor

# 2. Créer le fichier d'environnement
cp .env.example .env
# Éditer .env : remplir DB_PASSWORD, MYSQL_ROOT_PASSWORD, JWT_SECRET, SMTP_*

# 3. Démarrer tous les services
make up
# Équivalent : docker compose up -d

# 4. Ouvrir l'application
open http://localhost:3000
```

### Commandes disponibles

```bash
make up      # Démarrer tous les services en arrière-plan
make down    # Arrêter les services (données conservées)
make build   # Reconstruire l'image depuis zéro
make logs    # Suivre les logs en temps réel
make ps      # Lister les conteneurs en cours
make clean   # Arrêter et supprimer les volumes (⚠️ perte de données)
make scan    # Scanner l'image avec Trivy (nécessite trivy installé)
```

### Convention de tagging

Les images sont publiées sur `ghcr.io/madebyjhn/projet-bachelor`.

| Tag | Exemple | Produit lors de |
|---|---|---|
| `{major}.{minor}.{patch}` | `1.2.3` | Push du tag git `v1.2.3` |
| `{major}.{minor}` | `1.2` | Push du tag git `v1.2.3` |
| `{major}` | `1` | Push du tag git `v1.2.3` |
| `sha-{hash}` | `sha-a1b2c3d` | Chaque push sur `main` ou tag |
| `latest` | `latest` | Chaque push sur `main` uniquement |

Pour publier une nouvelle version :

```bash
git tag v1.0.0
git push origin v1.0.0
# → GitHub Actions construit, pousse, et scanne avec Trivy automatiquement
```

### Variables d'environnement

| Variable | Description | Exemple |
|---|---|---|
| `DB_HOST` | Hôte MySQL (doit être `mysql` en Docker) | `mysql` |
| `DB_USER` | Utilisateur MySQL | `startuplab` |
| `DB_PASSWORD` | Mot de passe MySQL | `strong_password` |
| `DB_DATABASE` | Nom de la base de données | `startuplab` |
| `MYSQL_ROOT_PASSWORD` | Mot de passe root MySQL | `root_password` |
| `JWT_SECRET` | Clé de signature JWT (≥ 32 caractères) | `openssl rand -base64 32` |
| `SMTP_HOST` | Serveur SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Port SMTP | `587` |
| `SMTP_USER` | Email SMTP | `user@gmail.com` |
| `SMTP_PASS` | Mot de passe SMTP / app password | `app_password` |
| `NEXT_PUBLIC_APP_URL` | URL publique de l'application | `http://localhost:3000` |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez consulter [CONTRIBUTING.md](./CONTRIBUTING.md) pour :

- La **stratégie de branches** (GitHub Flow)
- Les **conventions de commits** (Conventional Commits)
- Le **processus de Pull Request**
- Les **standards de code**

### Workflow rapide

```bash
# 1. Créer une branche
git switch -c feature/ma-fonctionnalite

# 2. Développer et committer
git commit -m "feat: ajoute une nouvelle fonctionnalité"

# 3. Pousser et ouvrir une PR
git push -u origin feature/ma-fonctionnalite
```

---

## 📜 Licence

Ce projet est sous licence [MIT](./LICENSE).

---

## 👨‍💻 Auteur

**Johan CINOSI**  
Projet académique - Bachelor  
📧 [cinosi.johan@gmail.com](mailto:cinosi.johan@gmail.com)  
🔗 [GitHub](https://github.com/madebyjhn)

---

## 🙏 Remerciements

- Formation DevOps pour les bonnes pratiques
- Next.js et Vercel pour l'excellent framework
- MUI pour les composants de visualisation

---

## 📝 Notes de développement

### Problèmes connus

- Les colonnes `DECIMAL` de MySQL sont retournées en `string` par mysql2 → nécessite un cast `Number()`
- Sur macOS, bien configurer XAMPP pour démarrer MySQL sur le port 3306

### Roadmap

- [ ] Tests d'intégration avec Playwright
- [ ] CI/CD avec GitHub Actions
- [ ] Déploiement sur Vercel
- [ ] Support multi-devises
- [ ] Export des données en CSV/PDF
- [ ] Notifications par email

---

**Version actuelle** : `0.1.0` ([CHANGELOG](./CHANGELOG.md))
