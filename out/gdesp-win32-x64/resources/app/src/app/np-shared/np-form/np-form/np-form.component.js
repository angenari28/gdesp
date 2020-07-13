"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var np_loader_service_1 = require("@nepos/np-loader/np-loader.service");
var NpFormComponent = /** @class */ (function () {
    function NpFormComponent(loader, endpointService) {
        this.loader = loader;
        this.endpointService = endpointService;
    }
    NpFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translatedEndpoint = [];
        if (!this.endpoints) {
            this.endpoints = [];
        }
        this.endpoints.forEach(function (_) {
            _this.endpointService.getEndpoint(_)
                .subscribe(function (res) {
                _this.translatedEndpoint.push(res);
                _this.loader.registrarLoader(res, np_loader_service_1.TipoLoaderEnum.FORM);
            });
        });
    };
    NpFormComponent.prototype.ngDoCheck = function () {
        var _this = this;
        this.isLoading = this.translatedEndpoint.some(function (_) { return _this.loader.consultarUrls(np_loader_service_1.TipoLoaderEnum.FORM, _); });
        this.loader.setLoaderStatus(np_loader_service_1.TipoLoaderEnum.FORM, this.isLoading);
        if (this.isLoading) {
            this.formGroup.disable();
        }
        // Só pode ser chamado caso o form já tenha sido habilitado
        if (!this.isLoading && this.formGroup.disabled) {
            this.formGroup.enable();
        }
    };
    __decorate([
        core_1.Input()
    ], NpFormComponent.prototype, "formGroup");
    __decorate([
        core_1.Input()
    ], NpFormComponent.prototype, "submit");
    __decorate([
        core_1.Input()
    ], NpFormComponent.prototype, "goBack");
    __decorate([
        core_1.Input()
    ], NpFormComponent.prototype, "submitCaption");
    __decorate([
        core_1.Input()
    ], NpFormComponent.prototype, "endpoints");
    NpFormComponent = __decorate([
        core_1.Component({
            selector: 'np-form',
            templateUrl: './np-form.component.html',
            styleUrls: ['./np-form.component.css']
        })
    ], NpFormComponent);
    return NpFormComponent;
}());
exports.NpFormComponent = NpFormComponent;
