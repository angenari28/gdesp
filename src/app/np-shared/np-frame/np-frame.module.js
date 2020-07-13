"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var np_frame_component_1 = require("./np-frame.component");
var np_header_module_1 = require("../np-header/np-header.module");
var np_nav_module_1 = require("../np-nav/np-nav.module");
var np_footer_module_1 = require("../np-footer/np-footer.module");
var np_content_module_1 = require("../np-content/np-content.module");
var np_nav_button_module_1 = require("../np-nav-button/np-nav-button.module");
var NpFrameModule = /** @class */ (function () {
    function NpFrameModule() {
    }
    NpFrameModule = __decorate([
        core_1.NgModule({
            declarations: [
                np_frame_component_1.NpFrameComponent
            ],
            exports: [
                np_frame_component_1.NpFrameComponent
            ],
            imports: [
                router_1.RouterModule,
                np_header_module_1.NpHeaderModule,
                np_nav_module_1.NpNavModule,
                np_footer_module_1.NpFooterModule,
                np_content_module_1.NpContentModule,
                np_nav_button_module_1.NpNavButtonModule
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], NpFrameModule);
    return NpFrameModule;
}());
exports.NpFrameModule = NpFrameModule;
