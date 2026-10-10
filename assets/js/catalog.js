import {teemdropProducts} from './teemdrop.js?v=toy-glass-1';
// All images below are sample editorial photos from Unsplash (https://unsplash.com/license).
// Only the two supplier references are displayed: the Mystery Dumpling photos are merchant-provided, and the other product remains unverified. No invented products.
const photo = (id, w=1100, crop='center') => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w + '&q=82&crop=' + crop;

export const photos = {
  hero: photo('photo-1543589077-47d81606c1bf',1800),
  advent:'./assets/images/mystery-dumpling-calendrier-coffret.webp',
  toys:'./assets/images/mystery-dumpling-calendrier-24-squishies.webp',
  home: photo('photo-1482517967863-00e15c9b44be',1000),
  beauty: photo('photo-1608571423902-eed4a5ad8108',1000),
  lifestyle: photo('photo-1512909006721-3d6018887383',1000),
  story: photo('photo-1512389142860-9c449e58a543',1600),
  journalA: photo('photo-1576919228236-a097c32a5cd4',950),
  journalB: photo('photo-1512909006721-3d6018887383',950),
  giftA: photo('photo-1512909006721-3d6018887383',900),
  giftB: photo('photo-1482517967863-00e15c9b44be',900),
  giftC: photo('photo-1576919228236-a097c32a5cd4',900)
};

export const categories = [
  {id:'Calendriers',name:'Calendriers de l’Avent',shortName:'Calendriers',subtitle:'24 jours de petites surprises',image:photos.advent,illustration:false},
  {id:'Squishies',name:'Squishies sensoriels',shortName:'Squishies',subtitle:'Petits personnages à malaxer',image:photos.toys,illustration:false},
  {id:'Boîtes mystère',name:'Boîtes mystère',shortName:'Boîtes mystère',subtitle:'Des surprises à collectionner',image:photos.giftB,illustration:true},
  {id:'Cadeaux',name:'Idées cadeaux',shortName:'Idées cadeaux',subtitle:'De jolies attentions de Noël',image:photos.giftA,illustration:true}
];

// Seller references become normal products in the storefront catalog.
// Missing supplier metadata is left genuinely blank.
export const products = [
  ...teemdropProducts.map(item=>({
    id:'teemdrop-'+item.id,
    name:item.name,
    label:item.label || 'Fiche en préparation',
    category:item.category || 'À venir',
    collections:item.collections || [],
    price:item.price ?? null,
    image:item.image ?? null,
    gallery:item.gallery || null,
    variantName:item.variantName || null,
    specifications:item.specifications || [],
    description:item.description || 'Informations sur ce produit en attente. Son nom commercial, ses photos, ses caractéristiques et son prix doivent encore être vérifiés.',
    materials:item.materials || 'Caractéristiques à renseigner',
    shippingInfo:item.shippingInfo || null,
    safetyNote:item.safetyNote || null,
    colors:[],
    tag:item.tag || 'NOUVEAUTÉ',
    supplierId:item.id,
    source:'teemdrop'
  })),
];

export const articles = [
  {id:'calendrier',date:'NOËL 2026',category:'INSPIRATION',
    title:'24 rendez-vous avec une surprise',excerpt:'Un calendrier de l’Avent, de petits personnages et le plaisir de la découverte au fil du mois de décembre.',
    image:photos.advent},
  {id:'squishy',date:'SQUISHY CLUB',category:'LE COIN DES IDÉES',
    title:'L’univers doux des mini squishies',excerpt:'Des couleurs bonbon, de drôles de personnages et des petits objets sensoriels à découvrir, toujours avec les précautions d’âge adaptées.',
    image:photos.toys}
];

export const money = amount => new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(amount);
export const productById = id => products.find(p=>p.id===id);
