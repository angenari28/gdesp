import { CategoriaRepository } from './repository/categoria.repository';
import { Connection } from 'typeorm';
import { DespesaRepository } from './repository/despesa.repository';

export class DataBaseContext {

    constructor(conn: Connection) {
        new CategoriaRepository(conn);
        new DespesaRepository(conn);
    }
}
