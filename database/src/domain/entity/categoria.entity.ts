import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
