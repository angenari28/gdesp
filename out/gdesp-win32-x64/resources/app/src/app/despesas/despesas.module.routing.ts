import { Routes, RouterModule } from '@angular/router';

import { DespesasComponent } from './despesas.component';

export const routes: Routes = [
  {
    path: '',
    component: DespesasComponent
  }
];

export const DespesasRoutingModule = RouterModule.forChild(routes);
