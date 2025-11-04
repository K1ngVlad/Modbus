import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScadaModule } from './scada/scada.module';
import { TagModule } from './tag/tag.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag/tag.model';

@Module({
  imports: [
    ScadaModule,
    TagModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '123',
      database: 'scada',
      models: [Tag],
      autoLoadModels: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
