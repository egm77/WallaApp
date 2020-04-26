import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemManagerComponent } from './item-manager.component';

const routes: Routes = [{ path: '', component: ItemManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemManagerRoutingModule { }
