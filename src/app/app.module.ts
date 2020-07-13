import { GdProfileModule } from './np-shared/gd-profile/gd-profile.module';
import { GdProfileComponent } from './np-shared/gd-profile/gd-profile.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NpLayoutComponent, NpAppComponent } from './app.component';
import { NpSharedModule } from './np-shared/np-shared.module';
import { NpEndpointService } from './np-shared/api/np-endpoint.service';
import { NpEventService } from './np-shared/np-event/np-event.service';
import { NpContextService } from './np-shared/np-context/np-context.service';

@NgModule({
  declarations: [
    NpAppComponent,
    NpLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NpSharedModule,
    RouterModule
  ],
  providers: [
    NpEndpointService,
    NpContextService,
    NpEventService],
  bootstrap: [NpAppComponent]
})
export class AppModule { }
