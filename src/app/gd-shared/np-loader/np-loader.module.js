"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var np_loader_service_1 = require("./np-loader.service");
var np_loader_secao_component_1 = require("./np-loader-secao/np-loader-secao.component");
var np_loader_modal_component_1 = require("./np-loader-modal/np-loader-modal.component");
var np_loader_campo_directive_1 = require("./np-loader-campo/np-loader-campo.directive");
var np_loader_tabela_component_1 = require("./np-loader-tabela/np-loader-tabela.component");
var np_loader_disabled_directive_1 = require("./np-loader-disabled/np-loader-disabled.directive");
var NpLoaderModule = /** @class */ (function () {
    function NpLoaderModule() {
    }
    NpLoaderModule = __decorate([
        core_1.NgModule({
            declarations: [
                np_loader_secao_component_1.NpLoaderSecaoComponent,
                np_loader_modal_component_1.NpLoaderModalComponent,
                np_loader_campo_directive_1.NpLoaderCampoDirective,
                np_loader_disabled_directive_1.NpLoaderDisabledDirective,
                np_loader_tabela_component_1.NpLoaderTabelaComponent
            ],
            imports: [
                common_1.CommonModule
            ],
            exports: [
                np_loader_secao_component_1.NpLoaderSecaoComponent,
                np_loader_modal_component_1.NpLoaderModalComponent,
                np_loader_campo_directive_1.NpLoaderCampoDirective,
                np_loader_disabled_directive_1.NpLoaderDisabledDirective,
                np_loader_tabela_component_1.NpLoaderTabelaComponent
            ],
            providers: [
                np_loader_service_1.NpLoaderService
            ]
        })
    ], NpLoaderModule);
    return NpLoaderModule;
}());
exports.NpLoaderModule = NpLoaderModule;
