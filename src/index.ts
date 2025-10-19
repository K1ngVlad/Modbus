import config from './config.json';

import { ModbusPoller, DataProcessor, WebsocketClient } from './modules';

const arg = process.argv[0];

const instanceNum = typeof arg === 'number' ? arg : 0;

const modbusPoller = new ModbusPoller(config.IP, config.options);

const dataProcessor = new DataProcessor(config.tagsMetadata);

const webSocketClient = new WebsocketClient();

modbusPoller
  .setTagsCount(config.tagsMetadata.count)
  .setDevices(config.devices[instanceNum])
  .setInterval(config.intervalTimeout)
  .setCallback((results) => {
    results.forEach((result) => {
      const tags = dataProcessor.normalize(result);
      tags.forEach((tag) => {
        console.log(`${tag.name}: ${tag.value.toFixed(2)} ${tag.unit}`);
        webSocketClient.sendTagData(tag);
      });
      console.log('\n ____ \n');
    });
  })
  .start();
