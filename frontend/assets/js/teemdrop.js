// TeemDrop references provided by the store owner.
// Seller product pages require authentication. Do not invent retail data.
export const teemdropProducts = [
  {
    id:'2097149928320143360',
    name:'Produit TeemDrop 01',
    supplierId:'2097149928320143360',
    supplierUrl:'https://seller.teemdrop.com/find-product/product-detail?id=2097149928320143360',
    price:null, image:null, variants:[], status:'Informations à compléter'
  },
  {
    id:'2104746312091176960',
    name:'Produit TeemDrop 02',
    supplierId:'2104746312091176960',
    supplierUrl:'https://seller.teemdrop.com/find-product/product-detail?id=2104746312091176960',
    price:null, image:null, variants:[], status:'Informations à compléter'
  }
];
export const teemdropById = id => teemdropProducts.find(product => product.id === id);
