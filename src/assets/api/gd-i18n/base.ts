import { Injectable } from '@angular/core';

declare function require(name: string);

@Injectable()
export class BaseI18nService {

  getJson(url: string): any {
    return require(`../../../assets/api${url}`);
  }
}
