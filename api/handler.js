const MicroserviceKit = require('microservice-kit');

const microserviceKit = new MicroserviceKit({
  type: 'search-producer',
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
  }
});

async function init() {
  try {
    await microserviceKit.init();
    console.log('microserviceKit initialized...');
  } catch (err) {
    console.log('Cannot boot: ', err);
  }
}

async function search(keyword) {
  const coreQueue = microserviceKit.amqpKit.getQueue('core');
  let result;
  try {
    const resp = await coreQueue.sendEvent('search.job', { keyword }, { persistent: true });
    result = resp.hits.hits.map(p => p._source);
  } catch (e) {
    console.log('got error when searching: ', e);
    result = [];
  }

  return result;
}

module.exports = { init, search };
