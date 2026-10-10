import {products,categories,photos,articles,money,productById} from './catalog.js?v=toy-glass-1';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (page, extras={}) => './index.html?' + new URLSearchParams({page,...extras}).toString();
const params = new URLSearchParams(location.search);
// Product pages also have stable HTML URLs, which do not rely on query parameters.
// Keep legacy ?page=teemdrop&id= links working for existing bookmarks.
const rawPage = params.get('page') || 'accueil';
// Legacy supplier URLs and clean product URLs all use the normal catalog page.
const staticSupplierId = document.body?.dataset?.teemdropId || location.pathname.match(/(?:teemdrop|produit)-(\d{19})\.html$/)?.[1] || '';
const incomingId = staticSupplierId || params.get('id') || '';
const resolvedProduct = productById(incomingId) || products.find(p=>p.supplierId===incomingId);
const currentProductId = resolvedProduct?.id || incomingId;
const page = resolvedProduct && (staticSupplierId || rawPage === 'teemdrop') ? 'produit' : (rawPage === 'teemdrop' ? 'collection' : rawPage);
const main = $('#main');
let cart = [];
try { const saved = JSON.parse(localStorage.getItem('atelier-demo-cart') || '[]'); cart = Array.isArray(saved) ? saved.filter(i => productById(i.id) && Number.isInteger(i.qty) && i.qty > 0) : []; } catch (_) { cart = []; }
let previousFocus = null;
let toastTimer;
const iconArrow = '<span aria-hidden="true">↗</span>';
const image = (src,alt,cl='',extra='') => '<img class="'+cl+'" src="'+escapeHTML(src)+'" alt="'+escapeHTML(alt)+'" '+extra+' onerror="this.onerror=null;this.style.opacity=0.2">';
const pageHero = (overline,title,description='') => '<header class="page-hero"><div class="wrap"><span class="overline">'+escapeHTML(overline)+'</span><h1>'+title+'</h1><p>'+escapeHTML(description)+'</p></div></header>';
const heading = (eyebrow,title,right='') => '<div class="section-head"><div><span class="overline">'+escapeHTML(eyebrow)+'</span><h2 class="section-title">'+title+'</h2></div>'+right+'</div>';
const crumb = (...pieces) => '<nav class="breadcrumbs wrap" aria-label="Fil d’Ariane"><a href="./index.html">Accueil</a> / '+pieces.map(p=>escapeHTML(p)).join(' / ')+'</nav>';

function missingProductImage(p){
  return '<div class="product-media-pending" role="img" aria-label="Photographie indisponible pour '+escapeHTML(p.name)+'">'
    +'<svg viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="10" y="13" width="44" height="38" rx="6"/><circle cx="23" cy="25" r="4"/><path d="M13 45 26 33l10 9 6-6 9 9"/></svg>'
    +'<strong>Photo à venir</strong><small>Visuel produit non communiqué</small></div>';
}
function productCard(p){
  const href=p.supplierId ? './produit-'+encodeURIComponent(p.supplierId)+'.html' : link('produit',{id:p.id});
  const media=p.image ? image(p.image,(p.source==='teemdrop'?'Photographie du ':'Photo d’illustration de ')+p.name,'','loading="lazy" decoding="async" width="700" height="820"') : missingProductImage(p);
  return '<article class="product-card" data-product-card data-category="'+escapeHTML(p.category)+'" data-name="'+escapeHTML(p.name)+'">'
    +'<div class="product-image"><a href="'+href+'" aria-label="Découvrir '+escapeHTML(p.name)+'">'+media+'</a>'
    +(p.tag?'<span class="product-badge">'+escapeHTML(p.tag)+'</span>':'')
    +(Number.isFinite(p.price)&&p.source!=='teemdrop'?'<button class="quick-add" type="button" data-add="'+escapeHTML(p.id)+'" aria-label="Ajouter '+escapeHTML(p.name)+' au panier de démonstration">AJOUTER À MA SÉLECTION +</button>':'')
    +'</div><div class="product-body"><h3><a href="'+href+'">'+escapeHTML(p.name)+'</a></h3>'
    +'<p class="product-sub">'+escapeHTML(p.label)+'</p>'
    +'<div class="price">'+(Number.isFinite(p.price)?money(p.price)+(p.source==='teemdrop'?'<span class="price-tax-note"> TTC</span>':''):'<span class="price-pending">Prix à confirmer</span>')+'</div>'
    +'</div></article>';
}

function categoryCard(c){
  return '<a class="category-card" href="'+link('collection',{cat:c.id})+'">'
    +image(c.image,(c.illustration?'Visuel d’ambiance pour ':'Photo du produit illustrant ')+c.name,'','loading="lazy" decoding="async" width="780" height="860"')
    +(c.illustration?'<span class="category-ambience">Ambiance illustrative</span>':'')
    +'<span class="category-caption"><span><strong>'+escapeHTML(c.name)+'</strong><small>'+escapeHTML(c.subtitle)+'</small></span><span class="category-arrow">↗</span></span></a>';
}
function articleCard(a){
  return '<article><a class="journal-img" href="'+link('article',{id:a.id})+'">'+image(a.image,'Photographie d’intérieur pour '+a.title,'','loading="lazy" width="920" height="530"')+'</a>'
    +'<p class="journal-meta">'+a.category+' &nbsp; — &nbsp; '+a.date+'</p><h3 class="journal-title"><a href="'+link('article',{id:a.id})+'">'+escapeHTML(a.title)+'</a></h3><p class="journal-excerpt">'+escapeHTML(a.excerpt)+'</p><a class="tiny-link" href="'+link('article',{id:a.id})+'">Lire l’article ↗</a></article>';
}

