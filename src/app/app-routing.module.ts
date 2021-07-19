import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubPage1Component } from './sub-page/sub-page1.component';
import { SubPage2Component } from './sub-page/sub-page2.component';
import { SubPage3Component } from './sub-page/sub-page3.component';

const routes: Routes = [
  {
    path: 'page1',
    component: SubPage1Component,
  },
  {
    path: 'page2',
    component: SubPage2Component
  },
  {
    path: 'page3',
    component: SubPage3Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
