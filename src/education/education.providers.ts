import { DataSource } from 'typeorm';
import { Education } from './entities/education.entity';

export const educationProviders = [
    {
        provide: 'EDUCATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Education),
        inject: ['DATA_SOURCE'],
    }
];