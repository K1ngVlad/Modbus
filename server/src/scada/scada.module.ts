import { Module } from '@nestjs/common';
import { ScadaService } from './scada.service';
import { ScadaGateway } from './scada.gateway';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TagModule],
  providers: [ScadaGateway, ScadaService],
})
export class ScadaModule {}
