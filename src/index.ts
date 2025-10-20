import config from './config.json';

import { ModbusPoller, DataProcessor, WebsocketClient } from './modules';

const arg = process.argv[2];

const instanceNum = arg ? Number(arg) : 0;

const modbusPoller = new ModbusPoller(config.IP, config.options);

const dataProcessor = new DataProcessor(
  config.tagsMetadata,
  config.devicesMetadata,
  config.devices[instanceNum]
);

const webSocketClient = new WebsocketClient();

modbusPoller
  .setTagsCount(config.tagsMetadata.count)
  .setDevices(config.devices[instanceNum])
  .setInterval(config.intervalTimeout)
  .setCallback((results) => {
    results.forEach((result, index) => {
      const name = dataProcessor.getDeviceName(index);
      const tags = dataProcessor.normalize(result);
      console.log(name);
      tags.forEach((tag) => {
        console.log(`${tag.name}: ${tag.value.toFixed(2)} ${tag.unit}`);
        webSocketClient.sendTagData(tag);
      });
      console.log('\n ____ \n');
    });
  })
  .start();
