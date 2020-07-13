import { ipcMain } from 'electron';
import { Connection } from 'typeorm';
import { getAll, add, deleteItem } from '../shared/repository/RepositoryBase';

import { getAllDespesa, addDespesa, deleteDespesa, getAllByDespesa } from './../../domain/channel/despesa.channel';
import { DespesaEntity } from './../../domain/entity/despesa.entity';

export class DespesaRepository {

    constructor(public conn: Connection) {
        this.DespesaRepository();
     }

  public DespesaRepository() {
    const despesaRepo = this.conn.getRepository(DespesaEntity);

    getAll(despesaRepo, getAllDespesa);

    add(despesaRepo, typeof DespesaEntity, addDespesa);

    deleteItem(despesaRepo, typeof DespesaEntity, deleteDespesa);

    ipcMain.on(getAllByDespesa, async (event: any, ano: number, ...args: any[]) => {
      try {
        event.returnValue = await despesaRepo.createQueryBuilder('despesa')
        .where('despesa.ano = :ano', {ano})
        .getMany();
      } catch (err) {
        throw err;
      }
    });

    }
}
