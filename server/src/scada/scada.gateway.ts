import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WriteTagDto } from 'src/tag/dto';
import { TagService } from 'src/tag/tag.service';

@WebSocketGateway()
export class ScadaGateway {
  constructor(private tagService: TagService) {}

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    const dto = body.tagData as WriteTagDto;
    this.tagService.writeTag(dto);
  }
}