function arrivalsSection(){
  const arrivals=products.filter(p=>p.source==='teemdrop');
  return '<section class="section arrivals-section" id="nouveautes"><div class="wrap">'
    +heading('NOUVEAUTÉS À DÉCOUVRIR','La sélection du Squishy Club','<a class="tiny-link" href="'+link('collection',{cat:'Nouveautés'})+'">VOIR LES NOUVEAUTÉS ↗</a>')
    +'<p class="arrivals-lead">Notre calendrier Mystery Dumpling ouvre le bal avec 24 surprises à découvrir. Un deuxième produit arrive bientôt : sa fiche est encore en préparation.</p>'
    +'<div class="product-grid">'+arrivals.map(productCard).join('')+'</div></div></section>';
}
function home(){
  document.title='Atelier Universal — Noël, squishies & surprises';
  const gift=products.find(p=>p.supplierId==='2097149928320143360');
  const giftUrl='./produit-2097149928320143360.html';
  const filters=['Tous',...categories.map(c=>c.id)];
  return '<section class="hero toy-hero" aria-labelledby="hero-title">'
    +'<div class="hero-copy"><div class="eyebrow">✦ NOËL 2026 · LE SQUISHY CLUB</div>'
    +'<h1 id="hero-title">Des petites surprises.<br><em>De grands sourires.</em></h1>'
    +'<p class="hero-desc">Calendriers de l’Avent, squishies à collectionner et petits jouets sensoriels : bienvenue dans notre monde de Noël, tendre, coloré et plein de surprises.</p>'
    +'<a class="dark-btn" href="'+giftUrl+'">DÉCOUVRIR LE CALENDRIER '+iconArrow+'</a>'
    +'<a class="hero-secondary" href="#collections">EXPLORER LES UNIVERS ↓</a></div>'
    +'<div class="hero-image"><span class="toy-glass-bubble toy-glass-bubble--one" aria-hidden="true">✦</span>'
    +'<div class="toy-glass-product">'+image(gift?.image||photos.hero,'Calendrier de l’Avent Mystery Dumpling avec personnages squishy de Noël','',
      'fetchpriority="high" loading="eager" decoding="async" width="900" height="900"')
    +'<span class="toy-glass-tag">🎁 24 surprises · '+money(gift?.price??29.90)+' TTC</span></div>'
    +'<span class="toy-glass-bubble toy-glass-bubble--two" aria-hidden="true">♥</span>'
    +'<div class="hero-caption">LA MAGIE DES MINI SURPRISES ✨</div></div></section>'
    +'<div class="benefit-strip" aria-label="L’univers du Squishy Club">'
    +'<div class="benefit">✦ 24 surprises dans le calendrier de l’Avent</div>'
    +'<div class="benefit">♡ Des personnages colorés à malaxer</div>'
    +'<div class="benefit">✧ Des idées cadeaux pour les fêtes</div></div>'
    +'<section class="section" id="collections"><div class="wrap">'
    +heading('UN MONDE TOUT DOUX','Explore nos univers','<a class="tiny-link" href="'+link('collection')+'">TOUT LE CATALOGUE ↗</a>')
    +'<div class="category-grid">'+categories.map(categoryCard).join('')+'</div></div></section>'
    +'<section class="gift-edit section" id="cadeaux"><div class="wrap"><div class="gift-edit-top">'
    +'<span class="overline">✦ LA MAGIE SE CACHE DANS LES DÉTAILS</span>'
    +'<h2>Un petit cadeau.<br><em>Beaucoup de magie.</em></h2>'
    +'<p>Un calendrier à ouvrir, des mini squishies à malaxer et le plaisir de découvrir chaque jour une surprise. Des inspirations de Noël pour les collectionneurs et ceux qui aiment leur faire plaisir.</p>'
    +'</div><div class="gift-edit-grid">'
    +'<a class="gift-card" href="'+giftUrl+'"><div class="gift-card-media">'
    +image(photos.advent,'Coffret calendrier Mystery Dumpling de Noël','', 'loading="lazy" decoding="async" width="800" height="800"')
    +'</div><div class="gift-card-body"><span class="overline">01 · CALENDRIER</span><h3>24 jours de surprises</h3><span class="gift-card-link">Découvrir le calendrier ↗</span></div></a>'
    +'<a class="gift-card" href="'+link('collection',{cat:'Squishies'})+'"><div class="gift-card-media">'
    +image(photos.toys,'Mini squishies colorés du calendrier Mystery Dumpling','', 'loading="lazy" decoding="async" width="800" height="800"')
    +'</div><div class="gift-card-body"><span class="overline">02 · MINI JOUETS</span><h3>Craquer pour les squishies</h3><span class="gift-card-link">Explorer les squishies ↗</span></div></a>'
    +'<a class="gift-card" href="'+link('collection',{cat:'Cadeaux'})+'"><div class="gift-card-media">'
    +image(photos.giftA,'Paquets de Noël, visuel d’ambiance','', 'loading="lazy" decoding="async" width="800" height="800"')
    +'</div><div class="gift-card-body"><span class="overline">03 · AMBIANCE ILLUSTRATIVE</span><h3>Les petites attentions</h3><span class="gift-card-link">Explorer les idées ↗</span></div></a>'
    +'</div></div></section>'
    +arrivalsSection()
    +'<section class="section section-surface" id="selection"><div class="wrap">'
    +heading('NOTRE PETIT UNIVERS','Les surprises à découvrir','<a class="tiny-link" href="'+link('collection')+'">TOUS LES ARTICLES ↗</a>')
    +'<div class="product-toolbar"><div class="filter-tabs" role="group" aria-label="Filtrer les produits">'
    +filters.map((c,i)=>'<button class="filter-button" type="button" aria-pressed="'+(i===0?'true':'false')+'" data-home-filter="'+escapeHTML(c)+'">'+(i===0?'Tout voir':escapeHTML(categories.find(k=>k.id===c)?.shortName||c))+'</button>').join('')
    +'</div><span class="small-count" id="product-count">'+products.length+' articles</span></div>'
    +'<div class="product-grid" id="home-products">'+products.map(productCard).join('')+'</div>'
    +'<p class="demo-note">Le second article attend ses informations fournisseur. Site de démonstration : achats désactivés.</p></div></section>'
    +'<section class="story-split"><div class="story-photo">'
    +image(photos.toys,'Squishies colorés et calendrier Mystery Dumpling','', 'loading="lazy" decoding="async" width="1150" height="820"')
    +'</div><div class="story-copy"><span class="overline">BIENVENUE AU SQUISHY CLUB</span>'
    +'<h2>Tout doux.<br><em>Tout joyeux.</em></h2>'
    +'<p>On aime les personnages rigolos, les couleurs bonbon et les surprises qui rendent l’attente de Noël encore plus amusante. Ici, la collection grandit au rythme des découvertes.</p>'
    +'<a class="tiny-link" href="'+link('histoire')+'">DÉCOUVRIR NOTRE UNIVERS ↗</a></div></section>'
    +'<section class="section" id="journal"><div class="wrap">'
    +heading('LE COIN DES IDÉES','Inspiration & magie de Noël','<a class="tiny-link" href="'+link('journal')+'">VOIR LE JOURNAL ↗</a>')
    +'<div class="journal-grid">'+articles.map(articleCard).join('')+'</div></div></section>'
    +'<section class="newsletter-band"><span class="overline">LE COURRIER DES SURPRISES</span>'
    +'<h2 class="section-title">Encore un peu<br>de magie ?</h2>'
    +'<p>Des idées cadeaux et inspirations à découvrir prochainement pour préparer Noël.</p>'
    +'<form class="newsletter-form" data-demo-newsletter><label class="sr-only" for="newsletter-email">Votre adresse e-mail</label>'
    +'<input id="newsletter-email" type="email" autocomplete="email" placeholder="Adresse e-mail d’un adulte" required>'
    +'<button type="submit">M’INSCRIRE ↗</button></form>'
    +'<p class="newsletter-status" data-newsletter-status>Formulaire de démonstration : aucune adresse n’est enregistrée.</p></section>';
}
function collectionPage(){
  const cat=params.get('cat')||'Tous';
  const allowed=['Tous','Nouveautés',...categories.map(c=>c.id)];
  const active=allowed.includes(cat)?cat:'Tous';
  const name=active==='Tous'?'Tous les jouets':active==='Nouveautés'?'Nos nouveautés':categories.find(c=>c.id===active)?.name;
  const selected=products.filter(p=>active==='Tous'||(active==='Nouveautés'&&p.source==='teemdrop')||p.collections?.includes(active));
  document.title=name+' — Atelier Universal';
  return pageHero('LE SQUISHY CLUB','Les petites surprises.','Calendriers de l’Avent, mini squishies, boîtes mystère et idées cadeaux de Noël.')
    +'<section class="section"><div class="wrap">'+heading('NOS JOUETS & INSPIRATIONS',escapeHTML(name))
    +'<div class="collection-controls"><div class="filter-tabs" role="group" aria-label="Collections">'
    +allowed.map(c=>'<a class="filter-button" '+(c===active?'aria-current="page"':'')+' href="'+link('collection',c==='Tous'?{}:{cat:c})+'">'+(c==='Tous'?'Tout voir':escapeHTML(categories.find(k=>k.id===c)?.shortName||c))+'</a>').join('')
    +'</div><label class="sort-control">Trier <select id="sort-products" aria-label="Trier les produits"><option value="recommended">Notre sélection</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option><option value="name">Nom A–Z</option></select></label></div>'
    +'<div class="product-grid" id="collection-products">'+selected.map(productCard).join('')+'</div>'
    +(!selected.length?'<div class="empty-message"><h3>Encore un peu de patience ✨</h3><p>Cette collection arrive bientôt. Découvrez en attendant le calendrier Mystery Dumpling.</p><a class="dark-btn" href="./produit-2097149928320143360.html">VOIR LE CALENDRIER ↗</a></div>':'')
    +'<p class="demo-note">Les photos du calendrier ont été fournies par le marchand. Les autres visuels d’ambiance ne présentent pas des références actuellement vendues. Aucun paiement disponible.</p></div></section>';
}
function productPage(){
  const p=productById(currentProductId);
  if(!p)return notFoundPage();
  document.title=p.name+' — Atelier Universal';
  const related=products.filter(other=>other.id!==p.id&&other.category===p.category).slice(0,4);
  const more=related.length>=2?related:products.filter(other=>other.id!==p.id).slice(0,4);
  const hasPrice=Number.isFinite(p.price);
  const ready=hasPrice&&Boolean(p.image)&&p.source!=='teemdrop';
  const gallery=p.source==='teemdrop'&&Array.isArray(p.gallery)&&p.gallery.length
    ?'<div class="detail-main-photo detail-main-photo--product">'+image(p.gallery[0].src,p.gallery[0].alt,'product-gallery-main','data-gallery-main fetchpriority="high" loading="eager" decoding="async" width="900" height="900"')+'</div>'
      +'<div class="product-gallery-controls" role="group" aria-label="Photos du produit">'
      +p.gallery.map((photo,i)=>'<button class="product-gallery-thumb" type="button" data-gallery-src="'+escapeHTML(photo.src)+'" data-gallery-alt="'+escapeHTML(photo.alt)+'" aria-label="Afficher la photo '+(i+1)+' du produit" aria-pressed="'+(i===0?'true':'false')+'">'
        +image(photo.src,photo.alt,'','loading="lazy" decoding="async" width="130" height="130"')+'</button>').join('')+'</div>'
    :ready
      ?'<div class="detail-main-photo">'+image(p.image,'Photo d’illustration de '+p.name,'','fetchpriority="high" width="970" height="1120"')+'</div>'
        +'<div class="detail-thumb">'+image(photos.home,'Inspiration de matières et ambiances','','loading="lazy" width="530" height="380"')+'</div>'
        +'<div class="detail-thumb">'+image(photos.story,'Inspiration intérieur naturel','','loading="lazy" width="530" height="380"')+'</div>'
      :'<div class="detail-main-photo detail-main-photo--pending">'+missingProductImage(p)+'</div>';
  const actions=ready
    ?'<label>Finition / Format</label><div class="option-row" id="product-options">'
      +p.colors.map((c,i)=>'<button class="option-btn '+(i===0?'selected':'')+'" type="button" data-option="'+escapeHTML(c)+'" aria-pressed="'+(i===0)+'">'+escapeHTML(c)+'</button>').join('')
      +'</div><label for="detail-qty">Quantité</label><input class="detail-quantity" type="number" id="detail-qty" min="1" max="99" value="1">'
      +'<div><button class="dark-btn detail-cta" type="button" data-add-detail="'+escapeHTML(p.id)+'">AJOUTER À MA SÉLECTION '+iconArrow+'</button></div>'
      +'<p class="demo-note">Panier de démonstration uniquement. Aucun paiement réel.</p>'
    :'<div class="product-awaiting-data"><strong>Informations complémentaires à venir</strong>'
      +'<p>'+(hasPrice?'Photos produit, prix et caractéristiques renseignés. Les documents de sécurité du jouet, l’âge conseillé et les conditions de livraison restent à vérifier avant toute mise en vente.':'Les photographies, caractéristiques, variantes et prix doivent être confirmés. Ce produit ne peut pas encore être ajouté au panier.')+'</p>'
      +'<dl><div><dt>Référence produit</dt><dd>'+escapeHTML(p.supplierId||p.id)+'</dd></div>'
      +'<div><dt>Prix affiché</dt><dd>'+(hasPrice?money(p.price)+' TTC':'À confirmer')+'</dd></div>'
      +'<div><dt>Variante</dt><dd>'+escapeHTML(p.variantName||'Non renseignée')+'</dd></div></dl></div>';
  return crumb(p.category,p.name)
    +'<section class="section" style="padding-top:18px"><div class="wrap"><div class="detail">'
    +'<div class="detail-gallery">'+gallery+'</div>'
    +'<div class="detail-copy"><span class="overline">SQUISHY CLUB &nbsp; — &nbsp; '+escapeHTML(p.category)+'</span>'
    +'<h1>'+escapeHTML(p.name)+'</h1><div class="detail-price">'+(hasPrice?money(p.price)+(p.source==='teemdrop'?'<span class="price-tax-note"> TTC</span>':''):'Prix à confirmer')+'</div>'
    +'<p>'+escapeHTML(p.description)+'</p><hr>'
    +'<span class="pill">'+(ready?'PHOTOGRAPHIE D’ILLUSTRATION':p.image?'PHOTOS PRODUIT · VENTE NON ACTIVÉE':'INFORMATIONS EN COURS DE VÉRIFICATION')+'</span>'
    +actions
    +'<details class="detail-meta"><summary>Description & caractéristiques</summary><p>'+escapeHTML(p.materials)+'</p>'
    +(p.specifications?.length?'<dl class="product-specs">'+p.specifications.map(spec=>'<div><dt>'+escapeHTML(spec.label)+'</dt><dd>'+escapeHTML(spec.value)+'</dd></div>').join('')+'</dl>':'')+'</details>'
    +'<details class="detail-meta"><summary>Livraison & retours</summary><p>'+escapeHTML(p.shippingInfo||'Modalités à définir pour une boutique commerciale réelle. Aucun service de livraison n’est proposé ici.')+'</p></details>'
    +(p.safetyNote?'<details class="detail-meta"><summary>Sécurité et conformité des jouets</summary><p>'+escapeHTML(p.safetyNote)+'</p></details>':'')
    +'</div></div></div></section>'
    +'<section class="section section-surface"><div class="wrap">'
    +heading('À DÉCOUVRIR','Dans le même esprit')
    +'<div class="product-grid">'+more.map(productCard).join('')+'</div></div></section>';
}

