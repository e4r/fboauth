import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FacebookModule } from 'ngx-facebook';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
