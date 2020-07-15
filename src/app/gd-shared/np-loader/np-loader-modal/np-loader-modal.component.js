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
var NpLoaderModalComponent = /** @class */ (function () {
    function NpLoaderModalComponent(loader, endpointService) {
        this.loader = loader;
        this.endpointService = endpointService;
        this.translatedEndpoint = [];
    }
    NpLoaderModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.endpoint.forEach(function (_) {
            _this.endpointService.getEndpoint(_)
                .subscribe(function (res) {
                _this.translatedEndpoint.push(res);
                _this.loader.registrarLoader(res, np_loader_service_1.TipoLoaderEnum.MODAL, _this.id);
            });
        });
    };
    /**
     * Verifica se existe algum endpoint registrado no loaderService associado ao loader do tipo MODAL
     */
    NpLoaderModalComponent.prototype.ngDoCheck = function () {
        var _this = this;
        this.isRequesting = this.translatedEndpoint.some(function (_) { return _this.loader.consultarUrls(np_loader_service_1.TipoLoaderEnum.MODAL, _, _this.id); });
        this.isNavigating = this.loader.isNavigating;
        this.isLoading = (this.isNavigating || this.isRequesting) && !this.loader.getLoaderStatus(np_loader_service_1.TipoLoaderEnum.FULL) && !this.loader.getLoaderStatus(np_loader_service_1.TipoLoaderEnum.SECAO);
        this.loader.setLoaderStatus(np_loader_service_1.TipoLoaderEnum.MODAL, this.isLoading);
    };
    __decorate([
        core_1.Input()
    ], NpLoaderModalComponent.prototype, "endpoint");
    __decorate([
        core_1.Input()
    ], NpLoaderModalComponent.prototype, "id");
    NpLoaderModalComponent = __decorate([
        core_1.Component({
            selector: 'np-loader-modal',
            templateUrl: './np-loader-modal.component.html'
        })
        /**
          * COmponente de loader que é aplicado nos modais
          */
    ], NpLoaderModalComponent);
    return NpLoaderModalComponent;
}());
exports.NpLoaderModalComponent = NpLoaderModalComponent;