function storyPage(){
  document.title='Notre univers squishy — Atelier Universal';
  return pageHero('NOTRE PETIT MONDE','Bienvenue au Squishy Club.','Des personnages rigolos, des couleurs joyeuses et la magie des surprises de Noël.')
    +'<section class="section"><div class="wrap editorial-layout"><div>'
    +image(photos.toys,'Les personnages squishy du calendrier Mystery Dumpling','', 'loading="lazy" width="850" height="960"')
    +'</div><div><span class="overline">DES SURPRISES QUI FONT SOURIRE</span>'
    +'<h2>Le plaisir de découvrir,<br>jour après jour.</h2>'
    +'<p>Notre univers est consacré aux objets ludiques de Noël : calendriers de l’Avent, squishies aux formes amusantes, boîtes mystère et mini cadeaux à collectionner.</p>'
    +'<p>Le calendrier Mystery Dumpling comprend 24 surprises. D’autres références pourront rejoindre la boutique après vérification de leurs caractéristiques et informations de sécurité.</p>'
    +'<p class="demo-note">Site vitrine en construction. Les jouets ne sont pas encore proposés à la vente ; l’âge conseillé par le fabricant reste à confirmer.</p>'
    +'<a class="dark-btn" href="'+link('collection')+'">DÉCOUVRIR LES JOUETS ↗</a></div></div></section>';
}
function journalPage(){document.title='Le journal Squishy Club — Atelier Universal';return pageHero('INSPIRATIONS POUR LES FÊTES','Le journal du Squishy Club.','Des idées pour offrir et patienter jusqu’à Noël.')+'<section class="section"><div class="wrap journal-grid">'+articles.map(articleCard).join('')+'</div></section>'}
function articlePage(){const a=articles.find(item=>item.id===params.get('id'));if(!a)return notFoundPage();document.title=a.title+' — Atelier Universal';return crumb('Journal',a.title)+'<article class="article wrap"><div class="overline">'+escapeHTML(a.category)+' &nbsp;—&nbsp; '+escapeHTML(a.date)+'</div><h1>'+escapeHTML(a.title)+'</h1><p>'+escapeHTML(a.excerpt)+'</p>'+image(a.image,'Illustration pour '+a.title,'', 'loading="lazy" width="1050" height="620"')+'<h2>Un peu de magie pour les fêtes.</h2><p>Découvrir un personnage différent, imaginer son histoire et partager le plaisir de la surprise : voilà l’esprit de notre univers de Noël.</p><p>Pour les jouets, consultez toujours les recommandations d’âge et les informations de sécurité du fabricant avant l’achat.</p><a class="tiny-link" href="'+link('journal')+'">← RETOUR AUX INSPIRATIONS</a></article>'}
function faqPage(){document.title='Questions fréquentes — Atelier Universal';const faq=[
 ['Peut-on acheter ces squishies maintenant ?','Pas encore. La boutique est une vitrine statique : aucun paiement, commande ni expédition n’est possible.'],
 ['Que contient le calendrier Mystery Dumpling ?','Un calendrier de l’Avent et 24 accessoires squishy assortis. La variante présentée est « Christmas blind box ».'],
 ['Pour quel âge sont adaptés ces jouets ?','L’âge recommandé par le fabricant et la conformité réglementaire doivent encore être vérifiés. Il ne faut pas considérer ces petits jouets comme adaptés aux moins de trois ans sans confirmation.'],
 ['Les photos correspondent-elles aux produits ?','Oui pour les deux photos du calendrier Mystery Dumpling, fournies par le marchand. Les photos d’ambiance des autres rubriques ne représentent pas d’autres produits mis en vente.'],
 ['Combien coûte le calendrier ?','Le prix affiché est de 29,90 € TTC. Les conditions de livraison seront précisées avant l’ouverture des ventes.'],
 ['Mes données sont-elles enregistrées ?','Le panier de démonstration est local. Les formulaires contact et newsletter ne transmettent ni ne stockent de données.']
 ];return pageHero('ON VOUS RÉPOND','Toutes les réponses.','Les informations utiles sur les jouets, la sécurité et la boutique.')+'<section class="section"><div class="wrap faq-list">'+faq.map((item,i)=>'<details '+(i===0?'open':'')+'><summary>'+escapeHTML(item[0])+'</summary><p>'+escapeHTML(item[1])+'</p></details>').join('')+'</div></section>'}

