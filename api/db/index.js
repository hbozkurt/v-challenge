const init = require('./init');
const searchProducts = require('./search');

setTimeout(init, 10000);

module.exports = { searchProducts };