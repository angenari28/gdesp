import { Injectable } from '@angular/core';

@Injectable()
export class NpContextService {
    public context: any[] = [];
    static instance;

    constructor() {
        this.loadSessionContext();
      if (NpContextService.instance) {
        return NpContextService.instance;
        } else {
        NpContextService.instance = this;
        }
    }

    addContext(key: string, obj: any): void {
        this.removeContext(key);
        this.context.push({
            [key]: obj
        });
        this.saveSessionContext();
    }

    containsKey(key: string): boolean {
        for (let i = 0; i < this.context.length; i++) {
            if (this.context[i][key]) {
                return true;
            }
        }
        return false;
    }

    removeContext(key: string):void {
        let tempList: any[] = [];
        this.loadSessionContext();
        for (let i = 0; i < this.context.length; i++) {
            if (this.context[i][key]) {
                tempList.push(this.context[i]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            let index: number = this.context.indexOf(tempList[i]);
            if (index > -1) {
                this.context.splice(index, 1);
            }
        }
        this.saveSessionContext();
    }

    getContext(key: string): any {
        this.loadSessionContext();
        for (let i = 0; i < this.context.length; i++) {
            if (this.context[i][key]) {

                return this.context[i][key];
            }
        }
        return null;
    }

    clearContext(): void {
        this.context = [];
        this.saveSessionContext();
    }

    public saveSessionContext(): void {
        sessionStorage.setItem('context', JSON.stringify(this.context));
    }

    public loadSessionContext(): void {
        this.context = JSON.parse(sessionStorage.getItem('context')) || [];
    }
}