function contactPage(){document.title='Contact — Atelier Universal';return pageHero('PRENONS CONTACT','Écrivez-nous.','Une page de contact prête à être reliée à votre infrastructure.')+'<section class="section"><div class="wrap contact-box"><div><span class="overline">RESTONS EN CONTACT</span><h2>Une idée ?<br>Parlons-en.</h2><p>Ce formulaire est uniquement une présentation de l’interface. Pour recevoir de vrais messages, connectez-le à un service d’envoi ou à une adresse métier.</p><p class="legal-note">Mode vitrine : aucun message ne sera envoyé ou stocké.</p></div><form id="contact-demo"><div class="field"><label for="contact-name">Votre nom</label><input id="contact-name" name="name" autocomplete="name" required></div><div class="field"><label for="contact-email">Votre e-mail</label><input id="contact-email" type="email" name="email" autocomplete="email" required></div><div class="field"><label for="contact-message">Votre message</label><textarea id="contact-message" name="message" rows="6" required></textarea></div><button class="dark-btn" type="submit">VÉRIFIER LE FORMULAIRE '+iconArrow+'</button><p class="demo-note" id="contact-status" role="status">Aucune donnée ne sera transmise.</p></form></div></section>'}
function legalPage(){document.title='Informations légales — Atelier Universal';return pageHero('INFORMATIONS','Mentions & politiques.','Cette vitrine ne constitue pas une boutique commerciale.')+'<section class="section"><div class="wrap" style="max-width:840px"><p class="legal-note">Contenus indicatifs uniquement. Les mentions légales, CGV, informations d’entreprise, livraison, retours et politique de confidentialité doivent être adaptés par l’éditeur réel du site avant un usage commercial.</p><h2 class="serif">Nature de la démonstration</h2><p>Atelier Universal est un prototype d’interface statique. Aucun paiement n’est accepté, aucune commande réelle n’est enregistrée et les produits présentés ne sont pas à vendre.</p><h2 class="serif">Stockage local</h2><p>Le navigateur conserve uniquement la sélection de panier de démonstration sur votre appareil. Aucune publicité ou mesure d’audience n’est installée par ce code.</p><h2 class="serif">Images</h2><p>Photographies d’illustration sous licence Unsplash. Consulter la page <a class="tiny-link" href="'+link('credits')+'">Crédits photos ↗</a>.</p></div></section>'}
function creditsPage(){document.title='Crédits photographiques — Atelier Universal';const ids=[['Sapin de Noël illuminé','photo-1543589077-47d81606c1bf'],['Décoration festive','photo-1482517967863-00e15c9b44be'],['Paquets de Noël','photo-1512909006721-3d6018887383'],['Ambiance des fêtes','photo-1512389142860-9c449e58a543'],['Ornements et sapin','photo-1576919228236-a097c32a5cd4'],['Intérieur — photo originale','photo-1600210492486-724fe5c67fb0'],['Décoration intérieure','photo-1600607687920-4e2a09cf159d'],['Beauté — flacon','photo-1608571423902-eed4a5ad8108'],['Lifestyle — mode','photo-1483985988355-763728e1935b'],['Salon — ambiance éditoriale','photo-1618221195710-dd6b41faaea6'],['Vase et céramique','photo-1578749556568-bc2c40e68b61'],['Luminaires','photo-1507473885765-e6ed057f782c'],['Sac et accessoires','photo-1590874103328-eac38a683ce7'],['Fauteuil — intérieur','photo-1600566753190-17f0baa2a6c3'],['Cosmétiques','photo-1556228720-195a672e8a03'],['Carnet — papeterie','photo-1531346878377-a5be20888e57'],['Bougie','photo-1603006905003-be475563bc59'],['Photographie — journal I','photo-1600210491892-03d54c0aaf87'],['Photographie — journal II','photo-1600607688969-a5bfcd646154']];return pageHero('NOS SOURCES','Crédits photographiques.','Photographies sous licence gratuite Unsplash ; attribution proposée par respect pour les créateurs.')+'<section class="section"><div class="wrap"><p>Licence : <a class="tiny-link" href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">UNSPLASH LICENSE ↗</a>. Aucun visuel n’est présenté comme une photo d’un article réellement commercialisé.</p><ul class="credit-list">'+ids.map(i=>'<li>'+escapeHTML(i[0])+'<br><a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Source : Unsplash · '+escapeHTML(i[1])+' ↗</a></li>').join('')+'</ul></div></section>'}
function searchPage(){
  const term=(params.get('q')||'').trim();
  const hits=term?products.filter(p=>(p.name+' '+p.category+' '+p.label+' '+p.description+' '+(p.supplierId||'')).toLocaleLowerCase('fr').includes(term.toLocaleLowerCase('fr'))):products;
  document.title='Recherche — Atelier Universal';
  return pageHero('LE SQUISHY CLUB','Votre recherche.','Retrouvez nos calendriers, squishies et petites surprises.')
    +'<section class="section"><div class="wrap"><form class="search-form" action="./index.html" method="get">'
    +'<input type="hidden" name="page" value="recherche"><label class="sr-only" for="results-search">Rechercher</label>'
    +'<input id="results-search" type="search" name="q" value="'+escapeHTML(term)+'" placeholder="Produit, référence, catégorie">'
    +'<button>RECHERCHER ↗</button></form>'
    +'<p>'+hits.length+' résultat(s) '+(term?'pour « '+escapeHTML(term)+' »':'')+'</p>'
    +'<div class="product-grid">'+hits.map(productCard).join('')+'</div>'
    +(hits.length?'':'<p class="empty-message">Aucun produit ne correspond à votre recherche.</p>')
    +'</div></section>';
}

