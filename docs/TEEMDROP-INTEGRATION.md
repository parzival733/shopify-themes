# Deux références TeemDrop — intégration dans le front-end

Les URL fournies renvoient à des fiches de l'**espace vendeur TeemDrop**, nécessitant une authentification. Les informations de vente et les visuels ne sont pas accessibles publiquement.

| Identifiant | Fiche |
| --- | --- |
| 2097149928320143360 | https://seller.teemdrop.com/find-product/product-detail?id=2097149928320143360 |
| 2104746312091176960 | https://seller.teemdrop.com/find-product/product-detail?id=2104746312091176960 |

## Ce qui est intégré

- Exactes références et liens dans `frontend/assets/js/teemdrop.js`
- Section du site `#fournisseurs`, fiches internes `?page=teemdrop&id=...`, recherche par identifiant
- Placeholders explicitement déclarés ; aucun prix, photo, variante ou nom commercial inventé
- Panier désactivé pour ces références : la vitrine reste non transactionnelle

## Pour finaliser l'affichage commercial

Transmettre pour chaque fiche le titre, les photos produit autorisées à la réutilisation, le descriptif, le prix de vente, les variantes et les conditions de livraison ; exporter ces données depuis la session TeemDrop si possible.

Une véritable vente ou une synchronisation de commandes TeemDrop exige un système de paiement, un backend et une intégration fournisseur ; ces fonctions ne sont pas réalisées par GitHub Pages.
