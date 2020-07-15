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
var NpLoaderCampoDirective = /** @class */ (function () {
    function NpLoaderCampoDirective(loader, elementRef, container, endpointService) {
        this.loader = loader;
        this.elementRef = elementRef;
        this.container = container;
        this.endpointService = endpointService;
        this.translatedEndpoint = [];
    }
    NpLoaderCampoDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.endpoint.forEach(function (_) {
            _this.endpointService.getEndpoint(_)
                .subscribe(function (res) {
                _this.translatedEndpoint.push(res);
                _this.loader.registrarLoader(res, np_loader_service_1.TipoLoaderEnum.CAMPO, _this.id);
            });
        });
    };
    /**
     * Verifica se existe algum endpoint registrado no loaderService associado ao loader do tipo CAMPO
     */
    NpLoaderCampoDirective.prototype.ngDoCheck = function () {
        var _this = this;
        this.isRequesting = this.translatedEndpoint.some(function (_) { return _this.loader.consultarUrls(np_loader_service_1.TipoLoaderEnum.CAMPO, _, _this.id); });
        this.isLoading = this.isRequesting && !this.loader.getLoaderStatus(np_loader_service_1.TipoLoaderEnum.FULL) && !this.loader.getLoaderStatus(np_loader_service_1.TipoLoaderEnum.SECAO);
        this.loader.setLoaderStatus(np_loader_service_1.TipoLoaderEnum.CAMPO, this.isLoading);
        if (this.isLoading) {
            this.elementRef.nativeElement.classList.add("np-loader-campo--directive");
        }
        else {
            this.elementRef.nativeElement.classList.remove("np-loader-campo--directive");
        }
    };
    __decorate([
        core_1.Input()
    ], NpLoaderCampoDirective.prototype, "endpoint");
    __decorate([
        core_1.Input()
    ], NpLoaderCampoDirective.prototype, "id");
    NpLoaderCampoDirective = __decorate([
        core_1.Directive({
            selector: "[np-loader-campo]"
        })
    ], NpLoaderCampoDirective);
    return NpLoaderCampoDirective;
}());
exports.NpLoaderCampoDirective = NpLoaderCampoDirective;
