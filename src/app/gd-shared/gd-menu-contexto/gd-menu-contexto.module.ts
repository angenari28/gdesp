import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Gdi18nModule } from '@gdesp/gd-i18n/gd-i18n.module';

import { GdMenuContextoComponent } from './gd-menu-contexto.component';

import { PopoverModule, PopoverConfig } from 'ngx-bootstrap/popover';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

@NgModule({
    declarations: [
        GdMenuContextoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        Gdi18nModule,
        PopoverModule
    ],
    exports: [
        GdMenuContextoComponent
    ],
    providers: [PopoverConfig, ComponentLoaderFactory, PositioningService]
})

export class GdMenuContextoModule {}
