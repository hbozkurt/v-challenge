const elasticsearch = require('elasticsearch');
const products = require('./products');

const indexName = 'products';
const typeName = 'chair'

const elasticClient = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  apiVersion: '5.6',
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

function createIndex() {
  const body = {
    mappings: {
      [typeName]: {
        properties: {
          sku: { type: "keyword" },
          ediRef: { type: "keyword" },
          name: { type: "text", analyzer: "english"},
          description: { type: "text", analyzer: "english" },
          isInStock: { type: "boolean" }
        }
      }
    }
  };
  return elasticClient.indices.create({
    index: indexName,
    body: body
  });
}

function populateIndex() {
  const body = products
    .map(p => [{ index:  { _id: p.sku } }, p])
    .reduce((x, y) => x.concat(y));

  return elasticClient.bulk({
    index: indexName,
    type: typeName,
    body: body
  });
}

function searchIndex(keyword) {
  const body = {
    query: {
      bool: {
        must: {
          "multi_match": {
            "query": keyword,
            "fields": ["name", "description", "sku", "ediRef"],
            "fuzziness" : "AUTO"
          }
        },
        should: [
          { match: { isInStock: true }}
        ]
      }
    }
  };

  return elasticClient.search({
    index: indexName,
    type: typeName,
    body: body
  });
}

async function init() {
  if (await indexExists()) {
    await deleteIndex();
  }

  await createIndex();
  return populateIndex();
}

module.exports = { searchIndex, init };
