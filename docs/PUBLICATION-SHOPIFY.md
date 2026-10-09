# Publication en ligne de la boutique via GitHub

## Statut

Le code est hébergé sur GitHub sur la branche `main`, mais **un dépôt GitHub ne peut pas servir un thème Shopify en tant que boutique**. Le rendu Liquid, les catalogues, le panier et le paiement sont gérés par une boutique Shopify.

La connexion du dépôt à une boutique Shopify est une étape réalisée depuis le compte propriétaire (ou un compte ayant la permission Thèmes).

## Méthode recommandée — intégration Shopify GitHub

1. Connectez-vous à l'interface d'administration de votre boutique : `https://admin.shopify.com/`.
2. Ouvrez **Boutique en ligne > Thèmes**.
3. Dans la bibliothèque de thèmes, cliquez **Ajouter un thème > Se connecter depuis GitHub** (le libellé peut varier).
4. Installez / autorisez l'intégration GitHub officielle de Shopify lorsque demandé. Limitez son accès au dépôt concerné.
5. Choisissez :
   - **Compte GitHub :** `parzival733`
   - **Dépôt :** `shopify-themes`
   - **Branche :** `main`
6. Shopify crée un thème connecté dans la bibliothèque. Vérifiez la synchronisation de la branche et testez le rendu en mode **Aperçu**.
7. Ajoutez vos produits, configurez les collections et menus, définissez les pages légales, installez les extensions d'avis, configurez les règles de confidentialité et les marchés.
8. Exécutez et corrigez tous les contrôles de [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md). Contrôlez également le résultat des tests GitHub Actions.
9. Quand tout est vérifié, utilisez **Publier** sur le thème connecté depuis Shopify. Ce thème devient alors visible sur le domaine de la boutique (sauf protection par mot de passe / restrictions d'accès en vigueur).

Shopify synchronise les modifications GitHub vers le thème connecté et les modifications sauvegardées dans l'éditeur Shopify vers GitHub. Les commits sur `main` peuvent donc impacter un site publié : après lancement, préférez développer les modifications dans une branche séparée puis les fusionner après tests.

## Utiliser Shopify CLI à la place (optionnel)

Si vous possédez des accès Shopify, vous pouvez envoyer un thème non publié depuis une copie locale :

```bash
git clone https://github.com/parzival733/shopify-themes.git
cd shopify-themes
npm install -g @shopify/cli
shopify theme check --fail-level error
shopify theme push --store VOTRE-BOUTIQUE.myshopify.com --unpublished --theme "Atelier Universal - Préproduction"
```

Ne commitez jamais de mot de passe Theme Access ou de jeton Shopify dans le dépôt.

## Liens officiels

- https://shopify.dev/docs/storefronts/themes/tools/github
- https://help.shopify.com/fr/manual/online-store/themes/managing-themes/publishing-themes
- https://shopify.dev/docs/storefronts/themes/tools/cli/ci-cd
