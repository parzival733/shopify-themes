# Atelier Universal — Shopify theme + static front-end

Ce dépôt contient **deux architectures distinctes** : le thème Shopify original (dossiers `assets`, `config`, `layout`, `locales`, `sections`, `snippets` et `templates`) et un **front-end autonome** en HTML, CSS et JavaScript dans `frontend/`.

## Site web indépendant de Shopify

Lancer le site de vitrine : ouvrez `frontend/index.html` avec un serveur statique (par exemple `python3 -m http.server --directory frontend 8000`). Les modules ES exigent un serveur HTTP dans la plupart des navigateurs.

Déploiement automatique à l'aide de GitHub Pages : `.github/workflows/deploy-frontend.yml`.

**À faire une seule fois par le propriétaire** : `Settings > Pages > Source : GitHub Actions`, puis lancer `Deploy Atelier Frontend` dans l'onglet Actions. Une fois la publication réussie : https://parzival733.github.io/shopify-themes/.

Toutes les informations dans [docs/FRONTEND.md](docs/FRONTEND.md).

## Origine du thème Shopify

Le thème Liquid Online Store 2.0 reste présent et n'est pas touché. Sa publication chez Shopify n'est plus l'objectif du dépôt. Voir [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md) pour son état et ses limites.

## Avertissement

Le nouveau site est une **vitrine** : produits et prix fictifs, panier local sans paiement, formulaire de contact et newsletter non reliés à un backend. Les photos proviennent d'Unsplash sous licence d'utilisation gratuite ; elles ne représentent pas des articles réellement en vente. Le site de démonstration porte un indicateur `noindex`.
