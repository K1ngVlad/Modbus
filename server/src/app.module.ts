import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScadaModule } from './scada/scada.module';

@Module({
  imports: [ScadaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
