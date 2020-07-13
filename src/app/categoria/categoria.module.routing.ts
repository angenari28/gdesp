import { Routes, RouterModule } from '@angular/router';

import { CategoriaComponent } from './categoria.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoriaComponent
  }
];

export const CategoriaRoutingModule = RouterModule.forChild(routes);
