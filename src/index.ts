import { ModbusPoller } from './modules';

const ADRESS = '127.0.0.1';
const PORT = 502;

const TAGS_COUNT = 10;
const METERS = [1, 2];
const INTERVAL = 1000;

const modbusPoller = new ModbusPoller(ADRESS, { port: PORT });

modbusPoller
  .setTagsCount(TAGS_COUNT)
  .setMeters(METERS)
  .setInterval(INTERVAL)
  .setCallback((results) => {
    console.log(results);
  })
  .start();
