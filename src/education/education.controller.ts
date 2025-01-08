import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('user/:id/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Param('id') id: string,@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(+id,createEducationDto);
  }

  @Patch(':educationId')
  update(@Param('id') id: string,@Param('educationId') educationId: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(+id,+educationId, updateEducationDto);
  }

  @Delete(':educationId')
  remove(@Param('id') id: string,@Param('educationId') educationId: string) {
    return this.educationService.remove(+id,+educationId);
  }
}
