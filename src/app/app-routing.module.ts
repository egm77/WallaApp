import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'item-manager', loadChildren: () => import('./item-manager/item-manager.module').then(m => m.ItemManagerModule) },
  { path: '**', redirectTo: '/item-manager' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
