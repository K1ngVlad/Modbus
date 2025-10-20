"use strict";
// import ModbusRTU from 'modbus-serial';
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOkak = void 0;
// import type {
//   TcpPortOptions,
//   ModbusRTU as ModbusClient,
// } from 'modbus-serial/ModbusRTU.js';
// type ID = number;
// export class ModbusPoller {
//   private readonly client: ModbusClient | null = null;
//   private tagsCount: number = 0;
//   private metersIdList: ID[] = [];
//   private interval: number = 1000;
//   private timer: NodeJS.Timeout | null = null;
//   private callback: (results: number[][]) => unknown = () => {};
//   constructor(adress: string, options: TcpPortOptions) {
//     const client = new ModbusRTU.default();
//     client.connectTCP(adress, options);
//     this.client = client;
//   }
//   public setTagsCount(count: number): ModbusPoller {
//     this.tagsCount = count;
//     return this;
//   }
//   public setMeters(metersIdList: ID[]): ModbusPoller {
//     this.metersIdList = metersIdList;
//     return this;
//   }
//   public setInterval(interval: number): ModbusPoller {
//     this.interval = interval;
//     return this;
//   }
//   public setCallback(callback: (results: number[][]) => unknown): ModbusPoller {
//     this.callback = callback;
//     return this;
//   }
//   public start(): ModbusPoller {
//     this.timer = setInterval(() => this.readMeters(), this.interval);
//     return this;
//   }
//   public stop(): ModbusPoller {
//     if (this.timer) {
//       clearInterval(this.timer);
//       this.timer = null;
//     }
//     return this;
//   }
//   private async readMeter(meter: ID): Promise<number[]> {
//     if (this.client) {
//       try {
//         this.client.setID(meter);
//         const result = await this.client.readHoldingRegisters(
//           0,
//           this.tagsCount
//         );
//         const { data } = result;
//         return data;
//       } catch (error) {
//         if (error instanceof Error) {
//           console.error(error.message);
//         }
//         return new Array(this.tagsCount).fill(0);
//       }
//     }
//     return new Array(this.tagsCount).fill(0);
//   }
//   private async readMeters(): Promise<void> {
//     try {
//       const results = await Promise.all(
//         this.metersIdList.map((meter) => this.readMeter(meter))
//       );
//       this.callback(results);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error(error.message);
//       }
//     }
//   }
// }
const printOkak = () => {
    console.log('OKAK');
};
exports.printOkak = printOkak;
