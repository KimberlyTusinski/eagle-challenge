import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import Schedule from '@modules/schedules/infra/typeorm/entities/Schedules';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('users_medications')
class Medication {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    dosage: string;

    @Column({ default: null })
    price: number;

    @Column('int')
    time_course: number;

    @Column({ default: null })
    image: string;

    @Column()
    schedule_id: Schedule;

    @Column()
    user_id: User;

    @ManyToOne(() => Schedule, { eager: true })
    @JoinColumn({ name: 'schedule_id' })
    schedule: Schedule;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Medication;
