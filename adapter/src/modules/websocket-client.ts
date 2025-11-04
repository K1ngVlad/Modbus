import { io, Socket } from 'socket.io-client';

import { FullTagData } from './data-processor';

export class WebsocketClient {
  private readonly socket: Socket;

  constructor() {
    const socket = io('http://localhost:3000');

    this.socket = socket;

    console.log('Сокет');

    socket.on('connect', () => {
      console.log('Подключение');
    });

    socket.on('disconnect', () => {
      console.log('Отключение');
    });

    socket.on('connect_error', (err) => {
      console.log(`Ошибка подключения: ${err.message}`);
    });
  }

  public sendTagData(tagData: FullTagData) {
    if (this.socket.connected) {
      this.socket.emit('newMessage', { tagData });
    }
  }
}
