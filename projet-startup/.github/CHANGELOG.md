# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### Added
- Dashboard avec graphiques de revenus et dépenses (MUI X Charts)
- Système d'authentification JWT avec cookies HTTP-only
- Gestion des transactions financières (ajout, suppression)
- Tests unitaires pour les fonctions de calcul financier (`computeStats`)
- Tests unitaires pour les fonctions d'authentification
- Page de connexion/inscription avec validation

### Changed
- Migration vers Next.js 15
- Extraction de la logique métier dans `src/lib/` pour faciliter les tests
- Amélioration du typage TypeScript (correction des types `Decimal` en `string`)

### Fixed
- Correction de l'affichage des graphiques (gestion correcte des types MySQL)
- Correction du problème de TopBar (variables `undefined`)
- Typage TypeScript strict pour les transactions

## [0.1.0] - 2025-01-XX

### Added
- Initialisation du projet avec Next.js, TypeScript, Tailwind CSS
- Configuration de la base de données MySQL (XAMPP)
- Structure de base du projet (App Router, API routes)
- ESLint et configuration de qualité de code
- README avec instructions d'installation
- `.gitignore` adapté au projet Next.js

---

## Format de version (SemVer)

- **MAJEUR** (X.0.0) : changements incompatibles avec les versions précédentes
- **MINEUR** (0.X.0) : ajout de fonctionnalités rétrocompatibles
- **PATCH** (0.0.X) : corrections de bugs rétrocompatibles

## Catégories de changements

- **Added** : nouvelles fonctionnalités
- **Changed** : modifications de fonctionnalités existantes
- **Deprecated** : fonctionnalités bientôt supprimées
- **Removed** : fonctionnalités supprimées
- **Fixed** : corrections de bugs
- **Security** : corrections de vulnérabilités
