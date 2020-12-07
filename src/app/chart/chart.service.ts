import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private ano = 0;

  private anoDespesasSubject$ = new BehaviorSubject<any>(this.ano);
  anoDespesasChanged$ = this.anoDespesasSubject$.asObservable();

  alterarAno(anoAlterar: any) {
    this.ano = anoAlterar;
    this.anoDespesasSubject$.next(anoAlterar);
  }
}
