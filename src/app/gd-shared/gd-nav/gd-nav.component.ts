import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { GdI18nService } from '../gd-i18n/gd-i18n.service';
import { GdNavService } from './gd-nav.service';

@Component({
  selector: 'gd-nav',
  templateUrl: './gd-nav.component.html',
  styleUrls: ['./gd-nav.component.css']
})
export class GdNavComponent implements OnInit {
  menu: any[];

  constructor(
    public service: GdNavService,
    public location: Location,
    public router: Router,
    public i18n: GdI18nService) {
  }

  ngOnInit() {
    this.router.events.subscribe(res => {
      if (res.constructor == NavigationEnd) {
        this.carregarMenu(this.location.path() || '/');
      }
    })

    this.carregarMenu(this.location.path() || '/');
  }

  atualizarMenu(url: string) {
    this.menu.forEach(_ => {
      _.active = false;
      if (_.Url && (url.indexOf(_.Url) > -1)) {
        _.active = true;
      }
      if (_.SubItens) {
        _.SubItens.forEach(__ => {
          __.active = false;
          if ((url.indexOf(__.Url) > -1)) {
            _.active = true;
            __.active = true;
          }
        });
      }
    });
  }

  carregarMenu(url: string) {
    if (!this.menu) {
      this.service.loadMenu().subscribe((data: any) => {
        this.menu = data.items.sort((a, b) => {
          return a.Ordem;
        });

        this.menu.forEach(_ => {
          if (_.SubItens) {
            _.SubItens = _.SubItens.sort((a, b) => {
              return (a.Nome > b.Nome) ? 1 : ((b.Nome > a.Nome) ? -1 : 0);
            });
          }
        });
        this.atualizarMenu(url);
      });
    } else {
      this.atualizarMenu(url);
    }
  }

  setActive(item, subItem?) {
    if (!item.Url && !subItem) {
      item.active = !item.active;
    } else {
      this.router.navigate([item.Url || subItem.Url]);
    }
  }
}
