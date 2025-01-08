import { Entity, Column, PrimaryGeneratedColumn,ManyToOne  } from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column('int')
    year: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(type => User, user => user.educations)
    user: User;
}
