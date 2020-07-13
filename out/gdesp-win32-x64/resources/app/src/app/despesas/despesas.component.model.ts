import { DespesaEntity } from './../../../database/src/domain/entity/despesa.entity';

export class DespesasModel extends DespesaEntity {
  public ano: number;
  public mes: number;
  public valor: number;
  public idCategoria: string;
  public nomeCategoria: string;

  constructor() {
    super();
    this.ano = 0;
    this.mes = 0;
    this.valor = 0;
    this.idCategoria = '';
    this.nomeCategoria = '';
  }
}
