import { NgModule } from '@angular/core';
import { GdProfileComponent } from './gd-profile.component';
import { GdProfileService } from './gd-profile.service';
import { Gdi18nModule } from '../gd-i18n/gd-i18n.module';
import {ElectronService } from 'ngx-electron';

@NgModule({
  declarations: [GdProfileComponent],
  providers: [GdProfileService, ElectronService],
  exports: [GdProfileComponent],
  imports: [Gdi18nModule]
})

export class GdProfileModule {

}
