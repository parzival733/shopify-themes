// All images below are sample editorial photos from Unsplash (https://unsplash.com/license).
// Product descriptions, names, prices, labels and stock are fictitious for demonstration only.
const photo = (id, w=1100, crop='center') => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w + '&q=82&crop=' + crop;

export const photos = {
  hero: photo('photo-1600210492486-724fe5c67fb0',1800),
  home: photo('photo-1600607687920-4e2a09cf159d',1000),
  beauty: photo('photo-1608571423902-eed4a5ad8108',1000),
  lifestyle: photo('photo-1483985988355-763728e1935b',1000),
  story: photo('photo-1618221195710-dd6b41faaea6',1600),
  journalA: photo('photo-1600210491892-03d54c0aaf87',950),
  journalB: photo('photo-1600607688969-a5bfcd646154',950)
};

export const categories = [
  {id:'Maison', name:'Maison & décoration', subtitle:'Matières · Objets · Lumière', image:photos.home},
  {id:'Beauté', name:'Beauté & soin', subtitle:'Rituels · Sensorialité', image:photos.beauty},
  {id:'Lifestyle', name:'Lifestyle', subtitle:'Accessoires · Quotidien', image:photos.lifestyle}
];

export const products = [
  {id:'alba',name:'Vase Alba',label:'Céramique sculpturale',category:'Maison',price:38,image:photo('photo-1578749556568-bc2c40e68b61',950),description:'Une silhouette organique et une texture délicate, imaginées pour apporter une présence singulière à votre intérieur.',materials:'Céramique · finition naturelle',colors:['Sable','Craie'],tag:'NOUVEAU'},
  {id:'sora',name:'Lampe Sora',label:'Lumière & ambiance',category:'Maison',price:129,image:photo('photo-1507473885765-e6ed057f782c',950),description:'Une lumière douce et une ligne essentielle qui accompagne tous les moments de la journée.',materials:'Matières naturelles · finition mate',colors:['Naturel','Noir'],tag:''},
  {id:'serum',name:'Sérum Botanique',label:'Rituel visage',category:'Beauté',price:42,image:photo('photo-1608571423902-eed4a5ad8108',950),description:'L’élégance d’un rituel minimaliste. Composition et allégations à définir avec la marque finale.',materials:'Flacon en verre ambré',colors:['30 ml','50 ml'],tag:'ESSENTIEL'},
  {id:'nomade',name:'Sac Nomade',label:'Accessoire quotidien',category:'Lifestyle',price:69,image:photo('photo-1590874103328-eac38a683ce7',950),description:'Un accessoire intemporel aux lignes affirmées et à l’esprit fonctionnel.',materials:'Collection accessoires',colors:['Camel','Noir'],tag:''},
  {id:'curve',name:'Fauteuil Curve',label:'Mobilier contemporain',category:'Maison',price:289,image:photo('photo-1600566753190-17f0baa2a6c3',950),description:'Une silhouette confortable et généreuse pensée pour les intérieurs calmes.',materials:'Textile · inspiration design',colors:['Écru','Taupe'],tag:'SÉLECTION'},
  {id:'pure',name:'Soin Pure',label:'Beauté essentielle',category:'Beauté',price:34,image:photo('photo-1556228720-195a672e8a03',950),description:'Un geste simple, un rituel apaisant. Contenu produit à personnaliser avant toute mise en vente.',materials:'Soin illustratif · cosmétique',colors:['100 ml','200 ml'],tag:''},
  {id:'atelier',name:'Carnet Atelier',label:'Papeterie créative',category:'Lifestyle',price:24,image:photo('photo-1531346878377-a5be20888e57',950),description:'Pour noter les inspirations et laisser de la place aux idées du quotidien.',materials:'Papeterie · inspiration',colors:['Ivoire','Sauge'],tag:''},
  {id:'cedre',name:'Bougie Cèdre',label:'Parfum d’intérieur',category:'Maison',price:31,image:photo('photo-1603006905003-be475563bc59',950),description:'Un rituel pour ralentir et prendre le temps. Senteur donnée à titre d’exemple.',materials:'Accessoire déco · senteur fictive',colors:['Sable','Ambre'],tag:'NOUVEAU'}
];

export const articles = [
  {id:'matiere',date:'10.09.2026',category:'INSPIRATION',title:'La beauté des matières naturelles',excerpt:'Bois, pierre, lin et céramique : composer des espaces qui respirent et traversent le temps.',image:photos.journalA},
  {id:'lumiere',date:'21.08.2026',category:'JOURNAL',title:'L’art de vivre, en toute simplicité',excerpt:'Lumière douce, lignes précises et détails choisis : l’élégance du quotidien.',image:photos.journalB}
];

export const money = amount => new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(amount);
export const productById = id => products.find(p=>p.id===id);
