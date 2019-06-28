import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DifferComponent } from './differ/differ.component';

const routes: Routes = [
  {path: 'diffs/:id' , component: DifferComponent},
  {path: '' , component: DifferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
