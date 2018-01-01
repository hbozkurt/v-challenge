const { searchProducts } = require('./db');

async function productsHandler (ctx, next) {
  const { keyword }= ctx.query;      
  ctx.body = await searchProducts(keyword);
  ctx.status = 200;

  await next();
}

module.exports = productsHandler;