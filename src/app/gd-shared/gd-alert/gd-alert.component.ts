import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GdAlertModel } from './gd-alert.model';
import { GdEventService } from '../gd-event/gd-event.service';
import { GdContextService } from '../gd-context/gd-context.service';

export class GdContextoMensagem {
  public contexto: string;
  public url: string;

  constructor(contexto: string, url: string) {
    this.contexto = contexto;
    this.url = url;
  }
}

@Component({
  selector: 'gd-alert',
  templateUrl: './gd-alert.component.html',
  styleUrls: ['./gd-alert.component.css']
})

export class GdAlertComponent implements OnInit {
  summary: GdAlertModel[] = [];
  KeyContextos = 'LISTA_ULTIMOS_CONTEXTOS_MENSAGEM';
  ultimosContextos: Array<GdContextoMensagem>;
  @Input() contexto: string;
  @Input() closeWindow: any = true;

  constructor(public event: GdEventService, public contextoService: GdContextService, public router: Router) {

  }

  ngOnInit() {

    if (this.contextoService.containsKey(this.KeyContextos)) {
      this.ultimosContextos = <Array<GdContextoMensagem>>this.contextoService.getContext(this.KeyContextos);
    } else {
      this.ultimosContextos = new Array<GdContextoMensagem>();
    }

    this.ultimosContextos.unshift(new GdContextoMensagem(this.contexto, this.router.url));

    this.contextoService.addContext(this.KeyContextos, this.ultimosContextos);

    this.event.on('mensagem-alerta-adicionar', (obj: any) => {

      if ((<GdAlertModel>obj).contexto === this.contexto) {

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

        this.summary = [<GdAlertModel>obj];
      }

    });

    this.event.on('mensagem-alerta-remover', (s: string) => {
      this.remove(s);
    });

    this.event.on('mensagem-alerta-limpar', () => {
      this.summary = [];
    });

    this.event.on('mensagem-alerta-geral', (obj: GdAlertModel) => {
      this.ultimosContextos = <Array<GdContextoMensagem>>this.contextoService.getContext(this.KeyContextos);

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
