import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpLoaderService } from './np-loader.service';
import { NpLoaderSecaoComponent } from './np-loader-secao/np-loader-secao.component';
import { NpLoaderModalComponent } from './np-loader-modal/np-loader-modal.component';
import { NpLoaderCampoDirective } from './np-loader-campo/np-loader-campo.directive';
import { NpLoaderTabelaComponent } from './np-loader-tabela/np-loader-tabela.component';
import { NpLoaderDisabledDirective } from './np-loader-disabled/np-loader-disabled.directive';

@NgModule({
    declarations: [
        NpLoaderSecaoComponent,
        NpLoaderModalComponent,
        NpLoaderCampoDirective,
    NpLoaderDisabledDirective,
    NpLoaderTabelaComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NpLoaderSecaoComponent,
        NpLoaderModalComponent,
        NpLoaderCampoDirective,
      NpLoaderDisabledDirective,
      NpLoaderTabelaComponent
    ],
    providers: [
        NpLoaderService
    ]
})

export class NpLoaderModule {

}
