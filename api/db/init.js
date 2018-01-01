const products = require('./products');
const esClient = require('./esClient');

let tryCount = 0;

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
    tryCount += 1;
    await indexProducts();
  } catch (err) {
    if (tryCount < 10) {
      console.log('Got an error when initializing elasticsearch: ', err.message);
      console.log('retrying... ', tryCount);
      setTimeout(init, tryCount * 1000);;
    } else {
      console.log('Done trying after %d times. elasticsearch not initialized: ', tryCount, err.message);
      throw new Error('elasticsearch not initialized: ', err.message);
    }
  }
}

module.exports = init;