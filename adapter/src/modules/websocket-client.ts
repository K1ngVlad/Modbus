import ws from 'websocket';

import { TagData } from './data-processor';

export class WebsocketClient {
  private readonly client: ws.client;
  private connection: ws.connection | null = null;

  constructor() {
    this.client = new ws.client();

    this.client.on('connect', (connection) => {
      this.connection = connection;
    });
  }

  public open(adress: string): WebsocketClient {
    this.close();
    this.client.connect(adress);
    return this;
  }

  public close(): WebsocketClient {
    this.connection?.close();
    this.connection = null;
    return this;
  }

  public sendTagData(tagData: TagData) {
    this.connection?.send(tagData);
    return this;
  }
}
