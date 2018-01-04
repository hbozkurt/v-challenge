const  elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error',
  apiVersion: '6.0',
});

module.exports = esClient;