import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GetDetailsService } from './service/get-details.service';
import { AppComponent } from './app.component';
import { SachinComponent } from './sachin/sachin.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng4-charts/ng4-charts';


@NgModule({
  declarations: [
    AppComponent,
    SachinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [GetDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
