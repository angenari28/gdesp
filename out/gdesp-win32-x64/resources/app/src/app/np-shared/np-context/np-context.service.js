"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NpContextService = /** @class */ (function () {
    function NpContextService() {
        this.context = [];
        this.loadSessionContext();
        if (NpContextService_1.instance) {
            return NpContextService_1.instance;
        }
        else {
            NpContextService_1.instance = this;
        }
    }
    NpContextService_1 = NpContextService;
    NpContextService.prototype.addContext = function (key, obj) {
        var _a;
        this.removeContext(key);
        this.context.push((_a = {},
            _a[key] = obj,
            _a));
        this.saveSessionContext();
    };
    NpContextService.prototype.containsKey = function (key) {
        for (var i = 0; i < this.context.length; i++) {
            if (this.context[i][key]) {
                return true;
            }
        }
        return false;
    };
    NpContextService.prototype.removeContext = function (key) {
        var tempList = [];
        this.loadSessionContext();
        for (var i = 0; i < this.context.length; i++) {
            if (this.context[i][key]) {
                tempList.push(this.context[i]);
            }
        }
        for (var i = 0; i < tempList.length; i++) {
            var index = this.context.indexOf(tempList[i]);
            if (index > -1) {
                this.context.splice(index, 1);
            }
        }
        this.saveSessionContext();
    };
    NpContextService.prototype.getContext = function (key) {
        this.loadSessionContext();
        for (var i = 0; i < this.context.length; i++) {
            if (this.context[i][key]) {
                return this.context[i][key];
            }
        }
        return null;
    };
    NpContextService.prototype.clearContext = function () {
        this.context = [];
        this.saveSessionContext();
    };
    NpContextService.prototype.saveSessionContext = function () {
        sessionStorage.setItem('context', JSON.stringify(this.context));
    };
    NpContextService.prototype.loadSessionContext = function () {
        this.context = JSON.parse(sessionStorage.getItem('context')) || [];
    };
    var NpContextService_1;
    NpContextService = NpContextService_1 = __decorate([
        core_1.Injectable()
    ], NpContextService);
    return NpContextService;
}());
exports.NpContextService = NpContextService;
