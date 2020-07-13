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
var np_action_bar_component_1 = require("./np-action-bar.component");
var NpActionBarModule = /** @class */ (function () {
    function NpActionBarModule() {
    }
    NpActionBarModule = __decorate([
        core_1.NgModule({
            declarations: [
                np_action_bar_component_1.NpActionBarComponent
            ],
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule
            ],
            exports: [
                np_action_bar_component_1.NpActionBarComponent
            ]
        })
    ], NpActionBarModule);
    return NpActionBarModule;
}());
exports.NpActionBarModule = NpActionBarModule;
