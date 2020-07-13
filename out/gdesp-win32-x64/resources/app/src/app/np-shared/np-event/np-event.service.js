"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NpEventService = /** @class */ (function () {
    function NpEventService() {
        this.eventListeners = [];
        if (NpEventService_1.instance) {
            return NpEventService_1.instance;
        }
        else {
            NpEventService_1.instance = this;
        }
    }
    NpEventService_1 = NpEventService;
    /**
     * Registra um método como callback a ser executado quando um determinado evento é disparado
     * @param { string } key - Nome do evento para o qual o método será registrado
     * @param { any } func - Método a ser chamado quando o evento for disparado
     * @param { boolean } lock - Informa se o evento pode ser sobrescrito ou não
     */
    NpEventService.prototype.on = function (key, func, lock) {
        for (var i = 0; i < this.eventListeners.length; i++) {
            if (this.eventListeners[i].callback == func || this.eventListeners[i].lock) {
                return;
            }
        }
        this.eventListeners.push({
            eventKey: key,
            callback: func,
            lock: lock
        });
    };
    /**
     * Dispara um determinado evento
     * @param { string } key - Nome do evento a ser disparado
     * @param { any } obj - [Opcional] Objeto a ser enviado à todos os métodos que estão escutando este evento
     */
    NpEventService.prototype.broadcast = function (key, obj) {
        for (var i = 0; i < this.eventListeners.length; i++) {
            if (this.eventListeners[i].eventKey == key) {
                this.eventListeners[i].callback(obj);
            }
        }
    };
    NpEventService.prototype.clean = function () {
        this.eventListeners = [];
    };
    NpEventService.prototype.remove = function (key) {
        var _this = this;
        var itemsToRemove = this.eventListeners.filter(function (_) { return _.eventKey == key; });
        itemsToRemove.forEach(function (_) {
            _this.eventListeners.splice(_this.eventListeners.indexOf(_), 1);
        });
    };
    var NpEventService_1;
    NpEventService = NpEventService_1 = __decorate([
        core_1.Injectable()
        /**
          * Gerencia os eventos da aplicação utilizando o padrão Observer
          * @service EventService
          * @version 1.0.0
          */
    ], NpEventService);
    return NpEventService;
}());
exports.NpEventService = NpEventService;
