import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { GdLayoutComponent, GdAppComponent } from './app.component';
import { GdSharedModule } from './gd-shared/gd-shared.module';
import { NpEndpointService } from './gd-shared/api/np-endpoint.service';
import { GdEventService } from './gd-shared/gd-event/gd-event.service';
import { GdContextService } from './gd-shared/gd-context/gd-context.service';

@NgModule({
  declarations: [
    GdAppComponent,
    GdLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GdSharedModule,
    RouterModule,
  ],
  providers: [
    NpEndpointService,
    GdContextService,
    GdEventService],
  bootstrap: [GdAppComponent]
})
export class AppModule { }
