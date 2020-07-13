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
var NpLoaderDisabledDirective = /** @class */ (function () {
    function NpLoaderDisabledDirective(loader, elementRef, container, endpointService) {
        this.loader = loader;
        this.elementRef = elementRef;
        this.container = container;
        this.endpointService = endpointService;
        this.translatedEndpoint = [];
    }
    NpLoaderDisabledDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.endpointService.getEndpoint(this.endpoint)
            .subscribe(function (res) {
            _this.translatedEndpoint.push(res);
            _this.loader.registrarLoader(res, np_loader_service_1.TipoLoaderEnum.DISABLED, _this.id);
        });
    };
    NpLoaderDisabledDirective.prototype.ngDoCheck = function () {
    };
    __decorate([
        core_1.Input()
    ], NpLoaderDisabledDirective.prototype, "endpoint");
    __decorate([
        core_1.Input()
    ], NpLoaderDisabledDirective.prototype, "id");
    NpLoaderDisabledDirective = __decorate([
        core_1.Directive({
            selector: "np-loader-disabled"
        })
    ], NpLoaderDisabledDirective);
    return NpLoaderDisabledDirective;
}());
exports.NpLoaderDisabledDirective = NpLoaderDisabledDirective;
