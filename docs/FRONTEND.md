# Atelier Universal — Site front-end statique

## Architecture conservée

Tous les dossiers existants `layout/`, `sections/`, `snippets/`, `templates/`, `config/`, `locales/` et `assets/` restent inchangés : le thème Shopify n'est ni supprimé ni modifié. Le site autonome vit en parallèle :

```
frontend/
  index.html                 # Shell du site, header/footer et overlays
  404.html                   # Page de secours
  .nojekyll                  # Fichiers statiques livrés tels quels
  assets/css/main.css       # Design system responsive et accessible
  assets/js/catalog.js      # Collections, prix fictifs et photos Unsplash
  assets/js/app.js          # Navigation, recherche, tri, fiches et panier
```

Aucune dépendance npm, aucun backend ni connexion Shopify pour cette vitrine.

## Mettre le site en ligne avec GitHub Pages

1. Sur ce dépôt GitHub, ouvrez **Settings > Pages**.
2. Dans **Build and deployment**, choisissez **Source : GitHub Actions** (réglage effectué une seule fois par le propriétaire du dépôt).
3. Lancez le workflow **Deploy Atelier Frontend** depuis l'onglet **Actions** (ou faites un commit dans `frontend/`).
4. Le site se trouvera, après déploiement réussi, à : **https://parzival733.github.io/shopify-themes/**.
5. Les modifications de `frontend/` sur `main` lanceront ensuite une nouvelle publication automatiquement.

Le workflow vérifie que le HTML et le CSS existent et que les modules JavaScript sont syntaxiquement valides avant publication.

## Parcours disponibles

- Accueil : `index.html`
- Collections, catégories et tri : `index.html?page=collection`
- Produit : `index.html?page=produit&id=alba`
- Recherche : `index.html?page=recherche&q=vase`
- Panier : `index.html?page=panier`
- Pages éditoriales (histoire, journal, article, FAQ, contact, légal, crédits) : paramètre `page`.

## Limites et intégration future

Ce front-end est une **vitrine de démonstration, pas une boutique transactionnelle**. Les articles, prix et descriptions sont fictifs ; les photos sont illustratives et les paniers sont conservés dans `localStorage`. Pas de paiement, de commande, de newsletter ou de messages côté serveur. Aucun suivi marketing n'est installé par le site. Remplacer les produits par les données réelles d'une marque et brancher un backend pour permettre le commerce.

## Images et licence

Les images sont chargées depuis le CDN Unsplash par URL fixe. Licence gratuite : https://unsplash.com/license. Le crédit des créateurs est apprécié. La page `index.html?page=credits` et `assets/js/catalog.js` contiennent la liste des visuels utilisés. Une vérification des droits, représentations produit et autorisations éventuelles reste nécessaire avant un usage commercial final.
