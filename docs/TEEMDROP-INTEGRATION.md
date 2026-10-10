# TeemDrop — deux produits intégrés dans le catalogue interne

Les identifiants fournisseur `2097149928320143360` et `2104746312091176960` sont intégrés dans le catalogue principal (`frontend/assets/js/catalog.js`). Ils utilisent les **mêmes cartes et le même modèle de fiche produit** que les autres produits de la boutique.

## Pages clients

- `/produit-2097149928320143360.html`
- `/produit-2104746312091176960.html`

Les anciennes URL `/teemdrop-*.html` et `index.html?page=teemdrop&id=...` restent compatibles. Elles affichent désormais les fiches produit internes. Aucun lien vers l'interface TeemDrop n'apparaît dans la boutique.

Les deux identifiants sont connus, mais les fiches du vendeur TeemDrop demandent une authentification. Il manque donc les **noms commerciaux réels, les photos, les variantes et les prix**. Aucun de ces champs n'a été inventé ; les articles concernés ne sont pas ajoutables au panier tant que ces données n'ont pas été vérifiées.

Pour finaliser ces fiches, transmettre un export fournisseur ou les captures intégrales montrant les noms, photos, variantes, prix et descriptifs. L'architecture Shopify Liquid historique reste préservée et la vitrine n'effectue aucun paiement.
