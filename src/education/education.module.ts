import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { educationProviders } from './education.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EducationController],
  providers: [...educationProviders, EducationService],
})
export class EducationModule {}
