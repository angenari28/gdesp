"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NpLoaderService = /** @class */ (function () {
    function NpLoaderService() {
        this.ngUnsubscribe = [];
        if (NpLoaderService_1.instance) {
            return NpLoaderService_1.instance;
        }
        this.urlsRegistradas = [];
        this.loaderStatus = [];
        this.defaultLoader = TipoLoaderEnum.FULL;
        NpLoaderService_1.instance = this;
    }
    NpLoaderService_1 = NpLoaderService;
    /**
     * Registra um endpoint para que este seja associado a um tipo específico de loader
     * @param endpoint - Endpoint que será registrado
     * @param context - Tipo do loader
     * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
     */
    NpLoaderService.prototype.registrarLoader = function (endpoint, context, id) {
        if (!(this.urlsRegistradas.find(function (_) { return _.endpoint.indexOf(endpoint) != -1 && _.id == id; }))) {
            this.urlsRegistradas.push({ context: context, endpoint: endpoint, id: id, requestList: [] });
        }
        else {
            this.urlsRegistradas.find(function (_) { return _.endpoint.indexOf(endpoint) != -1 && _.id == id; }).context = context;
        }
    };
    /**
     * Registra um endpoint para loader default
     * @param endpoint - Endpoint que será registrado
     */
    NpLoaderService.prototype.registrarLoaderDefault = function (endpoint) {
        if (!(this.urlsRegistradas.find(function (_) { return endpoint.indexOf(_.endpoint) != -1 && !_.id; }))) {
            this.urlsRegistradas.push({ context: this.defaultLoader, endpoint: endpoint, id: undefined, requestList: [] });
        }
        else {
            this.urlsRegistradas.find(function (_) { return endpoint.indexOf(_.endpoint) != -1 && !_.id; }).context = this.defaultLoader;
        }
    };
    /**
     * Remove um endpoint já registrado e exclui todas as chamadas http associadas
     * @param endpoint - Endpoint que será registrado
     * @param context - Tipo do loader
     * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
     */
    NpLoaderService.prototype.removerLoader = function (endpoint, context, id) {
        var index = this.urlsRegistradas.findIndex(function (_) { return endpoint.indexOf(_.endpoint) != -1 && _.context == context && _.id == id; });
        if (index > -1) {
            this.urlsRegistradas.splice(index, 1);
        }
    };
    /**
     * Associa uma chamada http à um loader previamente registrado ou registra um novo loader do tipo FULL caso não encontre o endpoint registrado
     * @param endpoint - Endpoint que será registrado
     * @param data - Data da chamada http em milissegundos
     * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
     */
    NpLoaderService.prototype.registrarUrl = function (endpoint, data, id) {
        var _this = this;
        var item = this.urlsRegistradas.find(function (_) { return endpoint.indexOf(_.endpoint) != -1 && _.id == id; });
        if (item) {
            this.urlsRegistradas.find(function (_) { return endpoint.indexOf(_.endpoint) != -1 && _.id == id; }).requestList.push(data);
        }
        else {
            this.registrarLoaderDefault(endpoint);
            this.urlsRegistradas.find(function (_) { return endpoint.indexOf(_.endpoint) != -1 && _.context == _this.defaultLoader; }).requestList.push(data);
        }
    };
    /**
      * Remove uma chamada http de um loader previamente registrado
      * @param endpoint - Endpoint que será registrado
      * @param data - Data da chamada http em milissegundos
      * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
      */
    NpLoaderService.prototype.removerUrl = function (endpoint, data, id) {
        var item = this.urlsRegistradas.find(function (_) { return endpoint.indexOf(_.endpoint) != -1 && _.id == id; });
        if (item && item.requestList && item.requestList.length > 0) {
            item.requestList.splice(item.requestList.findIndex(function (_) { return _ == data; }), 1);
        }
    };
    NpLoaderService.prototype.getDefaultLoader = function () {
        return this.defaultLoader;
    };
    NpLoaderService.prototype.alterarDefaultLoader = function (dest) {
        var _this = this;
        if (dest == this.defaultLoader)
            return;
        var lista = this.urlsRegistradas.filter(function (_) { return _.context == _this.defaultLoader; });
        lista.forEach(function (_) {
            _this.registrarLoader(_.endpoint, dest, _.id);
            _this.removerLoader(_.endpoint, _this.defaultLoader, _.id);
        });
        this.defaultLoader = dest;
    };
    /**
     * Verifica se existe alguma chamada http ativa para um tipo de Loader específico e um id
     * @param context - Tipo do loader
     * @param id - Id opcional, caso exista um mesmo endpoint que dispara mais de um loader
     */
    NpLoaderService.prototype.consultarUrls = function (context, endpoint, id) {
        var item;
        if (endpoint) {
            item = this.urlsRegistradas.filter(function (_) { return _.context == context && (endpoint.indexOf(_.endpoint) != -1 || _.endpoint.indexOf(endpoint) != -1) && _.id == id; });
        }
        else {
            item = this.urlsRegistradas.filter(function (_) { return _.context == context && _.id == id; });
        }
        var lista = item ? item.map(function (_) { return _.requestList; }) : [];
        return (lista && lista.length > 0) ? lista.reduce(function (a, b) { return a.concat(b); }).length > 0 : false;
    };
    /**
     * Altera o status de um loader específico
     * @param context - Tipo de loader
     * @param status - Status do loader
     */
    NpLoaderService.prototype.setLoaderStatus = function (context, status) {
        var loader = this.loaderStatus.find(function (_) { return _.context == context; });
        if (loader) {
            loader.ativo = status;
        }
        else {
            this.loaderStatus.push({ context: context, ativo: status });
        }
    };
    /**
     * Obtém o status de um loader
     * @param context - TIpo do loader
     */
    NpLoaderService.prototype.getLoaderStatus = function (context) {
        var loader = this.loaderStatus.find(function (_) { return _.context == context; });
        if (loader) {
            return loader.ativo;
        }
        return false;
    };
    var NpLoaderService_1;
    NpLoaderService = NpLoaderService_1 = __decorate([
        core_1.Injectable()
        /**
         * Serviço que gerencia os estados de todos os componented de loader
         */
    ], NpLoaderService);
    return NpLoaderService;
}());
exports.NpLoaderService = NpLoaderService;
/**
  * Enumerador com os tipos de loader
  */
var TipoLoaderEnum;
(function (TipoLoaderEnum) {
    TipoLoaderEnum[TipoLoaderEnum["FULL"] = 0] = "FULL";
    TipoLoaderEnum[TipoLoaderEnum["TABELA"] = 1] = "TABELA";
    TipoLoaderEnum[TipoLoaderEnum["CAMPO"] = 2] = "CAMPO";
    TipoLoaderEnum[TipoLoaderEnum["MODAL"] = 3] = "MODAL";
    TipoLoaderEnum[TipoLoaderEnum["SECAO"] = 4] = "SECAO";
    TipoLoaderEnum[TipoLoaderEnum["WIDGET"] = 5] = "WIDGET";
    TipoLoaderEnum[TipoLoaderEnum["FORM"] = 6] = "FORM";
    TipoLoaderEnum[TipoLoaderEnum["MENU"] = 7] = "MENU";
    TipoLoaderEnum[TipoLoaderEnum["HEADER"] = 8] = "HEADER";
    TipoLoaderEnum[TipoLoaderEnum["DISABLED"] = 9] = "DISABLED";
})(TipoLoaderEnum = exports.TipoLoaderEnum || (exports.TipoLoaderEnum = {}));
