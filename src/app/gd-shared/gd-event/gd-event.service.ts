import { Injectable } from '@angular/core';

@Injectable()

/**
  * Gerencia os eventos da aplicação utilizando o padrão Observer
  * @service EventService
  * @version 1.0.0
  */
export class GdEventService {

  public eventListeners: any[] = [];
  static instance;

  constructor() {
    if (GdEventService.instance) {
      return GdEventService.instance;
    } else {
      GdEventService.instance = this;
    }
  }

  /**
   * Registra um método como callback a ser executado quando um determinado evento é disparado
   * @param { string } key - Nome do evento para o qual o método será registrado
   * @param { any } func - Método a ser chamado quando o evento for disparado
   * @param { boolean } lock - Informa se o evento pode ser sobrescrito ou não
   */
  on(key: string, func: (obj: any) => any, lock?: boolean) {

    for (let i = 0; i < this.eventListeners.length; i++) {
      if (this.eventListeners[i].callback == func || this.eventListeners[i].lock) {
        return;
      }
    }

    this.eventListeners.push(
      {
        eventKey: key,
        callback: func,
        lock: lock
      }
    );
  }

  /**
   * Dispara um determinado evento
   * @param { string } key - Nome do evento a ser disparado
   * @param { any } obj - [Opcional] Objeto a ser enviado à todos os métodos que estão escutando este evento
   */
  broadcast(key: string, obj?: any) {
    for (let i = 0; i < this.eventListeners.length; i++) {
      if (this.eventListeners[i].eventKey == key) {
        this.eventListeners[i].callback(obj);
      }
    }
  }

  clean(): void {
    this.eventListeners = [];
  }

  remove(key): void {
    var itemsToRemove = this.eventListeners.filter(_ => _.eventKey == key);
    itemsToRemove.forEach(_ => {
      this.eventListeners.splice(this.eventListeners.indexOf(_), 1);
    });
  }
}
