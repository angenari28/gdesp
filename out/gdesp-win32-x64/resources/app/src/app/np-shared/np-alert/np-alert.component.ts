import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NpAlertModel } from './np-alert.model';
import { NpEventService } from '../np-event/np-event.service';
import { NpContextService } from '../np-context/np-context.service';

export class NpContextoMensagem {
  public contexto: string;
  public url: string;

  constructor(contexto: string, url: string) {
    this.contexto = contexto;
    this.url = url;
  }
}

@Component({
  selector: 'np-alert',
  templateUrl: './np-alert.component.html',
  styleUrls: ['./np-alert.component.css']
})

export class NpAlertComponent implements OnInit {
  summary: NpAlertModel[] = [];
  KeyContextos = 'LISTA_ULTIMOS_CONTEXTOS_MENSAGEM';
  ultimosContextos: Array<NpContextoMensagem>;
  @Input() contexto: string;
  @Input() closeWindow: any = true;

  constructor(public event: NpEventService, public contextoService: NpContextService, public router: Router) {

  }

  ngOnInit() {

    if (this.contextoService.containsKey(this.KeyContextos)) {
      this.ultimosContextos = <Array<NpContextoMensagem>>this.contextoService.getContext(this.KeyContextos);
    } else {
      this.ultimosContextos = new Array<NpContextoMensagem>();
    }

    this.ultimosContextos.unshift(new NpContextoMensagem(this.contexto, this.router.url));

    this.contextoService.addContext(this.KeyContextos, this.ultimosContextos);

    this.event.on('mensagem-alerta-adicionar', (obj: any) => {

      if ((<NpAlertModel>obj).contexto === this.contexto) {

        if (obj.severidade === 'danger') {

          try {
            obj.mensagem = JSON.parse(obj.mensagem);
          }

          catch (error) {
            obj.mensagem = JSON.stringify(obj.mensagem);
            obj.mensagem = JSON.parse(obj.mensagem);
          }

        }

        if (!(obj.mensagem instanceof Array)) {
          obj.mensagem = [obj.mensagem];
        }

        this.summary = [<NpAlertModel>obj];
      }

    });

    this.event.on('mensagem-alerta-remover', (s: string) => {
      this.remove(s);
    });

    this.event.on('mensagem-alerta-limpar', () => {
      this.summary = [];
    });

    this.event.on('mensagem-alerta-geral', (obj: NpAlertModel) => {
      this.ultimosContextos = <Array<NpContextoMensagem>>this.contextoService.getContext(this.KeyContextos);

      let url = '';
      for (const item of this.ultimosContextos) {

        if (url === '') {
          url = item.url;
        }

        if (url !== '' && url !== item.url) {
          break;
        }

        obj.contexto = item.contexto;
        this.event.broadcast('mensagem-alerta-adicionar', obj);
      }
    });
  }

  remove(s: string) {
    let severidade = s;
    for (let m = 0; m < this.summary.length; m++) {
      if (this.summary[m].severidade === severidade) {
        let index: number = this.summary.indexOf(this.summary[m]);
        if (index > -1) {
          this.summary.splice(index, 1);
        }
      }
    }
  }
}
