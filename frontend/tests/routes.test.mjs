import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const supplierIds = ['2097149928320143360','2104746312091176960'];
const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.match(index, /app\.js\?v=teemdrop-routing-2/);

for (const id of supplierIds) {
  const pageHtml = readFileSync(new URL('../teemdrop-' + id + '.html', import.meta.url),'utf8');
  assert.match(pageHtml, new RegExp('data-teemdrop-id="' + id + '"'));
  assert.match(pageHtml, /app\.js\?v=teemdrop-routing-2/);
}

const cases = [
  ...supplierIds.map(id => ({
    label: 'legacy query '+id,
    pathname: '/shopify-themes/index.html',
    search: '?page=teemdrop&id='+id,
    datasetId: '',
    expectedId: id
  })),
  ...supplierIds.map(id => ({
    label: 'static HTML '+id,
    pathname: '/shopify-themes/teemdrop-'+id+'.html',
    search: '',
    datasetId: id,
    expectedId: id
  })),
  {
    label:'legacy product alias',
    pathname:'/shopify-themes/index.html',
    search:'?page=produit&id='+supplierIds[0],
    datasetId:'',
    expectedId:supplierIds[0]
  },
  {
    label:'supplier list without id',
    pathname:'/shopify-themes/index.html',
    search:'?page=teemdrop',
    datasetId:'',
    expectedId:supplierIds[1]
  },
  {
    label:'supplier reference search',
    pathname:'/shopify-themes/index.html',
    search:'?page=recherche&q='+supplierIds[1],
    datasetId:'',
    expectedId:supplierIds[1]
  }
];

for (const [i,scenario] of cases.entries()) {
  const main = { innerHTML: '' };
  globalThis.location = { pathname: scenario.pathname, search: scenario.search, hash: '' };
  globalThis.localStorage = { getItem: () => null };
  globalThis.document = {
    body: { dataset: { teemdropId: scenario.datasetId } },
    title: '',
    querySelector(selector) { return selector === '#main' ? main : null; },
    querySelectorAll() { return []; },
    addEventListener() {}
  };
  await import(new URL('../assets/js/app.js?route-smoke='+i, import.meta.url).href);
  assert.ok(main.innerHTML.includes(scenario.expectedId),scenario.label+' missing supplier ID');
  assert.ok(!main.innerHTML.includes('Page introuvable.'),scenario.label+' rendered internal 404');
  console.log('PASS',scenario.label);
}
