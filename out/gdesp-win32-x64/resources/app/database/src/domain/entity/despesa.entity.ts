import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class DespesaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idCategoria: string;

    @Column()
    valor: number;

    @Column()
    ano: number;

    @Column()
    mes: number;
}
