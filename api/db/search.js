const products = require('./products');
const esClient = require('./esClient');

function searchProducts(keyword) {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(products.filter(p => p.name.toLocaleLowerCase().includes(keyword))),
      1000,
    );
  });
}

module.exports = searchProducts;