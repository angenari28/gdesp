import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdLoaderService } from './gd-loader.service';
import { GdLoaderSecaoComponent } from './gd-loader-secao/gd-loader-secao.component';
import { GdLoaderModalComponent } from './gd-loader-modal/gd-loader-modal.component';
import { GdLoaderCampoDirective } from './gd-loader-campo/gd-loader-campo.directive';
import { GdLoaderTabelaComponent } from './gd-loader-tabela/gd-loader-tabela.component';
import { GdLoaderDisabledDirective } from './gd-loader-disabled/gd-loader-disabled.directive';

@NgModule({
    declarations: [
        GdLoaderSecaoComponent,
        GdLoaderModalComponent,
        GdLoaderCampoDirective,
    GdLoaderDisabledDirective,
    GdLoaderTabelaComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GdLoaderSecaoComponent,
        GdLoaderModalComponent,
        GdLoaderCampoDirective,
      GdLoaderDisabledDirective,
      GdLoaderTabelaComponent
    ],
    providers: [
        GdLoaderService
    ]
})

export class GdLoaderModule {

}
