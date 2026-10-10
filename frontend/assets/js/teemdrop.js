// TeemDrop references provided by the store owner.
// Seller product pages require authentication. Do not invent retail data.
export const teemdropProducts = [
  {
    id:'2097149928320143360',
    name:'Calendrier de l’Avent Squishy Mystery Dumpling – 24 surprises',
    label:'24 squishies colorés à découvrir avant Noël',
    category:'Calendriers',
    collections:['Calendriers','Squishies','Boîtes mystère','Cadeaux'],
    supplierId:'2097149928320143360',
    supplierUrl:'https://seller.teemdrop.com/find-product/product-detail?id=2097149928320143360',
    price:29.90,
    image:'./assets/images/mystery-dumpling-calendrier-coffret.webp',
    gallery:[
      {src:'./assets/images/mystery-dumpling-calendrier-coffret.webp',alt:'Coffret Mystery Dumpling du calendrier de l’Avent avec ses personnages squishy de Noël'},
      {src:'./assets/images/mystery-dumpling-calendrier-24-squishies.webp',alt:'Calendrier Mystery Dumpling ouvert avec ses 24 squishies colorés'}
    ],
    variantName:'Christmas blind box',
    variants:['Christmas blind box'],
    status:'Photos produit intégrées · sécurité des jouets à confirmer',
    tag:'IDÉE CADEAU',
    description:'Chaque jour, du 1er au 24 décembre, découvre une surprise du calendrier Mystery Dumpling. Le coffret « Christmas blind box » contient 24 petits accessoires squishy en PVC assortis aléatoirement, avec des personnages festifs à presser et à malaxer. La boîte cartonnée illustrée est pensée pour les cadeaux de Noël. Les modèles et couleurs sont aléatoires.',
    materials:'PVC · 24 accessoires assortis · boîte cartonnée · âge recommandé à confirmer.',
    specifications:[
      {label:'Variante',value:'Christmas blind box'},
      {label:'Contenu',value:'1 calendrier de l’Avent et 24 accessoires assortis'},
      {label:'Matière',value:'PVC'},
      {label:'Dimensions du coffret',value:'26 × 18 × 3 cm'},
      {label:'Poids du coffret',value:'Environ 320 g'},
      {label:'Dimensions des accessoires',value:'Environ 4 × 4 cm'},
      {label:'Poids par accessoire',value:'Environ 13 g'},
      {label:'Emballage',value:'Boîte cartonnée'}
    ],
    shippingInfo:'Le coût de transport à l’export déjà inclus dans l’approvisionnement est intégré au prix affiché. Les éventuels frais et délais de livraison au destinataire seront précisés avant l’ouverture des commandes. Aucun supplément « taxe d’exportation » ne sera ajouté.',
    safetyNote:'Avant commercialisation : vérifier le marquage CE, l’identité de l’opérateur responsable dans l’Union européenne, les avertissements d’âge et les documents de conformité aux règles de sécurité des jouets.'
  },
  {
    id:'2104746312091176960',
    name:'Nouvelle surprise à venir',
    category:'À venir',
    collections:[],
    supplierId:'2104746312091176960',
    supplierUrl:'https://seller.teemdrop.com/find-product/product-detail?id=2104746312091176960',
    price:null, image:null, variants:[], status:'Informations à compléter'
  }
];
export const teemdropById = id => teemdropProducts.find(product => product.id === id);
