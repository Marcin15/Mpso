import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DataManagerComponent } from './components/data-insert/data-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DataManagerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
