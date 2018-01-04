const products = require('./products');
const esClient = require('./esClient');

function indexProducts() {
  const body = products.slice()
    .map(p => [{ index:  { _id: p.sku } }, p])
    .reduce((x, y) => x.concat(y));

  return esClient.bulk({
    index: 'products',
    type: 'chair',
    body: body
  })
}

async function init() {
  try {
    await indexProducts();
  } catch (err) {
    console.log('Got an error when initializing elasticsearch: ', err.message);
    throw new Error('elasticsearch not initialized: ', err.message);
  }
}

module.exports = init;