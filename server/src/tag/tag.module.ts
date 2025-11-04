import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag.model';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [SequelizeModule.forFeature([Tag])],
  exports: [TagService],
})
export class TagModule {}
