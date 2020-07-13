"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var np_form_component_1 = require("./np-form.component");
var np_i18n_module_1 = require("../../np-i18n/np-i18n.module");
var np_button_module_1 = require("../np-button/np-button.module");
var np_action_bar_module_1 = require("../np-action-bar/np-action-bar.module");
var np_validacao_module_1 = require("../np-validacao/np-validacao.module");
var NpFormModule = /** @class */ (function () {
    function NpFormModule() {
    }
    NpFormModule = __decorate([
        core_1.NgModule({
            declarations: [
                np_form_component_1.NpFormComponent
            ],
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                np_i18n_module_1.NpI18nModule,
                np_button_module_1.NpButtonModule,
                np_action_bar_module_1.NpActionBarModule,
                np_validacao_module_1.NpValidacaoModule
            ],
            exports: [
                np_form_component_1.NpFormComponent
            ]
        })
    ], NpFormModule);
    return NpFormModule;
}());
exports.NpFormModule = NpFormModule;
