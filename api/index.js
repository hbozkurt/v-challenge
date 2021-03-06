const Koa = require('koa');
const Router = require('koa-router');
const handler = require('./handler');

const app = new Koa();
const router = new Router();

router.get('/search/quick', async (ctx, next) => {
  const { keyword }= ctx.query;

  ctx.body = await handler.search(keyword);
  ctx.status = 200;

  await next();
});

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// error middleware
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  handler.init();
  console.log('running on port 3000...');
});
