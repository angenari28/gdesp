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
var NpTextareaComponent = /** @class */ (function () {
    function NpTextareaComponent(i18n) {
        this.i18n = i18n;
    }
    __decorate([
        core_1.Input()
    ], NpTextareaComponent.prototype, "form");
    __decorate([
        core_1.Input()
    ], NpTextareaComponent.prototype, "controlName");
    __decorate([
        core_1.Input()
    ], NpTextareaComponent.prototype, "colunas");
    __decorate([
        core_1.Input()
    ], NpTextareaComponent.prototype, "maxlength");
    __decorate([
        core_1.Input()
    ], NpTextareaComponent.prototype, "label");
    NpTextareaComponent = __decorate([
        core_1.Component({
            selector: 'np-textarea',
            templateUrl: './np-textarea.component.html',
            styleUrls: ['./np-textarea.component.css'],
            viewProviders: [
                { provide: forms_1.ControlContainer, useExisting: forms_1.FormGroupDirective, useValue: null }
            ]
        })
    ], NpTextareaComponent);
    return NpTextareaComponent;
}());
exports.NpTextareaComponent = NpTextareaComponent;
