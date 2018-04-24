import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';
import {BprofileComponent} from './bprofile/bprofile.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  {
    path: 'books',
    component: BooksComponent,
    data: { title: 'Books' }
  },{ path: 'bprofile', component: BprofileComponent, data: { title: 'BProfile' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
