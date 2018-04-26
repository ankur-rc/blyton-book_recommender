import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';
import { BprofileComponent } from './bprofile/bprofile.component';
import { NgxSlideshowModule } from 'ngx-slideshow';
import { BooksService } from './books/books.service';
import {TruncatePipe} from './books/truncate.pipe';
import { SlickModule } from 'ngx-slick';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, NgxSlideshowModule.forRoot(),SlickModule.forRoot()],
  declarations: [AboutComponent, BooksComponent, BprofileComponent,TruncatePipe],
  providers: [BooksService]
})
export class StaticModule {}
