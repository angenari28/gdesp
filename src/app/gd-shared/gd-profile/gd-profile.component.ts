import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdContextService } from '../gd-context/gd-context.service';
import { GdEventService } from '../gd-event/gd-event.service';
import { GdProfileService } from './gd-profile.service';
import { NpI18nService } from '../np-i18n/np-i18n.service';

@Component({
  selector: 'gd-profile',
  templateUrl: 'gd-profile.component.html',
  styleUrls: ['gd-profile.component.css']
})

export class GdProfileComponent implements OnInit {

  public menuActive: boolean;
  public usuarioAvatar: any;
  public handlerNotificacoes: any;
  public quantidadeNotificacoes: number;

  constructor(
    public service: GdProfileService,
    public router: Router,
    public contexto: GdContextService,
    public event: GdEventService,
    public i18n: NpI18nService
  ) {
  }

  ngOnInit() {

  }

  public onClick() {
    this.menuActive = !this.menuActive;
  }

  public exit() {
    this.service.closeApp();
  }
}
