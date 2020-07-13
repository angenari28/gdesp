import { NgModule } from '@angular/core';
import { GdProfileComponent } from './gd-profile.component';
import { GdProfileService } from './gd-profile.service';
import { NpI18nModule } from '../np-i18n/np-i18n.module';
import {ElectronService } from 'ngx-electron';

@NgModule({
  declarations: [GdProfileComponent],
  providers: [GdProfileService, ElectronService],
  exports: [GdProfileComponent],
  imports: [NpI18nModule]
})

export class GdProfileModule {

}
