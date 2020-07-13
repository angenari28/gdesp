import { getAllCategoria, addCategoria, deleteCategoria } from './../../domain/channel/categoria.channel';
import { CategoriaEntity } from './../../domain/entity/categoria.entity';
import { Connection } from 'typeorm';
import { getAll, add, deleteItem } from '../shared/repository/RepositoryBase';

export class CategoriaRepository {

    constructor(public conn: Connection) {
        this.CategoriaRepository();
     }

  public CategoriaRepository() {
    const categoriaRepo = this.conn.getRepository(CategoriaEntity);

    getAll(categoriaRepo, getAllCategoria);

    add(categoriaRepo, typeof CategoriaEntity, addCategoria);

    deleteItem(categoriaRepo, typeof CategoriaEntity, deleteCategoria);

    }
}
