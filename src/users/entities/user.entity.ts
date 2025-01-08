import { Entity, Column, PrimaryGeneratedColumn,OneToMany,BeforeInsert,BeforeUpdate } from 'typeorm';
import { Education } from '../../education/entities/education.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500 })
    last_name: string;

    @Column('int')
    age: number;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 50 , default: 'user' })
    role: string;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(type => Education, education => education.user)
    educations: Education[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if (!!this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        console.log('Password hashed');
    }

}

