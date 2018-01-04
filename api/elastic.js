const elasticsearch = require('elasticsearch');
const products = require('./products');

const indexName = 'products';

const elasticClient = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace',
});

function indexExists() {
  return elasticClient.indices.exists({
    index: indexName,
  });
}

function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}

function initIndex() {
  const body = products.slice()
    .map(p => [{ index:  { _id: p.sku } }, p])
    .reduce((x, y) => x.concat(y));

  return elasticClient.bulk({
    index: indexName,
    type: 'chair',
    body: body
  });
}

async function init() {
  if (await indexExists()) {
    await deleteIndex();
  }

  initIndex();
}

function searchIndex(keyword) {

}

module.exports = { searchIndex, init };
