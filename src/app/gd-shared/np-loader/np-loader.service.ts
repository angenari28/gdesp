import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()

/**
 * Serviço que gerencia os estados de todos os componented de loader
 */
export class NpLoaderService {
  public urlsRegistradas: { endpoint: string, id?: string, context: TipoLoaderEnum, requestList: number[] }[]
  private loaderStatus: { context: TipoLoaderEnum, ativo: boolean }[];
  private defaultLoader: TipoLoaderEnum;
  private static instance: NpLoaderService;

  public ngUnsubscribe: Subject<void>[] = [];

  public isMenuLoading: boolean; //TODO: Refatorar
  public isNavigating: boolean;

  constructor() {
    if (NpLoaderService.instance) {
      return NpLoaderService.instance;
    }
    this.urlsRegistradas = [];
    this.loaderStatus = [];
    this.defaultLoader = TipoLoaderEnum.FULL;
    NpLoaderService.instance = this;
  }

  /**
   * Registra um endpoint para que este seja associado a um tipo específico de loader
   * @param endpoint - Endpoint que será registrado
   * @param context - Tipo do loader
   * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
   */
  public registrarLoader(endpoint: string, context: TipoLoaderEnum, id?: string) {

    if (!(this.urlsRegistradas.find(_ => _.endpoint.indexOf(endpoint) != -1 && _.id == id))) {
      this.urlsRegistradas.push({ context: context, endpoint: endpoint, id: id, requestList: [] });
    } else {
      this.urlsRegistradas.find(_ => _.endpoint.indexOf(endpoint) != -1 && _.id == id).context = context;
    }
  }

  /**
   * Registra um endpoint para loader default
   * @param endpoint - Endpoint que será registrado
   */
  public registrarLoaderDefault(endpoint: string) {

    if (!(this.urlsRegistradas.find(_ => endpoint.indexOf(_.endpoint) != -1 && !_.id))) {
      this.urlsRegistradas.push({ context: this.defaultLoader, endpoint: endpoint, id: undefined, requestList: [] });
    } else {
      this.urlsRegistradas.find(_ => endpoint.indexOf(_.endpoint) != -1 && !_.id).context = this.defaultLoader;
    }
  }

  /**
   * Remove um endpoint já registrado e exclui todas as chamadas http associadas
   * @param endpoint - Endpoint que será registrado
   * @param context - Tipo do loader
   * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
   */
  public removerLoader(endpoint: string, context: TipoLoaderEnum, id?: string) {
    let index: number = this.urlsRegistradas.findIndex(_ => endpoint.indexOf(_.endpoint) != -1 && _.context == context && _.id == id)
    if (index > -1) {
      this.urlsRegistradas.splice(index, 1);
    }
  }

  /**
   * Associa uma chamada http à um loader previamente registrado ou registra um novo loader do tipo FULL caso não encontre o endpoint registrado
   * @param endpoint - Endpoint que será registrado
   * @param data - Data da chamada http em milissegundos
   * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
   */
  public registrarUrl(endpoint: string, data: number, id?: string) {
    let item = this.urlsRegistradas.find(_ => endpoint.indexOf(_.endpoint) != -1 && _.id == id);
    if (item) {
      this.urlsRegistradas.find(_ => endpoint.indexOf(_.endpoint) != -1 && _.id == id).requestList.push(data);
    } else {
      this.registrarLoaderDefault(endpoint);
      this.urlsRegistradas.find(_ => endpoint.indexOf(_.endpoint) != -1 && _.context == this.defaultLoader).requestList.push(data);
    }
  }

  /**
    * Remove uma chamada http de um loader previamente registrado
    * @param endpoint - Endpoint que será registrado
    * @param data - Data da chamada http em milissegundos
    * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
    */
  public removerUrl(endpoint: string, data: number, id?: string) {
    let item = this.urlsRegistradas.find(_ => endpoint.indexOf(_.endpoint) != -1 && _.id == id);

    if (item && item.requestList && item.requestList.length > 0) {
      item.requestList.splice(item.requestList.findIndex(_ => _ == data), 1);
    }
  }

  public getDefaultLoader(): TipoLoaderEnum {
    return this.defaultLoader;
  }

  public alterarDefaultLoader(dest: TipoLoaderEnum) {
    if (dest == this.defaultLoader) return;
    let lista = this.urlsRegistradas.filter(_ => _.context == this.defaultLoader);
    lista.forEach(_ => {
      this.registrarLoader(_.endpoint, dest, _.id);
      this.removerLoader(_.endpoint, this.defaultLoader, _.id);
    });
    this.defaultLoader = dest;
  }

  /**
   * Verifica se existe alguma chamada http ativa para um tipo de Loader específico e um id
   * @param context - Tipo do loader
   * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
   */
  public consultarUrls(context: TipoLoaderEnum, endpoint?: string, id?: string) {
    let item: { endpoint: string, id?: string, context: TipoLoaderEnum, requestList: number[] }[];
    if (endpoint) {
      item = this.urlsRegistradas.filter(_ => _.context == context && (endpoint.indexOf(_.endpoint) != -1 || _.endpoint.indexOf(endpoint) != -1) && _.id == id);
    } else {
      item = this.urlsRegistradas.filter(_ => _.context == context && _.id == id);
    }
    let lista = item ? item.map(_ => _.requestList) : [];

    return (lista && lista.length > 0) ? lista.reduce((a, b) => { return a.concat(b) }).length > 0 : false;
  }

  /**
   * Altera o status de um loader específico
   * @param context - Tipo de loader
   * @param status - Status do loader
   */
  public setLoaderStatus(context: TipoLoaderEnum, status: boolean) {
    let loader = this.loaderStatus.find(_ => _.context == context);
    if (loader) {
      loader.ativo = status;
    } else {
      this.loaderStatus.push({ context: context, ativo: status });
    }
  }

  /**
   * Obtém o status de um loader
   * @param context - TIpo do loader
   */
  public getLoaderStatus(context: TipoLoaderEnum): boolean {
    let loader = this.loaderStatus.find(_ => _.context == context);
    if (loader) {
      return loader.ativo;
    }
    return false;
  }
}

/**
  * Enumerador com os tipos de loader
  */
export enum TipoLoaderEnum {
  FULL,
  TABELA,
  CAMPO,
  MODAL,
  SECAO,
  WIDGET,
  FORM,
  MENU,
  HEADER,
  DISABLED
}
