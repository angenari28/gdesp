import { Injectable, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable, of } from 'rxjs';

import { GdJSONService } from '../gd-json/gd-json.service';

@Injectable({
  providedIn: 'root'
})
export class GdI18nService {

  public state: Subject<any>;
  public data: any[] = [];
  public currentLanguage: any;
  public config: any;
  public route: string;
  public baseRoute: string;
  public menuRoute: string;

  constructor(public jsonApiService: GdJSONService, public ref: ApplicationRef, public router: Router) {
    this.state = new Subject();

    this.initLanguage();
    this.fetch(this.currentLanguage.key);
  }

  public getConfig() {
    return this.config;
  }

  public fetch(locale: any) {
    this.baseRoute = `/gd-i18n/${locale}/resources/base.json`;
    this.menuRoute = `/gd-i18n/${locale}/resources/menu.json`;
    this.jsonApiService.fetch(this.baseRoute)
      .subscribe((res: any) => {
        this.data.push({
          route: '',
          data: res
        });
        this.state.next(res);
        this.ref.tick();
      });

    this.jsonApiService.fetch(this.menuRoute)
      .subscribe((res: any) => {
        this.data.push({
          route: 'menu',
          data: res
        });
        this.state.next(res);
        this.ref.tick();
      });

    this.loadConfig(locale)
      .subscribe((data: any) => {
        this.config = data;
        this.state.next(data);
        this.ref.tick();
      });
  }

  public loadConfig(locale: string): Observable<any> {
    return this.jsonApiService.fetch(`/gd-i18n/${locale}/${locale}.config.json`);
  }

  public fetchByRoute(locale: any, routeUrl: string) {
    routeUrl = routeUrl.replace(/^\/+|\/+$/g, '');
    routeUrl = routeUrl.split('?')[0];

    routeUrl = routeUrl.split('/')[0];// + '/' + routeUrl.split('/')[1];

    this.route = `/gd-i18n/${locale}/resources/${routeUrl}.json`;

    setTimeout(() => {

    this.jsonApiService.fetch(this.route)
      .subscribe((res: any) => {
        this.data.push({
          route: routeUrl,
          data: res
        });
        this.state.next(res);
        this.ref.tick();
      });
    }, 0);
  }

  public initLanguage() {
    this.currentLanguage = { key: navigator.languages[0].toLowerCase() };
  }

  getResource() {
    return this.data;
  }

  loadResource(url?: string) {
    this.fetchByRoute(this.currentLanguage.key, url ? url : this.router.url);
  }

  getRoute() {
    return this.route;
  }

  getLanguage() {
    return this.currentLanguage;
  }

  isLoaded(route: string) {
    route = route.replace(/^\/+|\/+$/g, '');
    route = route.split('?')[0];
    route = route.split('/')[0];// + '/' + route.split('/')[1];
    if (this.data.filter(_ => _.route === route).length > 0) {
      return true;
    }
    return false;
  }

  public getTranslation(phrase: string, route?: string): string {
    let item;
    if (route === 'menu') {
      item = this.data.filter(_ => _.route === 'menu');
    } else {
      route = route ? route.replace(/^\/+|\/+$/g, '') : '';
      route = route.split('?')[0];
      route = route.split('/')[0]; // + '/' + route.split('/')[1];
      item = this.data.filter(_ => _.route === route).length > 0
        ? this.data.filter(_ => _.route === route)
        : this.data.filter(_ => _.route === '');
    }
    return (item.length > 0) && item[0].data[phrase] ? item[0].data[phrase] : phrase;
  }
}
