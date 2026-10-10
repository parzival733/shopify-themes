// TeemDrop references provided by the store owner.
// Seller product pages require authentication. Do not invent retail data.
export const teemdropProducts = [
  {
    id:'2097149928320143360',
    name:'Calendrier de l’Avent Squishy Mystery Dumpling – 24 surprises',
    label:'24 surprises squishy à découvrir avant Noël',
    supplierId:'2097149928320143360',
    supplierUrl:'https://seller.teemdrop.com/find-product/product-detail?id=2097149928320143360',
    price:29.90,
    image:null, // Do not publish the customer-supplied reference image without approval.
    variants:[],
    status:'Photo et conformité à vérifier',
    tag:'IDÉE CADEAU',
    description:'Un calendrier de l’Avent ludique pour patienter jusqu’à Noël : du 1er au 24 décembre, découvre chaque jour une petite surprise inspirée de l’univers Mystery Dumpling. Ces mini-jouets squishy aux personnages festifs se pressent et se malaxent comme de petites balles sensorielles. Une idée cadeau à découvrir en attendant les fêtes. Les matériaux, dimensions, variantes et avertissements du fabricant sont à confirmer.',
    materials:'24 surprises squishy · matière exacte et âge recommandé à confirmer.',
    shippingInfo:'Le coût de transport à l’export déjà inclus dans l’approvisionnement est intégré au prix affiché. Les éventuels frais et délais de livraison au destinataire seront précisés avant l’ouverture des commandes. Aucun supplément « taxe d’exportation » ne sera ajouté.',
    safetyNote:'Avant commercialisation : vérifier le marquage CE, l’identité de l’opérateur responsable dans l’Union européenne, les avertissements d’âge et les documents de conformité aux règles de sécurité des jouets.'
  },
  {
    id:'2104746312091176960',
    name:'Nouveau produit 02',
    supplierId:'2104746312091176960',
    supplierUrl:'https://seller.teemdrop.com/find-product/product-detail?id=2104746312091176960',
    price:null, image:null, variants:[], status:'Informations à compléter'
  }
];
export const teemdropById = id => teemdropProducts.find(product => product.id === id);
