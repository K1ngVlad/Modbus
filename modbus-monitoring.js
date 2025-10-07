import ModbusRTU from 'modbus-serial';

export class ModbusMonitoring {
  client = null;
  tagsCount = 0;
  metersIdList = [];
  interval = 1000;
  timer = null;

  constructor(adress, options) {
    const client = new ModbusRTU();
    client.connectTCP(adress, options);
    this.client = client;
  }

  setTagsCount(count) {
    this.tagsCount = count;
    return this;
  }

  setMeters(metersIdList) {
    this.metersIdList = metersIdList;
    return this;
  }

  setInterval(interval) {
    this.interval = interval;
    return this;
  }

  start() {
    this.timer = setInterval(() => this.readMeters(), this.interval);
    return this;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    return this;
  }

  async readMeter(meter) {
    this.client.setID(meter);
    const result = await this.client.readHoldingRegisters(0, this.tagsCount);
    const { data } = result;
    return data;
  }

  async readMeters() {
    const results = await Promise.all(
      this.metersIdList.map((meter) => this.readMeter(meter))
    );
    console.log(results);
  }
}
