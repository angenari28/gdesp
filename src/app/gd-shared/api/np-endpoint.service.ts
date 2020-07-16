import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GdJSONService } from '../gd-json/gd-json.service';

@Injectable()

export class NpEndpointService {

    private static instance: NpEndpointService;
    public baseEndpoints: any;
    public endpoints: any;

    public endpointURL: string;
    public endpointBaseURL: string;

    constructor(public jsonApiService: GdJSONService) {

        if (NpEndpointService.instance) {
            return NpEndpointService.instance;
        }

        this.endpointURL = '/endpoints/endpoints.json';
        this.endpointBaseURL =
            environment.production ?
                '/endpoints/endpoints-base-prod.json' :
                '/endpoints/endpoints-base.json';

        NpEndpointService.instance = this;
    }

    public getEndpoint(key): Observable<any> {
        if (this.endpoints) {
            return of(this.endpoints)
                .pipe(
                    map(res => {
                        return res[key].URL;
                    }));
        } else {
            return this.jsonApiService.fetch(this.endpointBaseURL)
                .pipe(
                    switchMap((data: any) => {
                        this.baseEndpoints = data;

                        for (let k in this.baseEndpoints) {
                            this.baseEndpoints[k] = this.baseEndpoints[k].replace(/^\/+|\/+$/g, '');
                        }

                        return this.jsonApiService.fetch(this.endpointURL)
                            .pipe(
                                map((data: any) => {
                                    this.endpoints = data;
                                    for (let k2 in this.endpoints) {
                                        let base = this.endpoints[k2].BASE;
                                        this.endpoints[k2].URL = this.baseEndpoints[base] + "/" + this.endpoints[k2].URL.replace(/^\/+|\/+$/g, '');
                                    }
                                    return this.endpoints[key].URL;
                                }));
                    }));
        }
    }

    public getBaseEndpoint(key): Observable<any> {
        if (this.baseEndpoints) {
            return of(this.baseEndpoints)
                .pipe(
                    map(res => {
                        return res[key];
                    }));
        } else {
            return this.jsonApiService.fetch(this.endpointBaseURL)
                .pipe(
                    map((data: any) => {
                        this.baseEndpoints = data;

                        for (let k in this.baseEndpoints) {
                            this.baseEndpoints[k] = this.baseEndpoints[k].replace(/^\/+|\/+$/g, '');
                        }

                        return this.baseEndpoints[key];
                    }));
        }
    }
}