function cartPage(){document.title='Ma sélection — Atelier Universal';let items=cart.map(i=>({p:productById(i.id),...i})).filter(i=>i.p),total=items.reduce((n,i)=>n+i.qty*i.p.price,0);return pageHero('VOTRE SÉLECTION','Mon panier.','Votre sélection est enregistrée uniquement dans ce navigateur.')+'<section class="section"><div class="wrap cart-page">'+(items.length?items.map(i=>'<div class="cart-page-item">'+image(i.p.image,i.p.name,'','loading="lazy" width="160" height="190"')+'<div><h3><a href="'+link('produit',{id:i.id})+'">'+escapeHTML(i.p.name)+'</a></h3><p>'+escapeHTML(i.option||'')+' · '+money(i.p.price)+'</p><div class="qty-row"><button type="button" data-cart-change="'+i.key+'" data-delta="-1" aria-label="Diminuer">−</button><span>'+i.qty+'</span><button type="button" data-cart-change="'+i.key+'" data-delta="1" aria-label="Augmenter">+</button></div></div><strong>'+money(i.qty*i.p.price)+'</strong></div>').join('')+'<div class="cart-page-total"><span>Sous-total fictif</span><strong>'+money(total)+'</strong></div><p class="demo-note">Aucune transaction n’est disponible sur ce site front-end. Il s’agit d’un aperçu de l’expérience panier.</p><a class="dark-btn" href="'+link('collection')+'">CONTINUER À EXPLORER '+iconArrow+'</a>':'<div class="empty-message"><p>Votre panier de démonstration est vide.</p><a class="dark-btn" href="'+link('collection')+'">DÉCOUVRIR LA SÉLECTION '+iconArrow+'</a></div>')+'</div></section>'}
function notFoundPage(){document.title='Page introuvable — Atelier Universal';return pageHero('404','Page introuvable.','Cette page n’existe pas ou a changé d’adresse.')+'<section class="section" style="text-align:center"><a class="dark-btn" href="./index.html">RETOUR À L’ACCUEIL '+iconArrow+'</a></section>'}

