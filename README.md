# Atelier Universal — Shopify OS 2.0 theme

Base de thème Shopify Online Store 2.0 pour boutiques multi-catégories : Liquid, sections configurables, modèles JSON, collections, produits, FAQ, contact, blog, recherche prédictive, panier AJAX et blocs d'applications.

## Mettre le thème en ligne via GitHub

**Shopify est l'hébergeur du thème et du checkout**. GitHub conserve et synchronise le code ; GitHub Pages ne peut pas exécuter un thème Shopify Liquid.

L'intégration officielle Shopify GitHub permet de connecter directement la branche `main` au catalogue de thèmes d'une boutique, sans système de déploiement maison.

1. Connectez-vous au **Shopify Admin** de votre boutique.
2. Ouvrez **Boutique en ligne > Thèmes**.
3. Dans la bibliothèque de thèmes, choisissez **Ajouter un thème > Connecter depuis GitHub**.
4. Autorisez l'application **Shopify GitHub** à accéder au dépôt (sélectionnez `parzival733/shopify-themes`).
5. Sélectionnez le compte `parzival733`, le dépôt `shopify-themes` et la branche `main`.
6. Le thème apparaît dans la bibliothèque **sans remplacer immédiatement le thème publié**. Ouvrez son aperçu, configurez les menus, collections, pages légales et paramètres, puis testez les parcours de commande.
7. Lorsque tous les tests sont satisfaisants, cliquez **Publier** dans Shopify. Le thème connecté reste synchronisé avec GitHub.

Consultez [le guide de publication](docs/PUBLICATION-SHOPIFY.md) et [la checklist de lancement](docs/LAUNCH-CHECKLIST.md) avant toute mise en production.

**Documentation Shopify officielle :** https://shopify.dev/docs/storefronts/themes/tools/github

## Qualité et tests

Une workflow GitHub Actions est ajoutée pour lancer `shopify theme check --fail-level error` lors des commits et pull requests. Vérifiez le statut dans l'onglet **Actions** du dépôt. Vous pouvez également exécuter localement :

```bash
npm install -g @shopify/cli
shopify theme check
shopify theme dev --store votre-boutique.myshopify.com
```

## État du projet

Il s'agit d'une **base fonctionnelle en développement et non d'un thème certifié prêt à vendre**. Aucune boutique réelle, aucun paiement, aucun indicateur Lighthouse ni audit WCAG 2.2 AA n'ont encore été testés depuis ce dépôt. Les sélecteurs de variantes au-delà de 250 variantes, l'internationalisation exhaustive, la conformité RGPD et le retrait en magasin doivent encore faire l'objet de validations ou d'améliorations spécifiques.

Le modèle de carte-cadeau et un extrait d'informations de retrait sont présents, mais doivent être testés et intégrés correctement dans une boutique. Ne publiez pas sans effectuer les vérifications nécessaires.
