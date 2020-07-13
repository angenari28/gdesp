import { DespesasService } from './../despesas.service';
import { GdMenuContextoInterface } from './../../np-shared/gd-menu-contexto/gd-menu-contexto.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'gd-despesas-modal',
  templateUrl: './despesas-modal.component.html',
  styleUrls: ['./despesas-modal.component.less', '../../np-shared/gd-modal/gd-modal.component.css',
  '../../np-shared/np-form/gd-table/gd-table.component.css']
})
export class DespesasModalComponent implements OnInit {
  public titulo: any;
  // @ViewChild('lgModal', { static: true }) public lgModal: ModalDirective;

  public acao: GdMenuContextoInterface[] = [
    {
      callback: this.deletarDespesa.bind(this),
      titulo: 'GENERICO_EXCLUIR'
    }
  ];
  constructor(public bsmodalRef: BsModalRef,
              public service: DespesasService) { }

  ngOnInit(): void {

    setTimeout(() => {
      console.log(this.bsmodalRef.content['0'].data['0']);
      const dados = this.bsmodalRef.content['0'].data['0'];

      this.titulo = `${dados.mesNome} / ${dados.ano}`;
    }, 0);
  }

  deletarDespesa(id: any) {
    if (id === undefined) { return; }

    this.deleteDespesa(id);
  }

  private deleteDespesa(id: any): void {
    // const entity = this.retornoModel.filter(x => x.id === id);
    // this.service
    //   .deleteDespesa(entity[0])
    //   .subscribe((items) => (this.retornoModel = items));

    // this.msgSucesso(this.i18n.getTranslation('SUCESSO_EXCLUSAO'));
    // this.getDespesas();
  }

  public fechar() {
    this.bsmodalRef.hide();
  }

}
