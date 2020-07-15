"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var np_i18n_module_1 = require("./../gd-i18n/gd-i18n.module");
var np_textarea_component_1 = require("./np-textarea.component");
var NpTextareaModule = /** @class */ (function () {
    function NpTextareaModule() {
    }
    NpTextareaModule = __decorate([
        core_1.NgModule({
            declarations: [np_textarea_component_1.NpTextareaComponent],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                np_i18n_module_1.Gdi18nModule
            ],
            exports: [np_textarea_component_1.NpTextareaComponent]
        })
    ], NpTextareaModule);
    return NpTextareaModule;
}());
exports.NpTextareaModule = NpTextareaModule;
