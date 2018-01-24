const elasticsearch = require('elasticsearch');
const products = require('./products');

const indexName = 'products';
const typeName = 'chair'

const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  apiVersion: '5.6',
});

function indexExists() {
  return client.indices.exists({
    index: indexName,
  });
}

function deleteIndex() {
  return client.indices.delete({
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
  return client.indices.create({
    index: indexName,
    body: body
  });
}

function populateIndex() {
  const body = products
    .map(p => [{ index: { _id: p.sku }}, p])
    .reduce((x, y) => x.concat(y));

  return client.bulk({
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
          multi_match: {
            query: keyword,
            fields: ["name", "description", "sku", "ediRef"],
            fuzziness : "AUTO"
          }
        },
        should: [
          { match: { isInStock: true }}
        ]
      }
    }
  };

  return client.search({
    index: indexName,
    type: typeName,
    body: body
  });
}

function ping() {
  return client.ping({
    requestTimeout: 10000
  });
}

async function init() {
  try {
    await ping();
  } catch (e) {
    console.log('elasticsearch is down...');
    return;
  }

  if (await indexExists()) {
    await deleteIndex();
  }

  await createIndex();
  return populateIndex();
}

module.exports = { searchIndex, init };
