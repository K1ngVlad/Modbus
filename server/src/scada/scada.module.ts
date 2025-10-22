import { Module } from '@nestjs/common';
import { ScadaService } from './scada.service';
import { ScadaGateway } from './scada.gateway';

@Module({
  imports: [],
  providers: [ScadaGateway, ScadaService],
})
export class ScadaModule {}
