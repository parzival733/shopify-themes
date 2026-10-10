# TeemDrop — deux produits intégrés dans le catalogue interne

Les identifiants fournisseur `2097149928320143360` et `2104746312091176960` sont intégrés dans le catalogue principal (`frontend/assets/js/catalog.js`). Ils utilisent les **mêmes cartes et le même modèle de fiche produit** que les autres produits de la boutique.

## Pages clients

- `/produit-2097149928320143360.html`
- `/produit-2104746312091176960.html`

Les anciennes URL `/teemdrop-*.html` et `index.html?page=teemdrop&id=...` restent compatibles. Elles affichent désormais les fiches produit internes. Aucun lien vers l'interface TeemDrop n'apparaît dans la boutique.

Les deux identifiants sont connus, mais les fiches du vendeur TeemDrop demandent une authentification. Il manque donc les **noms commerciaux réels, les photos, les variantes et les prix**. Aucun de ces champs n'a été inventé ; les articles concernés ne sont pas ajoutables au panier tant que ces données n'ont pas été vérifiées.

Pour finaliser ces fiches, transmettre un export fournisseur ou les captures intégrales montrant les noms, photos, variantes, prix et descriptifs. L'architecture Shopify Liquid historique reste préservée et la vitrine n'effectue aucun paiement.

## Calendrier de l'Avent Mystery Dumpling

Le premier produit a été décrit à partir des informations transmises par le propriétaire de la boutique : calendrier de l'Avent avec 24 surprises de type squishy, tarif public **29,90 € TTC**. Le prix affiché intègre le coût de transport à l’export confirmé par le marchand. Les droits d’importation éventuels et le coût de la livraison finale au destinataire restent à vérifier. **Aucun coût d'achat confidentiel n'est enregistré dans ce dépôt public.**

La photographie fournie n'est volontairement **pas intégrée ni copiée**. Les images officielles, composition, avertissements, conformité CE et frais de livraison jusqu'au destinataire restent à confirmer. Aucun achat réel ou simulé n'est proposé pour cette référence avant validation.

## Photographies et fiche fournisseur reçues le 10 octobre 2026

Les deux photographies originales transmises par le marchand sont enregistrées dans le dépôt au format WebP optimisé :

- `frontend/assets/images/mystery-dumpling-calendrier-coffret.webp` : photo principale du produit et de sa carte catalogue.
- `frontend/assets/images/mystery-dumpling-calendrier-24-squishies.webp` : photo secondaire accessible depuis la galerie.

**Informations communiquées par le fournisseur** : variante « Christmas blind box », calendrier de l’Avent + 24 accessoires PVC aléatoires, dimensions du coffret 26 × 18 × 3 cm, poids total environ 320 g, accessoires environ 4 × 4 cm / 13 g chacun, boîte cartonnée. Prix de vente conservé à 29,90 € TTC.

Les images sont hébergées directement par GitHub Pages dans le projet front-end. La commercialisation demeure désactivée tant que l'âge recommandé, les avertissements de sécurité et la conformité jouet pour le marché européen ne sont pas vérifiés. Aucun service Shopify n'est utilisé.
