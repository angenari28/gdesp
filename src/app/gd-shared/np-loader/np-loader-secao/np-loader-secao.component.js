"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var np_loader_service_1 = require("../np-loader.service");
var NpLoaderSecaoComponent = /** @class */ (function () {
    function NpLoaderSecaoComponent(loader) {
        this.loader = loader;
    }
    /**
     * Verifica se existe algum endpoint registrado no loaderService associado ao loader do tipo SECAO
     */
    NpLoaderSecaoComponent.prototype.ngDoCheck = function () {
        if (this.loader.getDefaultLoader() == np_loader_service_1.TipoLoaderEnum.FULL && !this.loader.getLoaderStatus(np_loader_service_1.TipoLoaderEnum.FULL)) {
            this.loader.alterarDefaultLoader(np_loader_service_1.TipoLoaderEnum.SECAO);
        }
        this.isRequesting = this.loader.consultarUrls(np_loader_service_1.TipoLoaderEnum.SECAO);
        this.isNavigating = this.loader.isNavigating;
        this.isLoading = (this.isNavigating || this.isRequesting) && !this.loader.getLoaderStatus(np_loader_service_1.TipoLoaderEnum.FULL);
        //document.documentElement.style.overflow = (this.isNavigating || this.isRequesting) && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL) ? "hidden" : "auto";
        this.loader.setLoaderStatus(np_loader_service_1.TipoLoaderEnum.SECAO, this.isLoading);
    };
    NpLoaderSecaoComponent = __decorate([
        core_1.Component({
            selector: 'np-loader-secao',
            templateUrl: './np-loader-secao.component.html',
            styleUrls: ['./np-loader-secao.component.css']
        })
        /**
          * COmponente de loader que é aplicado na tela inteira
          */
    ], NpLoaderSecaoComponent);
    return NpLoaderSecaoComponent;
}());
exports.NpLoaderSecaoComponent = NpLoaderSecaoComponent;