function render(){const pages={accueil:home,collection:collectionPage,produit:productPage,histoire:storyPage,journal:journalPage,article:articlePage,faq:faqPage,contact:contactPage,legal:legalPage,credits:creditsPage,recherche:searchPage,panier:cartPage};main.innerHTML=(pages[page]||notFoundPage)();updateCartCount();}
function saveCart(){try{localStorage.setItem('atelier-demo-cart',JSON.stringify(cart))}catch(_){/* storage disabled */}updateCartCount()}
function updateCartCount(){$$('[data-cart-count]').forEach(el=>el.textContent=cart.reduce((n,i)=>n+i.qty,0))}
function notify(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2900)}
function addToCart(id,qty=1,option=''){const p=productById(id);if(!p||!Number.isFinite(p.price)||p.source==='teemdrop')return;const key=id+'|'+option;const row=cart.find(i=>i.key===key);if(row)row.qty+=qty;else cart.push({key,id,qty,option});saveCart();renderDrawer();openCart();notify(p.name+' ajouté à votre sélection')}
function changeQuantity(key,delta){const i=cart.find(item=>item.key===key);if(!i)return;i.qty+=delta;cart=cart.filter(item=>item.qty>0);saveCart();renderDrawer();if(page==='panier')main.innerHTML=cartPage()}
function renderDrawer(){const holder=$('#drawer-items');holder.replaceChildren();if(!cart.length){const p=document.createElement('p');p.className='empty-message';p.textContent='Votre panier de démonstration est vide.';holder.append(p)}else{cart.forEach(i=>{const p=productById(i.id);if(!p)return;const row=document.createElement('div');row.className='drawer-item';const pic=document.createElement('img');pic.src=p.image;pic.alt='Photo de '+p.name;pic.loading='lazy';const info=document.createElement('div');const title=document.createElement('h3');title.textContent=p.name;const option=document.createElement('small');option.textContent=(i.option||'Standard')+' · '+money(p.price);const controls=document.createElement('div');controls.className='qty-row';for(const [label,delta] of [['−',-1],['+',1]]){const b=document.createElement('button');b.type='button';b.dataset.cartChange=i.key;b.dataset.delta=delta;b.textContent=label;b.setAttribute('aria-label',(delta<0?'Diminuer':'Augmenter')+' la quantité de '+p.name);controls.append(b);if(delta<0){const count=document.createElement('span');count.textContent=i.qty;controls.append(count)}}const del=document.createElement('button');del.className='remove';del.type='button';del.dataset.cartRemove=i.key;del.textContent='Retirer';controls.append(del);info.append(title,option,controls);row.append(pic,info);holder.append(row)})}const total=cart.reduce((n,i)=>n+(productById(i.id)?.price||0)*i.qty,0);$('#drawer-total').textContent=money(total)}
function openCart(){const drawer=$('#cart-drawer');previousFocus=document.activeElement;renderDrawer();$('[data-cart-overlay]').hidden=false;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('[data-cart-close]',drawer)?.focus()}
function closeCart(){const drawer=$('#cart-drawer');drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');$('[data-cart-overlay]').hidden=true;document.body.style.overflow='';previousFocus?.focus()}
function filterHome(category){$('[data-home-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.homeFilter===category)));let n=0;$('[data-product-card]',$('#home-products')).forEach(el=>{const p=products.find(p=>p.name===el.dataset.name);const show=category==='Tous'||Boolean(p?.collections?.includes(category));el.hidden=!show;if(show)n++});$('#product-count').textContent=n+' article'+(n>1?'s':'')}
function sortCollection(sort){const grid=$('#collection-products');if(!grid)return;let ids=$$('[data-product-card]',grid).map(el=>({el,p:products.find(p=>p.name===el.dataset.name)}));ids.sort((a,b)=>{if(sort==='name')return a.p.name.localeCompare(b.p.name);if(sort==='price-asc'||sort==='price-desc'){const unknownA=!Number.isFinite(a.p.price),unknownB=!Number.isFinite(b.p.price);if(unknownA!==unknownB)return unknownA?1:-1;return sort==='price-asc'?a.p.price-b.p.price:b.p.price-a.p.price;}return products.indexOf(a.p)-products.indexOf(b.p)});ids.forEach(v=>grid.append(v.el))}

document.addEventListener('click',e=>{
  const menu=e.target.closest('[data-menu-toggle]');if(menu){const n=$('#mobile-nav');n.hidden=!n.hidden;menu.setAttribute('aria-expanded',String(!n.hidden))}
  if(e.target.closest('[data-search-toggle]')){const p=$('#search-panel');p.hidden=!p.hidden;if(!p.hidden)$('#search-field').focus()}
  if(e.target.closest('[data-cart-toggle]'))openCart();
  if(e.target.closest('[data-cart-close]')||e.target.closest('[data-cart-overlay]'))closeCart();
  const add=e.target.closest('[data-add]');if(add)addToCart(add.dataset.add,1,productById(add.dataset.add)?.colors[0]||'');
  const detailed=e.target.closest('[data-add-detail]');if(detailed){const qty=Math.max(1,Math.min(99,Number($('#detail-qty')?.value)||1));const option=$('.option-btn.selected')?.dataset.option||'';addToCart(detailed.dataset.addDetail,qty,option)}
  const galleryThumb=e.target.closest('[data-gallery-src]');if(galleryThumb){const hero=$('[data-gallery-main]');if(hero){hero.src=galleryThumb.dataset.gallerySrc;hero.alt=galleryThumb.dataset.galleryAlt;$('[data-gallery-src]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===galleryThumb)))}}
  const option=e.target.closest('[data-option]');if(option){$$('[data-option]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});option.classList.add('selected');option.setAttribute('aria-pressed','true')}
  const filter=e.target.closest('[data-home-filter]');if(filter)filterHome(filter.dataset.homeFilter);
  const change=e.target.closest('[data-cart-change]');if(change)changeQuantity(change.dataset.cartChange,Number(change.dataset.delta));
  const remove=e.target.closest('[data-cart-remove]');if(remove){cart=cart.filter(item=>item.key!==remove.dataset.cartRemove);saveCart();renderDrawer();if(page==='panier')main.innerHTML=cartPage()}
});
document.addEventListener('change',e=>{if(e.target.matches('#sort-products'))sortCollection(e.target.value)});
document.addEventListener('submit',e=>{if(e.target.matches('[data-demo-newsletter]')){e.preventDefault();$('[data-newsletter-status]').textContent='Cette démonstration n’enregistre aucune adresse. Un service newsletter doit être connecté.';notify('Newsletter non connectée : aucune donnée enregistrée.')}if(e.target.matches('#contact-demo')){e.preventDefault();$('#contact-status').textContent='Formulaire vérifié, mais non envoyé : connectez une solution de messagerie.';notify('Formulaire démo : aucun message envoyé.')}});
document.addEventListener('keydown',e=>{const drawer=$('#cart-drawer');if(e.key==='Escape'){if(drawer.classList.contains('open'))closeCart();else if(!$('#search-panel').hidden)$('#search-panel').hidden=true}if(e.key==='Tab'&&drawer.classList.contains('open')){const focus=$$('a[href],button:not([disabled]),input:not([disabled])',drawer).filter(el=>el.offsetParent!==null);if(!focus.length)return;const first=focus[0],last=focus[focus.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
render();