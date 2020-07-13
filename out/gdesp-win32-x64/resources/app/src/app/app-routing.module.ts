import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NpLayoutComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: NpLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../app/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('../app/categoria/categoria.module').then(m => m.CategoriaModule)
      },
      {
        path: 'despesas',
        loadChildren: () => import('../app/despesas/despesas.module').then(m => m.DespesasModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: 'erro404', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
