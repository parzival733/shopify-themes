# Atelier Universal — Boutique front-end + thème Shopify OS 2.0

**[Voir le site en ligne sur GitHub Pages](https://parzival733.github.io/shopify-themes/)**

Ce dépôt préserve deux architectures indépendantes :

- **`frontend/` sur `main`** : source du site vitrine autonome en HTML, CSS et JavaScript, sans Shopify ni serveur.
- **`gh-pages` (racine)** : version statique publiée par **GitHub Pages** à l'adresse ci-dessus.
- **`layout/`, `sections/`, `snippets/`, `templates/`, `assets/`, `config/`, `locales/`** : thème Shopify Liquid d'origine conservé.

## Publication GitHub Pages

GitHub Pages est activé sur la branche `gh-pages`, à la racine. Le déploiement initial a réussi : [voir les vérifications GitHub Actions](https://github.com/parzival733/shopify-themes/actions/runs/37999033513).

Une nouvelle version du site doit être copiée de `frontend/` vers la racine de `gh-pages` puis publiée ; GitHub Pages la reconstruit automatiquement. L'action sur `main` vérifie le code front-end mais **ne remplace pas la version en ligne**. Si vous utilisez ChatGPT pour modifier le front-end, demandez également la synchronisation vers `gh-pages`.

Pour démarrer localement :

```bash
git clone https://github.com/parzival733/shopify-themes.git
cd shopify-themes
python3 -m http.server --directory frontend 8000
```

Ouvrez http://localhost:8000. Plus d'informations dans [docs/FRONTEND.md](docs/FRONTEND.md).

## Note importante

La vitrine utilise des photos illustratives Unsplash et des prix et produits de démonstration. Les achats, le contact, la newsletter et le paiement réel ne sont **pas** fonctionnels. Le panier est une simulation locale et aucun service Shopify n'est connecté. Vérifiez les droits d'images, la conformité et les parcours avant tout usage commercial.
