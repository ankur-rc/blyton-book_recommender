import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSlideshowModule } from 'ngx-slideshow';
import { BooksService } from './static/books/books.service';
import {InfoDialog} from './app.component'
import {MatDialogModule} from '@angular/material';
@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    NgxSlideshowModule.forRoot(),
    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule,
    MatDialogModule

  ],
  declarations: [AppComponent,InfoDialog],
  providers: [BooksService],
  bootstrap: [AppComponent],
  entryComponents:[InfoDialog]
})
export class AppModule {}
