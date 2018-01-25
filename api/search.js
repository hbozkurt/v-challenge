const MicroserviceKit = require('microservice-kit');
const elastic = require('./elastic');

const microserviceKit = new MicroserviceKit({
  type: 'search-worker',
  config: null,
  amqp: {
    url: 'amqp://rabbitmq:5672',
    queues: [
    {
      name: 'core',
      key: 'core',
      options: {durable: true}
    }
    ],
    logger: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[amqpkit]');
      console.log.apply(console, args);
    }
  },
  shutdown: {
    logger: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[shutdownkit]');
      console.log.apply(console, args);
    }
  }
});

const sortByInStock = (x, y) => x.isInStock === y.isInStock ? 0 : (x.isInStock ? -1 : 1)

async function init() {
  await elastic.init();
  await microserviceKit.init();

  const coreQueue = microserviceKit.amqpKit.getQueue('core');
  coreQueue.consumeEvent('search.job', async (data, done) => {
    const { keyword } = data;
      const result = await elastic.searchIndex(keyword); // TODO error check

      done(null, result.hits.hits.map(p => p._source).sort(sortByInStock));
    });
}

init();
