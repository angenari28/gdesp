import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    value: number;

    @Column()
    key: string;
}
