# Déploiement du front-end Atelier Universal via GitHub Pages

## URL publique

**https://parzival733.github.io/shopify-themes/**

Le workflow automatique GitHub Pages a confirmé le déploiement de la branche `gh-pages` : https://github.com/parzival733/shopify-themes/actions/runs/37999033513.

## Architecture

Le thème Shopify d'origine sur `main` reste intact (`layout`, `templates`, `sections`, `snippets`, `assets`, `config`, `locales`).

Le site autonome est dans `frontend/` :

- `index.html` — coquille du site avec navigation, pied de page et tiroir de panier
- `assets/css/main.css` — styles historiques
- `assets/css/modern.css` — direction artistique 2026 : accents bleu cobalt `#2059E8`, bleu nuit `#0B1E43`, composants plus lisibles et cartes responsive
- `favicon.svg` — identité visuelle bleue
- `assets/js/catalog.js` — photos et catalogue de démonstration
- `assets/js/app.js` — navigation, recherche, filtres et panier local
- `404.html` — page 404

La branche `gh-pages` héberge une copie du contenu de `frontend/` **à sa racine**. GitHub Pages publie directement cette branche, sans action de compilation ni intégration Shopify.

## Mettre à jour le site

1. Modifiez et testez `frontend/` sur `main`.
2. Synchronisez les fichiers dans la branche `gh-pages` (sans préfixe `frontend/`) en conservant `.nojekyll`.
3. GitHub Pages reconstruira le site automatiquement à chaque push humain ou push par une application GitHub autorisée. Attention : les pushes faits par un workflow avec le `GITHUB_TOKEN` ne déclenchent pas une nouvelle construction Pages.
4. Contrôlez l'onglet Actions et l'adresse publique.

Le workflow `Verify Atelier Frontend` vérifie la syntaxe des deux modules JavaScript sur `main`, mais **ne déploie pas** à lui seul.

## Limites de la démonstration

Panier, articles et prix fictifs ; aucun paiement réel ni backend, formulaire de contact et newsletter non connectés. Les photographies sont fournies par Unsplash : https://unsplash.com/license. Veiller aux droits de représentation et à la cohérence des produits avant un usage commercial.

## Édition Squishy Club / liquid glass (octobre 2026)

- La vitrine visible adopte le style **Noël enfant + squishies** avec une feuille de style dédiée `frontend/assets/css/toy-glass.css`, transparences graduées et fallbacks sans `backdrop-filter`.
- Le catalogue public ne présente que les deux références TeemDrop fournies par le marchand, sans anciens produits fictifs de décoration ou cosmétiques.
- Le calendrier Mystery Dumpling conserve son prix de 29,90 € TTC et ses deux photos téléchargées dans `frontend/assets/images/`.
- Les nouvelles collections `Calendriers`, `Squishies`, `Boîtes mystère` et `Cadeaux` sont des axes de navigation. Une collection sans articles affiche explicitement son statut « bientôt ».
- Aucun avis fictif, fausse remise, certification ou indication d’âge non vérifiée n’est affiché. Les achats restent désactivés.
- L’ancienne architecture Shopify Liquid demeure inchangée. La branche `gh-pages` héberge une copie des fichiers de `frontend/` à sa racine.
