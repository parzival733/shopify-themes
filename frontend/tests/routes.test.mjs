import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {products} from '../assets/js/catalog.js';

const ids=['2097149928320143360','2104746312091176960'];
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
assert.match(index,/app\.js\?v=gallery-4/);
assert.doesNotMatch(index,/>TeemDrop<|Références TeemDrop/);
for(const id of ids){
 const product=products.find(p=>p.supplierId===id);
 assert.ok(product,'Product present in storefront catalog: '+id);
 if(id===ids[0]){
  assert.equal(product.price,29.90);
  assert.match(product.name,/Calendrier de l’Avent Squishy Mystery Dumpling/);
  assert.match(product.description,/24 décembre/);
  assert.ok(product.shippingInfo.includes('inclus'));
 }else{
  assert.equal(product.price,null);
 }
 if(id===ids[0]){
   assert.equal(product.image,'./assets/images/mystery-dumpling-calendrier-coffret.webp');
   assert.equal(product.gallery.length,2);
   assert.equal(product.variantName,'Christmas blind box');
   assert.match(product.materials,/PVC/);
   assert.ok(product.specifications.some(spec=>spec.value.includes('26 × 18 × 3')));
   for(const photo of product.gallery){
     const bytes=readFileSync(new URL('../'+photo.src.replace('./',''),import.meta.url));
     assert.equal(bytes.toString('ascii',0,4),'RIFF');
     assert.equal(bytes.toString('ascii',8,12),'WEBP');
     assert.ok(bytes.length>40000);
   }
 }else{
   assert.equal(product.image,null);
 }
 for(const path of ['produit-','teemdrop-']){
  const content=readFileSync(new URL('../'+path+id+'.html',import.meta.url),'utf8');
  assert.match(content,new RegExp('data-teemdrop-id="'+id+'"'));
  assert.match(content,/app\.js\?v=gallery-4/);
 }
}
const cases=[
 ...ids.map(id=>({label:'Product detail '+id,pathname:'/shopify-themes/produit-'+id+'.html',search:'',sku:id})),
 ...ids.map(id=>({label:'Legacy alias '+id,pathname:'/shopify-themes/teemdrop-'+id+'.html',search:'',sku:id})),
 ...ids.map(id=>({label:'Old query '+id,pathname:'/shopify-themes/index.html',search:'?page=teemdrop&id='+id,sku:id})),
 ...ids.map(id=>({label:'Normal product query '+id,pathname:'/shopify-themes/index.html',search:'?page=produit&id=teemdrop-'+id,sku:id})),
 {label:'Collections',pathname:'/shopify-themes/index.html',search:'?page=collection',sku:ids[0]},
 {label:'Homepage',pathname:'/shopify-themes/index.html',search:'',sku:ids[0]},
 {label:'Search by supplier reference',pathname:'/shopify-themes/index.html',search:'?page=recherche&q='+ids[1],sku:ids[1]}
];
for(const [i,scenario] of cases.entries()){
 const main={innerHTML:''};
 globalThis.location={pathname:scenario.pathname,search:scenario.search,hash:''};
 globalThis.localStorage={getItem:()=>null};
 globalThis.document={
  body:{dataset:{teemdropId:scenario.pathname.match(/(?:produit|teemdrop)-(\d{19})\.html$/)?.[1]||''}},
  title:'',
  querySelector:s=>s==='#main'?main:null,
  querySelectorAll:()=>[],
  addEventListener(){}
 };
 await import(new URL('../assets/js/app.js?test='+i,import.meta.url).href);
 assert.ok(main.innerHTML.includes(scenario.sku),scenario.label+' missing item');
 assert.doesNotMatch(main.innerHTML,/Page introuvable\.|seller\.teemdrop\.com/,scenario.label);
 if(scenario.label.startsWith('Product detail')||scenario.label.startsWith('Legacy')){
  assert.match(main.innerHTML,/class="detail"/,scenario.label+' not standard product layout');
  if(scenario.sku===ids[0]){
   assert.match(main.innerHTML,/<div class="detail-price">29,90[^<]*<span class="price-tax-note"> TTC<\/span><\/div>/,scenario.label+' must display the assigned TTC price in the product detail');
   assert.match(main.innerHTML,/data-gallery-main/,scenario.label+' should use the two supplied photos');
   assert.match(main.innerHTML,/data-gallery-src=/,scenario.label+' should provide photo selection buttons');
   assert.match(main.innerHTML,/26 × 18 × 3/,scenario.label+' should display confirmed dimensions');
   // Related products can still have an unpriced placeholder (the second supplier reference).
  }else{
   assert.match(main.innerHTML,/Prix à confirmer/,scenario.label+' invents a price');
  }
  assert.doesNotMatch(main.innerHTML,/data-add-detail=/,scenario.label+' enables unverified item purchase');
 }
 console.log('PASS',scenario.label);
}
