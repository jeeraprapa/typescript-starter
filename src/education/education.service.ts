import { Injectable,Inject } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @Inject('EDUCATION_REPOSITORY')
    private educationRepository: Repository<Education>,
  ) {}

  create(id: number,createEducationDto: CreateEducationDto) {
    const user = { id: id };
    const education = this.educationRepository.create({
      ...createEducationDto,
      user
    });
    
    return this.educationRepository.save(education);
  }

  update(id: number,educationId: number, updateEducationDto: UpdateEducationDto) {
    return this.educationRepository.update(
      { id: educationId },
      updateEducationDto,
    );
  }

  remove(id: number,educationId: number) {
    return this.educationRepository.delete(educationId);
  }
}
