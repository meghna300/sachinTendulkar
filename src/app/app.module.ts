import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GetDetailsService } from './service/get-details.service';
import { AppComponent } from './app.component';
import { SachinComponent } from './sachin/sachin.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SachinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GetDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
