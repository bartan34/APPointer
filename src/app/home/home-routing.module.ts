import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./pages/add/add.module').then((m) => m.AddPageModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/edit/edit.module').then((m) => m.EditPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
