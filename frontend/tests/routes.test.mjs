import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {products} from '../assets/js/catalog.js';

const ids=['2097149928320143360','2104746312091176960'];
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
assert.match(index,/app\.js\?v=product-page-3/);
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
 assert.equal(product.image,null);
 for(const path of ['produit-','teemdrop-']){
  const content=readFileSync(new URL('../'+path+id+'.html',import.meta.url),'utf8');
  assert.match(content,new RegExp('data-teemdrop-id="'+id+'"'));
  assert.match(content,/app\.js\?v=product-page-3/);
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
   assert.match(main.innerHTML,/29,90/,scenario.label+' must show the recommended selling price');
   assert.doesNotMatch(main.innerHTML,/Prix à confirmer/,scenario.label+' should not hide the set price');
  }else{
   assert.match(main.innerHTML,/Prix à confirmer/,scenario.label+' invents a price');
  }
  assert.doesNotMatch(main.innerHTML,/data-add-detail=/,scenario.label+' enables unverified item purchase');
 }
 console.log('PASS',scenario.label);
}
